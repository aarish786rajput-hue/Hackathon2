import React, { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Plus, 
  Utensils, 
  Search,
  BellRing,
  Ban,
  RotateCcw,
  Timer,
  Check
} from "lucide-react";
import { analyzeMedicationList, checkPairInteraction } from "../data/drugInteractions";
import { translations } from "../data/translations";
import { translateMedicalTerm } from "../utils/translator";

export default function MedicineTracker({ 
  patient, 
  onToggleMedication, 
  onAddMedication, 
  onSnoozeMedication,
  onStopMedicationCourse,
  lang = 'en' 
}) {
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState("schedule"); // 'schedule' | 'interactions'
  const [medFilter, setMedFilter] = useState("all"); // 'all' | 'active' | 'stopped'
  const [testMedName, setTestMedName] = useState("");
  const [testResult, setTestResult] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New med form state
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("");
  const [newMedSlot, setNewMedSlot] = useState("morning");
  const [newMedPurpose, setNewMedPurpose] = useState("");

  const medsList = patient?.todayMedications || [];
  const activeAlerts = analyzeMedicationList(medsList, lang);

  const handleTestInteraction = (e) => {
    e.preventDefault();
    if (!testMedName.trim()) return;

    const conflicts = [];
    patient.todayMedications.forEach((currentMed) => {
      const match = checkPairInteraction(currentMed.name, testMedName, lang);
      if (match) {
        conflicts.push({
          currentMed: currentMed.name,
          ...match
        });
      }
    });

    setTestResult({
      searched: testMedName,
      conflicts,
      isSafe: conflicts.length === 0
    });
  };

  const handleCreateMed = (e) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDosage.trim()) return;

    const newMed = {
      id: `med_${Date.now()}`,
      name: newMedName.trim(),
      dosage: newMedDosage.trim(),
      timing: newMedSlot === "morning" ? "Morning (8:00 AM)" : newMedSlot === "afternoon" ? "Afternoon (1:30 PM)" : "Night (9:30 PM)",
      slot: newMedSlot,
      taken: false,
      purpose: newMedPurpose.trim() || "General Therapy",
      refillDaysLeft: 30,
      withFood: true
    };

    if (onAddMedication) onAddMedication(newMed);
    setNewMedName("");
    setNewMedDosage("");
    setNewMedPurpose("");
    setShowAddForm(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {/* Banner */}
      <div className="glass-panel" style={{
        padding: "24px 28px",
        background: "linear-gradient(135deg, var(--secondary-soft), var(--primary-soft))",
        border: "1px solid var(--secondary-border)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0, color: "var(--text-main)" }}>
              {t.navMedications || "Smart Medicine Center"}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "650px", marginTop: "6px", marginBottom: 0 }}>
              {t.medsSub || "Track daily doses with timely food reminders, and protect yourself against dangerous drug-drug interactions before consuming over-the-counter painkillers."}
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>{showAddForm ? translateMedicalTerm("Close Form", lang) : translateMedicalTerm("Add Medication", lang)}</span>
          </button>
        </div>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <form onSubmit={handleCreateMed} className="glass-panel" style={{ padding: "20px 24px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>{translateMedicalTerm("Add New Prescription", lang)}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "14px" }}>
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{translateMedicalTerm("Medication Name", lang)}</label>
              <input
                type="text"
                placeholder="e.g. Atorvastatin, Metformin"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{translateMedicalTerm("Dosage", lang)}</label>
              <input
                type="text"
                placeholder="e.g. 500 mg, 10 mcg"
                value={newMedDosage}
                onChange={(e) => setNewMedDosage(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{translateMedicalTerm("Daily Timing", lang)}</label>
              <select value={newMedSlot} onChange={(e) => setNewMedSlot(e.target.value)}>
                <option value="morning">{translateMedicalTerm("Morning Routine", lang)}</option>
                <option value="afternoon">{translateMedicalTerm("Afternoon Routine", lang)}</option>
                <option value="night">{translateMedicalTerm("Night Routine", lang)}</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{translateMedicalTerm("Purpose / Condition", lang)}</label>
              <input
                type="text"
                placeholder="e.g. Blood Sugar, Blood Pressure"
                value={newMedPurpose}
                onChange={(e) => setNewMedPurpose(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary">
              {t.cancel || "Cancel"}
            </button>
            <button type="submit" className="btn btn-primary">
              {translateMedicalTerm("Save to Daily Regimen", lang)}
            </button>
          </div>
        </form>
      )}

      {/* Navigation Sub-Tabs */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
        <button
          onClick={() => setActiveTab("schedule")}
          className="btn"
          style={{
            background: activeTab === "schedule" ? "linear-gradient(135deg, #ec4899, #db2777)" : "var(--bg-elevated)",
            color: activeTab === "schedule" ? "#ffffff" : "var(--text-muted)",
            border: activeTab === "schedule" ? "none" : "1px solid var(--border-color)",
            boxShadow: activeTab === "schedule" ? "0 4px 14px rgba(236, 72, 153, 0.35)" : "none",
            fontWeight: 700
          }}
        >
          <Clock size={16} /> {translateMedicalTerm("Daily Dosage Schedule", lang)}
        </button>
        <button
          onClick={() => setActiveTab("interactions")}
          className="btn"
          style={{
            background: activeTab === "interactions" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "var(--bg-elevated)",
            color: activeTab === "interactions" ? "#ffffff" : "var(--text-muted)",
            border: activeTab === "interactions" ? "none" : "1px solid var(--border-color)",
            boxShadow: activeTab === "interactions" ? "0 4px 14px rgba(245, 158, 11, 0.35)" : "none",
            fontWeight: 700
          }}
        >
          <ShieldAlert size={16} /> {translateMedicalTerm("Drug Interaction Scanner", lang)}
        </button>
      </div>

      {/* Tab 1: Schedule */}
      {activeTab === "schedule" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Quick Regimen Filter Chips */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setMedFilter("all")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: medFilter === "all" ? "var(--text-main)" : "var(--bg-elevated)",
                  color: medFilter === "all" ? "var(--bg-card)" : "var(--text-muted)",
                  border: "1px solid var(--border-color)",
                  transition: "all 0.15s ease"
                }}
              >
                {t.allCourses || "All Medications"} ({patient.todayMedications.length})
              </button>
              <button
                type="button"
                onClick={() => setMedFilter("active")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: medFilter === "active" ? "linear-gradient(135deg, #10b981, #059669)" : "var(--bg-elevated)",
                  color: medFilter === "active" ? "#ffffff" : "var(--text-muted)",
                  border: medFilter === "active" ? "none" : "1px solid var(--border-color)",
                  boxShadow: medFilter === "active" ? "0 2px 8px rgba(16, 185, 129, 0.3)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                🟢 {t.activeCourses || "Active Doses"} ({patient.todayMedications.filter(m => !m.stopped).length})
              </button>
              <button
                type="button"
                onClick={() => setMedFilter("stopped")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: medFilter === "stopped" ? "linear-gradient(135deg, #ef4444, #dc2626)" : "var(--bg-elevated)",
                  color: medFilter === "stopped" ? "#ffffff" : "var(--text-muted)",
                  border: medFilter === "stopped" ? "none" : "1px solid var(--border-color)",
                  boxShadow: medFilter === "stopped" ? "0 2px 8px rgba(239, 68, 68, 0.3)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                🛑 {t.stoppedCourses || "Stopped Courses"} ({patient.todayMedications.filter(m => m.stopped).length})
              </button>
            </div>

            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {t.tapCheckboxTaken || "Tap checkbox to record when taken"}
            </div>
          </div>

          {["morning", "afternoon", "night"].map((slotName) => {
            const rawSlotMeds = patient.todayMedications.filter(m => m.slot === slotName);
            const slotMeds = rawSlotMeds.filter(m => {
              if (medFilter === "active") return !m.stopped;
              if (medFilter === "stopped") return !!m.stopped;
              return true;
            });
            const slotTitle = slotName === "morning" ? "Morning Routine" : slotName === "afternoon" ? "Afternoon Routine" : "Night Routine";
            const slotTime = slotName === "morning" ? "8:00 AM - 10:00 AM" : slotName === "afternoon" ? "1:00 PM - 2:30 PM" : "9:00 PM - 10:30 PM";

            const activeMedsInSlot = rawSlotMeds.filter(m => !m.stopped);
            const takenCount = activeMedsInSlot.filter(m => m.taken).length;

            return (
              <div key={slotName} className="glass-panel" style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>
                      {translateMedicalTerm(slotTitle, lang)}
                    </h3>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{slotTime}</div>
                  </div>
                  <span className="badge badge-primary">
                    {takenCount} / {activeMedsInSlot.length} {translateMedicalTerm("Completed", lang)}
                  </span>
                </div>

                {slotMeds.length === 0 ? (
                  <div style={{ color: "var(--text-muted)", fontSize: "0.86rem", fontStyle: "italic", padding: "8px 0" }}>
                    {translateMedicalTerm("No medications scheduled for this time.", lang)}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {slotMeds.map((med) => (
                      <div
                        key={med.id}
                        onClick={() => {
                          if (!med.stopped) {
                            onToggleMedication(med.id);
                          }
                        }}
                        className="interactive-card"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "16px 20px",
                          borderRadius: "14px",
                          background: med.stopped
                            ? "rgba(100, 116, 139, 0.08)"
                            : med.taken
                              ? "var(--status-good-bg)"
                              : med.snoozedMinutes
                                ? "rgba(245, 158, 11, 0.08)"
                                : "var(--bg-elevated)",
                          border: med.stopped
                            ? "1px dashed rgba(148, 163, 184, 0.45)"
                            : med.taken
                              ? "1px solid var(--status-good-border)"
                              : med.snoozedMinutes
                                ? "1px solid rgba(245, 158, 11, 0.55)"
                                : "1px solid var(--border-color)",
                          cursor: med.stopped ? "default" : "pointer",
                          opacity: med.stopped ? 0.72 : 1,
                          boxShadow: med.snoozedMinutes
                            ? "0 4px 16px rgba(245, 158, 11, 0.15)"
                            : "none",
                          transition: "all 0.25s ease",
                          gap: "16px",
                          flexWrap: "wrap"
                        }}
                      >
                        {/* Left Details */}
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: "1 1 260px" }}>
                          {med.stopped ? (
                            <div
                              title={t.courseStopped || "Course Discontinued"}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                background: "rgba(239, 68, 68, 0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                              }}
                            >
                              <Ban size={18} color="#ef4444" />
                            </div>
                          ) : med.taken ? (
                            <CheckCircle2 size={26} color="var(--secondary)" style={{ flexShrink: 0 }} />
                          ) : med.snoozedMinutes ? (
                            <div
                              title={t.snoozedBadge || "Snoozed"}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                background: "rgba(245, 158, 11, 0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                              }}
                            >
                              <Timer size={18} color="#f59e0b" />
                            </div>
                          ) : (
                            <Circle size={26} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                          )}

                          <div>
                            <div style={{
                              fontWeight: 800,
                              fontSize: "1.02rem",
                              textDecoration: (med.taken || med.stopped) ? "line-through" : "none",
                              color: med.stopped
                                ? "var(--text-muted)"
                                : med.taken
                                  ? "var(--text-muted)"
                                  : "var(--text-highlight)",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              flexWrap: "wrap"
                            }}>
                              <span>{med.name}</span>
                              <span style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 700 }}>
                                ({med.dosage})
                              </span>

                              {med.stopped && (
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                    borderRadius: "6px",
                                    background: "rgba(239, 68, 68, 0.15)",
                                    color: "#ef4444",
                                    border: "1px solid rgba(239, 68, 68, 0.3)"
                                  }}
                                >
                                  🛑 {t.courseStopped || "Course Discontinued"}
                                </span>
                              )}

                              {med.snoozedMinutes && !med.taken && !med.stopped && (
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 800,
                                    padding: "3px 9px",
                                    borderRadius: "6px",
                                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.2))",
                                    color: "#d97706",
                                    border: "1px solid rgba(245, 158, 11, 0.6)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)"
                                  }}
                                >
                                  <Timer size={12} />
                                  {t.snoozedBadge || "Snoozed"} (+{med.snoozedMinutes}m)
                                </span>
                              )}
                            </div>

                            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "12px", marginTop: "4px", flexWrap: "wrap" }}>
                              <span>{translateMedicalTerm(med.purpose, lang)}</span>
                              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <Utensils size={13} /> {med.withFood ? (t.takeWithFood || "Take with/after meals") : (t.emptyStomach || "Take on empty stomach")}
                              </span>
                              {med.stopped && (
                                <span style={{ color: "#ef4444", fontSize: "0.78rem" }}>
                                  • {translateMedicalTerm("Alerts paused", lang)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Actions: Snooze, Stop Course, Resume */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          {med.stopped ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onStopMedicationCourse) onStopMedicationCourse(med.id);
                              }}
                              className="btn"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 14px",
                                borderRadius: "8px",
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(5, 150, 105, 0.12))",
                                color: "var(--secondary)",
                                border: "1px solid var(--secondary-border)",
                                cursor: "pointer"
                              }}
                            >
                              <RotateCcw size={14} />
                              <span>{t.resumeCourse || "Resume Course"}</span>
                            </button>
                          ) : med.taken ? (
                            <span className="badge badge-good" style={{ fontSize: "0.78rem", padding: "4px 10px" }}>
                              <CheckCircle2 size={13} /> {t.optimal || "Taken"}
                            </span>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              {/* SNOOZE BUTTON - HIGHLY VISIBLE AMBER ACCENT */}
                              <div style={{
                                display: "inline-flex",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid rgba(245, 158, 11, 0.55)",
                                boxShadow: "0 2px 10px rgba(245, 158, 11, 0.22)"
                              }}>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onSnoozeMedication) onSnoozeMedication(med.id, 15);
                                  }}
                                  title="Delay dose reminder by 15 minutes"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: "7px 12px",
                                    fontSize: "0.82rem",
                                    fontWeight: 800,
                                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.18))",
                                    color: "#d97706",
                                    border: "none",
                                    borderRight: "1px solid rgba(245, 158, 11, 0.35)",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease"
                                  }}
                                >
                                  <Timer size={14} color="#d97706" />
                                  <span>{t.snooze15m || "Snooze (+15m)"}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onSnoozeMedication) onSnoozeMedication(med.id, 60);
                                  }}
                                  title="Delay dose reminder by 1 hour"
                                  style={{
                                    padding: "7px 10px",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(217, 119, 6, 0.14))",
                                    color: "#d97706",
                                    border: "none",
                                    cursor: "pointer"
                                  }}
                                >
                                  +1h
                                </button>
                              </div>

                              {/* STOP COURSE BUTTON - HIGHLY VISIBLE CRIMSON OUTLINE */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onStopMedicationCourse) onStopMedicationCourse(med.id);
                                }}
                                title="Discontinue or finish treatment course"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "7px 12px",
                                  borderRadius: "8px",
                                  fontSize: "0.82rem",
                                  fontWeight: 800,
                                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(220, 38, 38, 0.12))",
                                  border: "1px solid rgba(239, 68, 68, 0.45)",
                                  color: "#dc2626",
                                  cursor: "pointer",
                                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                <Ban size={14} color="#dc2626" />
                                <span>{t.stopCourse || "Stop Course"}</span>
                              </button>

                              {/* QUICK TAKE NOW */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleMedication(med.id);
                                }}
                                title="Mark this dose as taken"
                                className="btn btn-primary"
                                style={{
                                  padding: "7px 13px",
                                  fontSize: "0.82rem",
                                  fontWeight: 700,
                                  borderRadius: "8px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                              >
                                <Check size={14} />
                                <span>{t.takeNow || "Take Now"}</span>
                              </button>
                            </div>
                          )}

                          <span className={`badge ${med.refillDaysLeft <= 7 ? "badge-critical" : "badge-good"}`} style={{ marginLeft: "4px" }}>
                            <BellRing size={12} /> {med.refillDaysLeft} {t.daysSupplyLeft || "days supply"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Drug Interaction Scanner */}
      {activeTab === "interactions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Active Cross-Check Card */}
          <div className="glass-panel" style={{ padding: "22px 26px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <ShieldCheck size={20} color="var(--secondary)" />
              {translateMedicalTerm("Active Regimen Cross-Compatibility Scan", lang)}
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "14px" }}>
              {lang === "hi"
                ? `पल्स-एआई ने ${patient?.name || "Patient"} द्वारा ली जा रही सभी ${medsList.length} सक्रिय दवाओं की सुरक्षा जांच की है।`
                : `PulseAI verified all ${medsList.length} active prescriptions currently taken by ${patient?.name || "Patient"}.`}
            </p>

            {activeAlerts.length === 0 ? (
              <div style={{
                background: "var(--status-good-bg)",
                border: "1px solid var(--status-good-border)",
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "14px"
              }}>
                <CheckCircle2 size={24} color="var(--secondary)" />
                <div>
                  <div style={{ fontWeight: 800, color: "var(--status-good-text)" }}>
                    {translateMedicalTerm("Zero Internal Conflicts Detected", lang)}
                  </div>
                  <div style={{ fontSize: "0.84rem", color: "var(--text-main)", marginTop: "2px" }}>
                    {lang === "hi"
                      ? "आपकी नियमित दवाओं के बीच कोई प्रतिकूल परस्पर क्रिया नहीं है।"
                      : "All current active medications in the prescription have compatible metabolic pathways."}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {activeAlerts.map((al, idx) => (
                  <div key={idx} style={{
                    background: "var(--status-warn-bg)",
                    border: "1px solid var(--status-warn-border)",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px"
                  }}>
                    <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <div style={{ fontWeight: 800, color: "var(--status-warn-text)", fontSize: "0.95rem" }}>
                        {al.title} ({al.drugA} + {al.drugB})
                      </div>
                      <div style={{ fontSize: "0.84rem", color: "var(--text-main)", marginTop: "3px" }}>
                        {al.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test an OTC / New Drug Simulator */}
          <div className="glass-panel" style={{ padding: "22px 26px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Search size={20} color="var(--primary)" />
              {translateMedicalTerm("Test An Over-The-Counter Medicine Before Taking", lang)}
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "16px" }}>
              Planning to take a painkiller, fever tablet, or supplement? Test it below to check compatibility with <strong>{patient.name}’s</strong> active medications:
            </p>

            <form onSubmit={handleTestInteraction} style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
              <input
                type="text"
                value={testMedName}
                onChange={(e) => setTestMedName(e.target.value)}
                placeholder={t.searchPlaceholder || "Search medicine name..."}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
                {translateMedicalTerm("Scan Safety", lang)}
              </button>
            </form>

            {/* Quick Test Chips */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>{translateMedicalTerm("Quick Test:", lang)}</span>
              {["Ibuprofen (Painkiller)", "Aspirin", "Paracetamol", "Potassium Supplement", "Warfarin"].map((drug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const clean = drug.split(" ")[0];
                    setTestMedName(clean);
                  }}
                  className="btn btn-secondary"
                  style={{ padding: "4px 12px", fontSize: "0.78rem", borderRadius: "8px" }}
                >
                  {drug}
                </button>
              ))}
            </div>

            {/* Results display */}
            {testResult && (
              <div>
                {testResult.isSafe ? (
                  <div style={{
                    background: "var(--status-good-bg)",
                    border: "1px solid var(--status-good-border)",
                    borderRadius: "12px",
                    padding: "16px 20px"
                  }}>
                    <div style={{ fontWeight: 800, color: "var(--status-good-text)", fontSize: "1rem" }}>
                      ✅ No High-Risk Conflict Found for "{testResult.searched}"
                    </div>
                    <div style={{ fontSize: "0.86rem", color: "var(--text-main)", marginTop: "4px" }}>
                      This medication does not exhibit severe adverse interactions with your current prescription. Always adhere to recommended doses.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {testResult.conflicts.map((conf, idx) => (
                      <div key={idx} style={{
                        background: conf.severity === "critical" ? "var(--status-crit-bg)" : "var(--status-warn-bg)",
                        border: conf.severity === "critical" ? "1px solid var(--status-crit-border)" : "1px solid var(--status-warn-border)",
                        borderRadius: "12px",
                        padding: "18px 20px"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: conf.severity === "critical" ? "var(--status-crit-text)" : "var(--status-warn-text)", fontWeight: 800, fontSize: "1rem" }}>
                          <AlertTriangle size={20} />
                          {conf.severity.toUpperCase()} CONFLICT: {testResult.searched} + {conf.currentMed}
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-highlight)", marginTop: "4px" }}>
                          {conf.title}
                        </div>
                        <p style={{ fontSize: "0.86rem", color: "var(--text-main)", marginTop: "6px", lineHeight: "1.5" }}>
                          {conf.description}
                        </p>
                        <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "var(--secondary)", fontWeight: 700 }}>
                          💡 Safer Alternative: {conf.actionRecommendation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
