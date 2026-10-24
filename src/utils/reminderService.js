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
