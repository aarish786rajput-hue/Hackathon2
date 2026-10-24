// PulseAI Medication Reminder & Browser Notification Service
// Provides real-time overdue detection, snooze timers, and browser push notifications

/**
 * Checks if browser supports Web Notifications
 */
export function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

/**
 * Get current browser notification permission status ('granted', 'denied', 'default')
 */
export function getNotificationPermission() {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return false;
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (err) {
    console.warn("Error requesting notification permission:", err);
    return false;
  }
}

/**
 * Trigger an immediate or test notification
 */
export function sendDesktopNotification(title, options = {}) {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return false;
  }
  try {
    const notif = new Notification(title, {
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      silent: false,
      ...options
    });
    notif.onclick = () => {
      window.focus();
      notif.close();
    };
    return true;
  } catch (err) {
    console.warn("Could not fire desktop notification:", err);
    return false;
  }
}

/**
 * Active timers map to prevent duplicate scheduled timeouts
 */
const activeTimers = new Map();

/**
 * Schedule a snooze reminder notification
 */
export function scheduleSnoozeNotification(med, minutes = 15) {
  if (!med) return;
  
  // Clear any existing timer for this medication
  if (activeTimers.has(med.id)) {
    clearTimeout(activeTimers.get(med.id));
    activeTimers.delete(med.id);
  }

  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return;
  }

  // Schedule notification after snooze duration (or after 5 seconds in development if minutes < 1)
  const delayMs = minutes * 60 * 1000;
  const timerId = setTimeout(() => {
    sendDesktopNotification(`⏰ PulseAI: ${med.name} (${med.dosage}) Due Now!`, {
      body: `Your ${minutes}-minute snooze has finished. Please take your scheduled dose ${med.withFood ? "with food" : "with water"}.`,
      tag: `med_${med.id}`
    });
    activeTimers.delete(med.id);
  }, delayMs);

  activeTimers.set(med.id, timerId);
}

/**
 * Check whether a medication is Overdue, Due, Snoozed, or Upcoming
 */
export function getMedicationDueStatus(med) {
  if (!med) return { status: "unknown", isOverdue: false, isDue: false };
  if (med.stopped) return { status: "stopped", isOverdue: false, isDue: false };
  if (med.taken) return { status: "taken", isOverdue: false, isDue: false };

  if (med.snoozedMinutes) {
    return {
      status: "snoozed",
      isOverdue: false,
      isDue: true,
      label: `⏰ Snoozed (+${med.snoozedMinutes}m)`
    };
  }

  const now = new Date();
  const currentHour = now.getHours();

  // Morning routine (typically 8:00 AM - 10:00 AM)
  if (med.slot === "morning") {
    const isOverdue = currentHour >= 10;
    return {
      status: isOverdue ? "overdue" : "due",
      isOverdue,
      isDue: true,
      label: isOverdue ? "⚠️ Overdue (Morning 8:00 AM)" : "Due Now (Morning)"
    };
  }

  // Afternoon routine (typically 1:00 PM - 2:30 PM)
  if (med.slot === "afternoon") {
    const isOverdue = currentHour >= 14; // Past 2:00 PM
    const isDue = currentHour >= 12;    // Due from noon onwards
    return {
      status: isOverdue ? "overdue" : isDue ? "due" : "upcoming",
      isOverdue,
      isDue,
      label: isOverdue ? "⚠️ Overdue (Afternoon 1:30 PM)" : isDue ? "Due Now (Afternoon)" : "Upcoming (1:30 PM)"
    };
  }

  // Night routine (typically 9:00 PM - 10:30 PM)
  if (med.slot === "night") {
    const isOverdue = currentHour >= 22 || currentHour < 6;
    const isDue = currentHour >= 20;
    return {
      status: isOverdue ? "overdue" : isDue ? "due" : "upcoming",
      isOverdue,
      isDue,
      label: isOverdue ? "⚠️ Overdue (Night 9:30 PM)" : isDue ? "Due Now (Night)" : "Upcoming (9:30 PM)"
    };
  }

  return { status: "due", isOverdue: false, isDue: true, label: "Due Today" };
}

/**
 * Filter all active medications that require user attention right now (overdue or pending)
 */
export function getOverdueAndDueMedications(medications = []) {
  return medications.filter(m => {
    if (m.stopped || m.taken) return false;
    const statusInfo = getMedicationDueStatus(m);
    return statusInfo.isOverdue || statusInfo.isDue || m.snoozedMinutes;
  });
}

/**
 * Parse an appointment date/time and determine its notification status
 * Handles: 'today' / 'आज', 'tomorrow' / 'कल', YYYY-MM-DD custom dates, and standard date strings
 */
