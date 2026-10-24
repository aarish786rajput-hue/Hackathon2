import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Utensils, 
  Activity, 
  Moon, 
  Droplets, 
  FlaskConical, 
  Calendar, 
  CalendarCheck, 
  Circle, 
  ChevronRight,
  ShieldCheck,
  BellRing,
  Check
} from "lucide-react";
import { translations } from "../data/translations";
import { getPatientWellnessData } from "../data/wellnessData";
import { translateMedicalTerm } from "../utils/translator";
import { sendDesktopNotification, getNotificationPermission } from "../utils/reminderService";

export default function WellnessTracker({
  patient,
  lang = "en",
  onNavigate,
  onOpenDoctorPrep
}) {
  const t = translations[lang] || translations.en;
  const wellnessData = getPatientWellnessData(patient?.id || "pat_1");
  const { wellnessPillars = [], repeatTestsDue = [], upcomingAppointment } = wellnessData;

  const [activeSubTab, setActiveSubTab] = useState("habits"); // 'habits' | 'tests' | 'appointment'
  const [habitFilter, setHabitFilter] = useState("all");
  const [testFilter, setTestFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [appointmentAlertActive, setAppointmentAlertActive] = useState(false);

  // Daily habit completion state persisted per patient and day
  const [completedHabits, setCompletedHabits] = useState(() => {
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      const storageKey = `pulseai_habits_${patient?.id || 'pat_1'}_${todayKey}`;
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      const storageKey = `pulseai_habits_${patient?.id || 'pat_1'}_${todayKey}`;
      localStorage.setItem(storageKey, JSON.stringify(completedHabits));
    } catch {
      // ignore
    }
  }, [completedHabits, patient?.id]);

  const toggleHabit = (id) => {
    setCompletedHabits(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        showToast("Great job! Habit completed for today 🎉");
      }
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const completedCount = wellnessPillars.filter(p => completedHabits[p.id]).length;
  const totalHabits = wellnessPillars.length;
  const habitPercent = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

  // Filtered lists
  const filteredHabits = wellnessPillars.filter(p => {
    if (habitFilter === "all") return true;
    return p.category?.toLowerCase() === habitFilter.toLowerCase() || p.id === habitFilter;
  });

  const filteredTests = repeatTestsDue.filter(test => {
    if (testFilter === "all") return true;
    if (testFilter === "due-soon") return test.urgency === "due-soon";
    if (testFilter === "scheduled") return test.urgency === "scheduled";
    if (testFilter === "good") return test.urgency === "good";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* ── TOP HERO BANNER ── */}
      <div className="glass-panel" style={{
        padding: "26px 30px",
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.14), var(--bg-card) 65%, rgba(59, 130, 246, 0.1))",
        border: "1.5px solid rgba(16, 185, 129, 0.35)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Ambient Radial Mesh Light */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(24px)"
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.16)", border: "1px solid rgba(16, 185, 129, 0.4)", padding: "4px 12px", borderRadius: "20px", color: "var(--secondary)", fontSize: "0.76rem", fontWeight: 800, marginBottom: "10px" }}>
              <ShieldCheck size={14} />
              <span>Personalized Preventive Health Plan</span>
            </div>
            <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-highlight)", marginBottom: "8px", margin: 0 }}>
              {t.wellnessGuidanceTitle || "Wellness & Preventive Care"}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", maxWidth: "640px", margin: "6px 0 0 0", lineHeight: 1.5 }}>
              Easy daily habits and upcoming lab screenings tailored specifically for <strong>{patient?.name}</strong> to keep conditions well-controlled.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
              {patient?.conditions?.map((cond, i) => {
                const condName = typeof cond === "string" ? cond : cond.name;
                return (
                  <span key={i} className="badge badge-primary" style={{ fontSize: "0.78rem" }}>
                    ● {translateMedicalTerm(condName, lang)}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Quick Progress Dial */}
          <div style={{
            background: "var(--bg-card)",
            padding: "16px 20px",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <div style={{ position: "relative", width: "64px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--border-color)"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="3.5"
                  strokeDasharray={`${habitPercent}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", fontSize: "1rem", fontWeight: 800, color: "var(--text-highlight)" }}>
                {habitPercent}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em" }}>
                Today's Habits
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--secondary)" }}>
                {completedCount} of {totalHabits} Done
              </div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "2px" }}>
                {completedCount === totalHabits ? "All goals completed! 🎉" : "Tap habits below when done"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN SUB-TAB SWITCHER ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1.5px solid var(--border-color)",
        paddingBottom: "12px",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div style={{ display: "inline-flex", gap: "8px", background: "var(--bg-card)", padding: "4px", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
          <button
            type="button"
            onClick={() => setActiveSubTab("habits")}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: activeSubTab === "habits" ? "linear-gradient(135deg, var(--secondary), #059669)" : "transparent",
              color: activeSubTab === "habits" ? "#ffffff" : "var(--text-muted)",
              boxShadow: activeSubTab === "habits" ? "0 2px 8px rgba(16, 185, 129, 0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            <span>🥗</span>
            <span>Daily Lifestyle & Habits</span>
            <span style={{
              background: activeSubTab === "habits" ? "rgba(255, 255, 255, 0.25)" : "rgba(100, 116, 139, 0.15)",
              color: activeSubTab === "habits" ? "#ffffff" : "var(--text-muted)",
              padding: "1px 7px",
              borderRadius: "10px",
              fontSize: "0.72rem"
            }}>
              {wellnessPillars.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("tests")}
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              fontSize: "0.86rem",
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: activeSubTab === "tests" ? "linear-gradient(135deg, var(--primary), #2563eb)" : "transparent",
              color: activeSubTab === "tests" ? "#ffffff" : "var(--text-muted)",
              boxShadow: activeSubTab === "tests" ? "0 2px 8px rgba(14, 165, 233, 0.3)" : "none",
              transition: "all 0.2s ease"
            }}
          >
            <span>🧪</span>
            <span>Repeat Tests Due</span>
            <span style={{
              background: activeSubTab === "tests" ? "rgba(255, 255, 255, 0.25)" : "rgba(100, 116, 139, 0.15)",
              color: activeSubTab === "tests" ? "#ffffff" : "var(--text-muted)",
              padding: "1px 7px",
              borderRadius: "10px",
              fontSize: "0.72rem"
            }}>
              {repeatTestsDue.length}
            </span>
          </button>

          {upcomingAppointment && (
            <button
              type="button"
              onClick={() => setActiveSubTab("appointment")}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                fontSize: "0.86rem",
                fontWeight: 800,
                cursor: "pointer",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: activeSubTab === "appointment" ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "transparent",
                color: activeSubTab === "appointment" ? "#ffffff" : "var(--text-muted)",
                boxShadow: activeSubTab === "appointment" ? "0 2px 8px rgba(139, 92, 246, 0.3)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span>🗓️</span>
              <span>Doctor Follow-Up</span>
              <span style={{
                background: activeSubTab === "appointment" ? "rgba(255, 255, 255, 0.25)" : "rgba(100, 116, 139, 0.15)",
                color: activeSubTab === "appointment" ? "#ffffff" : "var(--text-muted)",
                padding: "1px 7px",
                borderRadius: "10px",
                fontSize: "0.72rem"
              }}>
                {upcomingAppointment.daysLeft}d left
              </span>
            </button>
          )}
        </div>

        {/* Ask Copilot Shortcut */}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate("copilot", "Please review my daily wellness routine and repeat test schedule, and give me practical advice.")}
          className="btn btn-secondary"
          style={{ padding: "8px 14px", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <Sparkles size={14} color="var(--primary)" />
          <span>Ask AI Copilot for Custom Advice</span>
        </button>
      </div>

      {/* ── TAB 1: DAILY LIFESTYLE & HABITS ── */}
      {activeSubTab === "habits" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Category Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginRight: "4px" }}>Filter:</span>
            {[
              { id: "all", label: "All Habits" },
              { id: "nutrition", label: "🥗 Food & Nutrition" },
              { id: "exercise", label: "🏃 Physical Activity" },
              { id: "sleep", label: "🌙 Restful Sleep" },
              { id: "hydration", label: "💧 Daily Water" }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setHabitFilter(cat.id)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: habitFilter === cat.id ? "var(--primary-soft)" : "var(--bg-card)",
                  color: habitFilter === cat.id ? "var(--primary)" : "var(--text-muted)",
                  border: habitFilter === cat.id ? "1.5px solid var(--primary)" : "1px solid var(--border-color)",
                  transition: "all 0.15s ease"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Simple Habit Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "18px" }}>
            {filteredHabits.map((pillar) => {
              const isDone = !!completedHabits[pillar.id];
              const getIcon = (id) => {
                switch (id) {
                  case "diet": return <Utensils size={22} color={pillar.color} />;
                  case "activity": return <Activity size={22} color={pillar.color} />;
                  case "sleep": return <Moon size={22} color={pillar.color} />;
                  case "hydration": return <Droplets size={22} color={pillar.color} />;
                  default: return <Sparkles size={22} color={pillar.color} />;
                }
              };

              return (
                <div
                  key={pillar.id}
                  className="glass-panel"
                  style={{
                    padding: "22px",
                    borderRadius: "18px",
                    border: isDone ? "1.5px solid rgba(16, 185, 129, 0.55)" : `1.5px solid ${pillar.color}35`,
                    background: isDone
                      ? "linear-gradient(165deg, rgba(16, 185, 129, 0.08), var(--bg-card) 60%)"
                      : `linear-gradient(165deg, ${pillar.color}0a, var(--bg-card) 60%)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "16px",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div>
                    {/* Top Row: Icon, Headline & Badge */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: `${pillar.color}18`,
                          border: `1.5px solid ${pillar.color}45`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          {getIcon(pillar.id)}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-highlight)", margin: 0, lineHeight: 1.3 }}>
                            {pillar.simpleTitle || pillar.title}
                          </h3>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                            {pillar.badge}
                          </span>
                        </div>
                      </div>

                      <span style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "3px 10px",
                        borderRadius: "20px",
                        background: `${pillar.color}15`,
                        color: pillar.color,
                        border: `1px solid ${pillar.color}35`,
                        whiteSpace: "nowrap"
                      }}>
                        {pillar.simpleTarget || "Daily Goal"}
                      </span>
                    </div>

                    {/* What to do (Simple action) */}
                    <div style={{
                      background: "var(--bg-elevated)",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-color)",
                      marginBottom: "10px"
                    }}>
                      <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                        👉 What to do:
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-highlight)", margin: 0, lineHeight: 1.45, fontWeight: 600 }}>
                        {pillar.simpleAction || pillar.recommendation}
                      </p>
                    </div>

                    {/* Why this helps you (Simple reason) */}
                    <div style={{
                      background: `${pillar.color}0d`,
                      borderLeft: `3px solid ${pillar.color}`,
                      padding: "10px 14px",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      color: "var(--text-main)",
                      lineHeight: 1.4
                    }}>
                      <strong style={{ color: pillar.color }}>💡 Why it helps: </strong>
                      {pillar.simpleWhy || pillar.whyRecommended}
                    </div>
                  </div>

                  {/* Bottom Actions: Done toggle + AI question */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border-color)",
                    gap: "8px",
                    flexWrap: "wrap"
                  }}>
                    <button
                      type="button"
                      onClick={() => toggleHabit(pillar.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 14px",
                        borderRadius: "10px",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        cursor: "pointer",
                        background: isDone ? "linear-gradient(135deg, #10b981, #059669)" : "var(--bg-card)",
                        color: isDone ? "#ffffff" : "var(--text-main)",
                        border: isDone ? "none" : "1.5px solid var(--border-color)",
                        boxShadow: isDone ? "0 2px 8px rgba(16, 185, 129, 0.35)" : "none",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {isDone ? <Check size={14} strokeWidth={3} /> : <Circle size={14} />}
                      <span>{isDone ? "Completed Today ✓" : "Mark as Done"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate("copilot", `Please suggest 3 easy, practical ideas for: ${pillar.simpleTitle || pillar.title} for my health conditions.`)}
                      style={{
                        background: "none",
                        border: "none",
                        color: pillar.color,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <span>Custom Tips</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 2: REPEAT TESTS DUE ── */}
      {activeSubTab === "tests" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Test Status Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginRight: "4px" }}>Status:</span>
            {[
              { id: "all", label: "All Tests" },
              { id: "due-soon", label: "⏳ Due Soon (Priority)" },
              { id: "scheduled", label: "🗓️ Scheduled" },
              { id: "good", label: "✅ On Track" }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setTestFilter(f.id)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: testFilter === f.id ? "var(--primary-soft)" : "var(--bg-card)",
                  color: testFilter === f.id ? "var(--primary)" : "var(--text-muted)",
                  border: testFilter === f.id ? "1.5px solid var(--primary)" : "1px solid var(--border-color)",
                  transition: "all 0.15s ease"
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Simple Test Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "18px" }}>
            {filteredTests.map((test) => {
              const isUrgent = test.urgency === "due-soon";
              const isGood = test.urgency === "good";

              return (
                <div
                  key={test.id}
                  className="glass-panel"
                  style={{
                    padding: "22px",
                    borderRadius: "18px",
                    border: isUrgent
                      ? "1.5px solid rgba(245, 158, 11, 0.55)"
                      : isGood
                        ? "1.5px solid rgba(16, 185, 129, 0.45)"
                        : "1px solid var(--border-color)",
                    background: isUrgent
                      ? "linear-gradient(165deg, rgba(245, 158, 11, 0.08), var(--bg-card) 60%)"
                      : "var(--bg-card)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "14px",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <div>
                    {/* Test Title & Countdown Badge */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          background: isUrgent ? "rgba(245, 158, 11, 0.15)" : "rgba(14, 165, 233, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isUrgent ? "#d97706" : "var(--primary)",
                          flexShrink: 0
                        }}>
                          <FlaskConical size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-highlight)", margin: 0, lineHeight: 1.3 }}>
                            {test.simpleName || test.testName}
                          </h3>
                          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "2px" }}>
                            Frequency: <strong>{test.frequency}</strong> • Lab: <strong>{test.provider}</strong>
                          </div>
                        </div>
                      </div>

                      <span className={`badge ${isUrgent ? "badge-borderline" : isGood ? "badge-good" : "badge-primary"}`} style={{ whiteSpace: "nowrap", flexShrink: 0, fontSize: "0.74rem", fontWeight: 800 }}>
                        {isUrgent ? "⏳ " : isGood ? "✅ " : "🗓️ "}{test.timeframe}
                      </span>
                    </div>

                    {/* Why this test matters */}
                    <div style={{
                      background: "var(--bg-elevated)",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-color)",
                      marginTop: "10px",
                      fontSize: "0.84rem",
                      lineHeight: 1.45
                    }}>
                      <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--primary)", marginBottom: "3px" }}>
                        📋 Why you need this test:
                      </div>
                      <div style={{ color: "var(--text-highlight)", fontWeight: 500 }}>
                        {test.simpleReason || test.guidelineReason}
                      </div>
                    </div>

                    {/* Preparation tip */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "10px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(245, 158, 11, 0.08)",
                      border: "1px solid rgba(245, 158, 11, 0.25)",
                      fontSize: "0.8rem",
                      color: "var(--text-main)"
                    }}>
                      <span style={{ fontSize: "1rem" }}>☕</span>
                      <span>
                        <strong>Prep:</strong> {test.prepTip || "Standard collection. Water permitted."}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Book Test + Ask Question */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border-color)",
                    gap: "8px",
                    flexWrap: "wrap"
                  }}>
                    <button
                      type="button"
                      onClick={() => showToast(`Home sample collection booked with ${test.provider}!`)}
                      className="btn btn-primary"
                      style={{ padding: "7px 14px", fontSize: "0.8rem", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <FlaskConical size={14} />
                      <span>Book Home Sample</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate("copilot", `What are the preparation guidelines and normal values for ${test.testName}?`)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--primary)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      Test Guide →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 3: DOCTOR FOLLOW-UP ── */}
      {activeSubTab === "appointment" && upcomingAppointment && (
        <div className="glass-panel" style={{
          padding: "26px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12), var(--bg-card) 60%)",
          border: "1.5px solid rgba(139, 92, 246, 0.35)",
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
                flexShrink: 0
              }}>
                <CalendarCheck size={26} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-highlight)", margin: 0 }}>
                    Upcoming Doctor Consultation
                  </h3>
                  <span className="badge badge-primary" style={{ fontWeight: 800, fontSize: "0.75rem" }}>
                    🗓️ In {upcomingAppointment.daysLeft} Days
                  </span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
                  <strong>{upcomingAppointment.doctorName}</strong> ({upcomingAppointment.specialty}) • {upcomingAppointment.clinic}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                onClick={() => onOpenDoctorPrep && onOpenDoctorPrep()}
                className="btn btn-primary"
                style={{ padding: "8px 16px", fontSize: "0.84rem", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Calendar size={15} />
                <span>Prepare Top 5 Questions</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAppointmentAlertActive(true);
                  showToast("Appointment reminder notification scheduled!");
                  if (getNotificationPermission() === "granted") {
                    sendDesktopNotification("PulseAI Appointment Reminder 🗓️", {
                      body: `Follow-up with ${upcomingAppointment.doctorName} on ${upcomingAppointment.date} at ${upcomingAppointment.time}.`
                    });
                  }
                }}
                className="btn btn-secondary"
                style={{
                  padding: "8px 16px",
                  fontSize: "0.84rem",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: appointmentAlertActive ? "rgba(16, 185, 129, 0.18)" : undefined,
                  color: appointmentAlertActive ? "var(--secondary)" : undefined
                }}
              >
                <BellRing size={15} />
                <span>{appointmentAlertActive ? "Alert Active ✓" : "Set Alert Reminder"}</span>
              </button>
            </div>
          </div>

          <div style={{
            background: "var(--bg-card)",
            padding: "16px 20px",
            borderRadius: "14px",
            border: "1px solid var(--border-color)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "14px",
            fontSize: "0.88rem"
          }}>
            <div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>
                Date & Time
              </div>
              <div style={{ fontWeight: 800, color: "var(--text-highlight)", marginTop: "4px" }}>
                🗓️ {upcomingAppointment.date} at {upcomingAppointment.time}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>
                Purpose of Visit
              </div>
              <div style={{ fontWeight: 700, color: "var(--text-highlight)", marginTop: "4px" }}>
                🎯 {upcomingAppointment.purpose}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>
                Clinical Preparation Note
              </div>
              <div style={{ color: "var(--text-muted)", fontStyle: "italic", marginTop: "4px" }}>
                📌 {upcomingAppointment.notes}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOATING TOAST FEEDBACK PILL ── */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "linear-gradient(135deg, #0ea5e9, #10b981)",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
          fontSize: "0.88rem",
          fontWeight: 700,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          animation: "fadeIn 0.25s ease"
        }}>
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
