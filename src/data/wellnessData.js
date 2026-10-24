// PulseAI Clinical Wellness & Preventive Care Engine
// Provides personalized lifestyle recommendations, repeat tests due schedules, and appointment reminders

export const PATIENT_WELLNESS_PROFILES = {
  pat_1: {
    // Rahul Sharma (45M, Type 2 Diabetes, Essential Hypertension, Dyslipidemia)
    wellnessPillars: [
      {
        id: "diet",
        title: "Low-GI & Sodium-Controlled Nutrition",
        simpleTitle: "Low-Salt & Healthy Complex Grains",
        icon: "Utensils",
        color: "#10b981",
        badge: "Diabetes & BP Tailored",
        simpleTarget: "< 1 Tsp Salt Daily",
        simpleAction: "Eat millets, oats, and lentils with green vegetables. Avoid white bread and keep salt under 1 teaspoon a day.",
        simpleWhy: "Prevents sudden blood sugar spikes after meals and keeps your blood pressure in a safe zone.",
        recommendation: "Focus on complex low-glycemic carbohydrates (millets, oats, quinoa) paired with soluble fiber (methi seeds, flaxseeds, legumes). Restrict dietary sodium to under 2,000 mg/day (less than 1 tsp salt).",
        whyRecommended: "Suggested because your latest HbA1c is 7.2% and you take Telmisartan 40mg. Low-GI foods blunt rapid post-prandial glucose surges, while sodium control reduces vascular resistance.",
        category: "Nutrition"
      },
      {
        id: "activity",
        title: "Post-Meal Glucose-Clearing Walks",
        simpleTitle: "25-Min Brisk Walk After Meals",
        icon: "Activity",
        color: "#3b82f6",
        badge: "Insulin Sensitivity",
        simpleTarget: "25-30 Mins / 5 Days",
        simpleAction: "Take a 25-minute brisk walk within 30 minutes of finishing lunch or dinner, 5 days each week.",
        simpleWhy: "Walking after eating uses leg muscles to naturally soak up extra sugar from your bloodstream without extra insulin.",
        recommendation: "Target 25-30 minutes of moderate brisk walking within 30 minutes following lunch or dinner, 5 days per week. Include 2 days of light resistance bands.",
        whyRecommended: "Contracting leg skeletal muscles activates GLUT-4 glucose transporters independently of insulin, immediately absorbing excess circulating blood sugar without stressing your joints.",
        category: "Exercise"
      },
      {
        id: "sleep",
        title: "Restorative Circadian Sleep Hygiene",
        simpleTitle: "7+ Hours Restful Sleep",
        icon: "Moon",
        color: "#8b5cf6",
        badge: "Cortisol Management",
        simpleTarget: "7 - 7.5 Hours Nightly",
        simpleAction: "Sleep in a cool, quiet room. Turn off smartphones, TV, and screens 45 minutes before sleep.",
        simpleWhy: "Good sleep prevents stress hormone spikes that cause high morning fasting sugar and high blood pressure.",
        recommendation: "Aim for 7 to 7.5 hours of uninterrupted sleep in a cool, dark room. Discontinue electronic blue-light screens 45 minutes before bedtime.",
        whyRecommended: "Sleep deprivation spikes early-morning cortisol and epinephrine, directly triggering dawn phenomenon (high fasting glucose) and elevated morning blood pressure.",
        category: "Sleep"
      },
      {
        id: "hydration",
        title: "Kidney Hydration & Metabolic Flush",
        simpleTitle: "8-10 Glasses of Fresh Water",
        icon: "Droplets",
        color: "#06b6d4",
        badge: "Renal Safeguard",
        simpleTarget: "2.5 - 2.8 Liters Daily",
        simpleAction: "Drink 2.5 Liters of water evenly during the day. Avoid drinking large amounts right before sleep.",
        simpleWhy: "Adequate hydration protects your kidneys as they filter daily Metformin and Telmisartan tablets.",
        recommendation: "Drink 2.5 to 2.8 Liters of fresh water evenly throughout the daytime hours. Avoid drinking large volumes immediately before bedtime.",
        whyRecommended: "Adequate hydration supports renal tubular clearance and optimal glomerular filtration rate (eGFR 88) while taking Metformin ER and Telmisartan.",
        category: "Hydration"
      }
    ],
    repeatTestsDue: [
      {
        id: "test_hba1c",
        testName: "Glycated Hemoglobin (HbA1c & Fasting Sugar)",
        simpleName: "HbA1c 3-Month Blood Sugar Check",
        timeframe: "Due in 45 Days (Dec 2026)",
        frequency: "Every 90 Days",
        urgency: "due-soon",
        urgencyBadge: "Due Soon",
        simpleReason: "Checks your 3-month sugar average to see if your diabetes medicines are bringing your 7.2% down.",
        prepTip: "Requires 8-10 hours overnight fasting. Drinking plain water is allowed.",
        guidelineReason: "ADA clinical guidelines mandate repeating HbA1c every 3 months until target (< 6.5%) is achieved from current 7.2% baseline.",
        provider: "Thyrocare / Lal PathLabs"
      },
      {
        id: "test_lipid",
        testName: "Comprehensive Lipid Profile (Cholesterol & Triglycerides)",
        simpleName: "Cholesterol & Lipid Panel",
        timeframe: "Due in 60 Days (Jan 2027)",
        frequency: "Every 6 Months",
        urgency: "scheduled",
        urgencyBadge: "Scheduled",
        simpleReason: "Checks if Rosuvastatin is reducing your bad cholesterol (LDL) towards safe target below 100 mg/dL.",
        prepTip: "Requires 10-12 hours strict fasting. Avoid heavy or oily dinners the previous night.",
        guidelineReason: "Monitor therapeutic response to daily Rosuvastatin 10mg aiming to bring LDL from 134 mg/dL down to < 100 mg/dL.",
        provider: "Apollo Diagnostics"
      },
      {
        id: "test_eye",
        testName: "Diabetic Retinopathy Screening (Fundoscopy)",
        simpleName: "Annual Diabetic Eye Exam (Retina Check)",
        timeframe: "On Track • Due Aug 2027",
        frequency: "Annual",
        urgency: "good",
        urgencyBadge: "On Track",
        simpleReason: "Confirms retinas remain completely healthy with zero diabetes damage.",
        prepTip: "No fasting needed. Eye drops may cause mild blurriness for 2 hours.",
        guidelineReason: "Last fundoscopy on Aug 10, 2026 showed clear retinas with zero microaneurysms. Annual surveillance maintains vision security.",
        provider: "Eye Care Clinic"
      },
      {
        id: "test_renal",
        testName: "Renal Panel (Urine Albumin/Creatinine & eGFR)",
        simpleName: "Kidney Health & Urine Albumin Check",
        timeframe: "Due in 75 Days (Jan 2027)",
        frequency: "Annual",
        urgency: "scheduled",
        urgencyBadge: "Scheduled",
        simpleReason: "Ensures diabetes and blood pressure are not causing early strain on your kidneys.",
        prepTip: "First morning urine sample is best for accurate results.",
        guidelineReason: "Annual microalbuminuria screening ensures early detection of hypertensive or diabetic nephropathy.",
        provider: "Thyrocare Pathlabs"
      }
    ],
    upcomingAppointment: {
      doctorName: "Dr. Arvind Mehta, MD",
      specialty: "Chief Consultant Cardiologist",
      clinic: "Apollo Health City, New Delhi",
      date: "Nov 15, 2026",
      time: "11:30 AM",
      daysLeft: 22,
      purpose: "Quarterly Blood Pressure & Statin Therapy Evaluation",
      notes: "Review 30-day vitals log (BP average 128/82, fasting glucose 115 mg/dL). Discuss Metformin tolerance."
    }
  },

  pat_2: {
    // Ananya Sen (32F, Hypothyroidism, Mild Allergic Asthma)
    wellnessPillars: [
      {
        id: "diet",
        title: "Thyroid-Supportive Nutrient Timing",
        simpleTitle: "Morning Thyroid Pill Timing",
        icon: "Utensils",
        color: "#10b981",
        badge: "Thyroid Balance",
        simpleTarget: "Empty Stomach + 45 Min Wait",
        simpleAction: "Take Levothyroxine on empty stomach with plain water. Wait 45 minutes before tea, coffee, or breakfast.",
        simpleWhy: "Coffee, tea, and milk block your thyroid pill from absorbing properly into your body.",
        recommendation: "Take Levothyroxine on an empty stomach with a full glass of water, waiting at least 45 minutes before breakfast or tea/coffee. Ensure adequate dietary selenium (brazil nuts, sunflower seeds). Avoid excessive raw cruciferous vegetables.",
        whyRecommended: "Coffee, calcium, and iron interfere with Levothyroxine intestinal absorption. Selenium is a necessary cofactor for deiodinase enzymes that convert T4 to active T3.",
        category: "Nutrition"
      },
      {
        id: "activity",
        title: "Gentle Aerobic & Pulmonary Yoga",
        simpleTitle: "Gentle Yoga & Breathing Practice",
        icon: "Activity",
        color: "#3b82f6",
        badge: "Asthma Friendly",
        simpleTarget: "30 Mins / 4 Days",
        simpleAction: "Do 30 minutes of gentle yoga and deep breathing (pranayama) indoors away from dust.",
        simpleWhy: "Expands your lung capacity gently without triggering coughing or sudden asthma tightness.",
        recommendation: "Engage in 30 minutes of low-impact yoga, pilates, and diaphragmatic breathing (pranayama) in a clean, dust-free indoor environment 4 times a week.",
        whyRecommended: "Gentle aerobic conditioning enhances vital lung capacity and diaphragmatic efficiency without triggering exercise-induced bronchospasms.",
        category: "Exercise"
      },
      {
        id: "sleep",
        title: "Hypoallergenic Rest Environment",
        simpleTitle: "Clean & Allergen-Free Bedroom",
        icon: "Moon",
        color: "#8b5cf6",
        badge: "Airway Protection",
        simpleTarget: "7.5 - 8 Hours Nightly",
        simpleAction: "Sleep in a dust-free room with clean anti-dust bedding and air filtration.",
        simpleWhy: "Asthma and allergy triggers peak at night between 2:00 AM and 5:00 AM. A clean room keeps airways relaxed.",
        recommendation: "Maintain 7.5 to 8 hours of sleep using hypoallergenic dust-mite barrier bedding. Keep bedroom humidity between 40-50% with clean air filtration.",
        whyRecommended: "Nocturnal histamine peaks occur between 2:00 AM and 5:00 AM. A clean bedroom prevents nighttime wheezing and morning bronchial stiffness.",
        category: "Sleep"
      },
      {
        id: "hydration",
        title: "Airway Hydration & Warm Liquids",
        simpleTitle: "Warm Herbal Drinks & Water",
        icon: "Droplets",
        color: "#06b6d4",
        badge: "Mucosal Integrity",
        simpleTarget: "2 - 2.5 Liters Daily",
        simpleAction: "Drink 2 to 2.5 Liters of warm water and warm herbal teas (ginger or tulsi) throughout the day.",
        simpleWhy: "Warm liquids soothe throat passages and help keep chest mucus thin and easy to clear.",
        recommendation: "Consume 2 to 2.5 Liters of warm or room-temperature water daily. Sip warm herbal teas (ginger, tulsi) during cooler morning hours.",
        whyRecommended: "Warm hydration thins respiratory secretions and soothes airway hyper-responsiveness.",
        category: "Hydration"
      }
    ],
    repeatTestsDue: [
      {
        id: "test_tsh",
        testName: "Thyroid Function Test (TSH, Free T3, Free T4)",
        simpleName: "Thyroid Hormone Blood Test (TSH)",
        timeframe: "Due in 60 Days (Dec 2026)",
        frequency: "Every 6 Months",
        urgency: "due-soon",
        urgencyBadge: "Due Soon",
        simpleReason: "Checks if your 75 mcg thyroid dose is balanced and keeping your metabolism normal.",
        prepTip: "Give blood in the morning before taking that day's morning thyroid pill.",
        guidelineReason: "Monitor maintenance dosage of Levothyroxine 75 mcg to ensure TSH remains stable around 2.45 mIU/L target range.",
        provider: "Dr. Lal PathLabs"
      },
      {
        id: "test_spirometry",
        testName: "Peak Expiratory Flow & Spirometry Screening",
        simpleName: "Lung Capacity & Asthma Breathing Test",
        timeframe: "Due in 90 Days (Jan 2027)",
        frequency: "Bi-Annual",
        urgency: "scheduled",
        urgencyBadge: "Scheduled",
        simpleReason: "Measures lung airflow to confirm your winter asthma inhaler regimen is protecting you.",
        prepTip: "Do not use fast-acting rescue inhaler for 4 hours before test unless urgent.",
        guidelineReason: "Assess airway reversibility and verify protection provided by Montelukast + Levocetirizine regimen.",
        provider: "Fortis Pulmonary Lab"
      }
    ],
    upcomingAppointment: {
      doctorName: "Dr. Shalini Ray, MD",
      specialty: "Consultant Endocrinologist",
      clinic: "Fortis Escorts Care, Kolkata",
      date: "Nov 28, 2026",
      time: "4:00 PM",
      daysLeft: 35,
      purpose: "Bi-Annual Thyroid Panel & Winter Asthma Management Review",
      notes: "Assess Levothyroxine 75 mcg efficacy and discuss winter allergy prophylaxis."
    }
  }
};

/**
 * Returns wellness pillars, repeat tests, and appointments for a given patient
 */
export function getPatientWellnessData(patientId) {
  return PATIENT_WELLNESS_PROFILES[patientId] || PATIENT_WELLNESS_PROFILES.pat_1;
}