export function getAppointmentReminderStatus(apt, lang = "en") {
  if (!apt) return null;

  const rawDate = (apt.date || "").toString().trim();
  const rawTime = (apt.time || "").toString().trim();
  const selectedDateType = (apt.selectedDateType || "").toString().toLowerCase();

  // 1. Explicit 'today' or 'आज'
  if (selectedDateType === "today" || rawDate.toLowerCase() === "today" || rawDate === "आज") {
    return {
      status: "today",
      urgency: "urgent",
      isToday: true,
      isUpcoming: true,
      label: lang === "hi" ? "🔴 आज का अपॉइंटमेंट" : lang === "hinglish" ? "🔴 Aaj Ka Appointment" : "🔴 Today's Appointment",
      badgeColor: "#dc2626",
      badgeBg: "rgba(239, 68, 68, 0.16)",
      displayDate: lang === "hi" ? "आज" : "Today",
      displayTime: rawTime,
      alertText: lang === "hi" 
        ? `आज डॉक्टर अपॉइंटमेंट है (${rawTime})` 
        : lang === "hinglish"
          ? `Aaj Doctor appointment hai (${rawTime})`
          : `Doctor appointment scheduled today at ${rawTime}`
    };
  }

  // 2. Explicit 'tomorrow' or 'कल'
  if (selectedDateType === "tomorrow" || rawDate.toLowerCase() === "tomorrow" || rawDate === "कल") {
    return {
      status: "tomorrow",
      urgency: "upcoming",
      isTomorrow: true,
      isUpcoming: true,
      label: lang === "hi" ? "🟠 कल का अपॉइंटमेंट" : lang === "hinglish" ? "🟠 Kal Ka Appointment" : "🟠 Tomorrow's Appointment",
      badgeColor: "#ea580c",
      badgeBg: "rgba(234, 88, 12, 0.16)",
      displayDate: lang === "hi" ? "कल" : "Tomorrow",
      displayTime: rawTime,
      alertText: lang === "hi" 
        ? `कल डॉक्टर अपॉइंटमेंट है (${rawTime})` 
        : lang === "hinglish"
          ? `Kal Doctor appointment hai (${rawTime})`
          : `Doctor appointment scheduled tomorrow at ${rawTime}`
    };
  }

  // 3. Custom Date (e.g. 2026-10-25 or Nov 15, 2026)
  const targetDateStr = apt.customDate || rawDate;
  const parsedDate = new Date(targetDateStr);
  if (!isNaN(parsedDate.getTime())) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const aptDay = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());

    const diffDays = Math.round((aptDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return {
        status: "today",
        urgency: "urgent",
        isToday: true,
        isUpcoming: true,
        label: lang === "hi" ? "🔴 आज का अपॉइंटमेंट" : lang === "hinglish" ? "🔴 Aaj Ka Appointment" : "🔴 Today's Appointment",
        badgeColor: "#dc2626",
        badgeBg: "rgba(239, 68, 68, 0.16)",
        displayDate: lang === "hi" ? "आज" : "Today",
        displayTime: rawTime,
        alertText: lang === "hi" ? `आज डॉक्टर अपॉइंटमेंट है (${rawTime})` : `Doctor appointment scheduled today at ${rawTime}`
      };
    } else if (diffDays === 1) {
      return {
        status: "tomorrow",
        urgency: "upcoming",
        isTomorrow: true,
        isUpcoming: true,
        label: lang === "hi" ? "🟠 कल का अपॉइंटमेंट" : lang === "hinglish" ? "🟠 Kal Ka Appointment" : "🟠 Tomorrow's Appointment",
        badgeColor: "#ea580c",
        badgeBg: "rgba(234, 88, 12, 0.16)",
        displayDate: lang === "hi" ? "कल" : "Tomorrow",
        displayTime: rawTime,
        alertText: lang === "hi" ? `कल डॉक्टर अपॉइंटमेंट है (${rawTime})` : `Doctor appointment scheduled tomorrow at ${rawTime}`
      };
    } else if (diffDays > 1) {
      return {
        status: "upcoming",
        urgency: "scheduled",
        isUpcoming: true,
        daysLeft: diffDays,
        label: lang === "hi" 
          ? `📅 ${diffDays} दिन बाद (${targetDateStr})` 
          : lang === "hinglish"
            ? `📅 ${diffDays} din baad (${targetDateStr})`
            : `📅 In ${diffDays} days (${targetDateStr})`,
        badgeColor: "#0284c7",
        badgeBg: "rgba(2, 132, 199, 0.16)",
        displayDate: targetDateStr,
        displayTime: rawTime,
        alertText: lang === "hi" 
          ? `अपॉइंटमेंट तारीख: ${targetDateStr} (${rawTime})` 
          : `Appointment scheduled: ${targetDateStr} at ${rawTime}`
      };
    } else {
      return {
        status: "past",
        urgency: "completed",
        isPast: true,
        isUpcoming: false,
        label: lang === "hi" ? `पिछला परामर्श (${targetDateStr})` : `Past (${targetDateStr})`,
        badgeColor: "var(--text-muted)",
        badgeBg: "rgba(100, 116, 139, 0.12)",
        displayDate: targetDateStr,
        displayTime: rawTime,
        alertText: `Past consultation on ${targetDateStr}`
      };
    }
  }

  // 4. Default fallback
  return {
    status: "upcoming",
    urgency: "scheduled",
    isUpcoming: true,
    label: `📅 ${rawDate || "Scheduled"}`,
    badgeColor: "#0284c7",
    badgeBg: "rgba(2, 132, 199, 0.16)",
    displayDate: rawDate,
    displayTime: rawTime,
    alertText: `Doctor appointment: ${rawDate} at ${rawTime}`
  };
}

/**
 * Filter active upcoming doctor appointments for notifications
 */
export function getActiveAppointmentNotifications(appointments = [], lang = "en") {
  return appointments
    .map(apt => {
      const statusInfo = getAppointmentReminderStatus(apt, lang);
      return { ...apt, statusInfo };
    })
    .filter(apt => apt.statusInfo && apt.statusInfo.isUpcoming);
}

