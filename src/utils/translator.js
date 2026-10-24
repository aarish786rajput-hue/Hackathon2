// Universal Medical and UI Translator for PulseAI
// Supports 10 Languages: en, hi, hinglish, bn, mr, te, ta, gu, pa, kn

export const MEDICAL_DICTIONARY = {
  // Conditions
  "Type 2 Diabetes Mellitus": {
    hi: "टाइप 2 डायबिटीज मेलिटस",
    hinglish: "Type 2 Diabetes Mellitus",
    bn: "টাইপ ২ ডায়াবেটিস মেলিটাস",
    mr: "टाइप २ मधुमेह (डायबिटीज)",
    te: "టైప్ 2 డయాబెటిస్ మెల్లిటస్",
    ta: "வகை 2 நீரிழிவு நோய்",
    gu: "ટાઇપ 2 ડાયાબિટીસ મેલીટસ",
    pa: "ਟਾਈਪ 2 ਸ਼ੂਗਰ (ਡਾਇਬਟੀਜ਼)",
    kn: "ಟೈಪ್ 2 ಮಧುಮೇಹ ಮೆಲ್ಲಿಟಸ್"
  },
  "Essential Hypertension": {
    hi: "उच्च रक्तचाप (हाइपरटेंशन)",
    hinglish: "High BP (Hypertension)",
    bn: "উচ্চ রক্তচাপ (হাইপারটেনশন)",
    mr: "उच्च रक्तदाब (हायपरटेंशन)",
    te: "అధిక రక్తపోటు (హైపర్‌టెన్షన్)",
    ta: "உயர் இரத்த அழுத்தம்",
    gu: "હાઈ બ્લડ પ્રેશર (હાયપરટેન્શન)",
    pa: "ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
    kn: "ಅಧಿಕ ರಕ್ತದೊತ್ತಡ"
  },
  "Mild Dyslipidemia": {
    hi: "हल्का डिस्लिपिडेमिया (कोलेस्ट्रॉल)",
    hinglish: "Mild Cholesterol Imbalance",
    bn: "হালকা ডিসলিপিডেমিয়া (রক্তে চর্বি)",
    mr: "सौम्य डिसलिपिडेमिया (कोलेस्ट्रॉल)",
    te: "తేలికపాటి డిస్లిపిడెమియా",
    ta: "லேசான கொழுப்பு ஏற்றத்தாழ்வு",
    gu: "હળવું ડિસ્લિપિડેમિયા",
    pa: "ਹਲਕਾ ਕੋਲੈਸਟ੍ਰੋਲ ਅਸੰਤੁਲਨ",
    kn: "ಸೌಮ್ಯ ಕೊಲೆಸ್ಟ್ರಾಲ್ ವ್ಯತ್ಯಾಸ"
  },

  // Allergies
  "Penicillin": {
    hi: "पेनिसिलिन",
    hinglish: "Penicillin",
    bn: "পেনিসিলিন",
    mr: "पेनिसिलिन",
    te: "పెన్సిలిన్",
    ta: "பென்சிலின்",
    gu: "પેનિસિલિન",
    pa: "ਪੈਨਿਸਿਲਿਨ",
    kn: "ಪೆನ್ಸಿಲಿನ್"
  },
  "Sulfa Drugs": {
    hi: "सल्फा दवाएं",
    hinglish: "Sulfa Drugs",
    bn: "সালফা ওষুধ",
    mr: "सल्फा औषधे",
    te: "సల్ఫా మందులు",
    ta: "சல்ஃபா மருந்துகள்",
    gu: "સલ્ફા દવાઓ",
    pa: "ਸਲਫਾ ਦਵਾਈਆਂ",
    kn: "ಸಲ್ಫಾ ಔಷಧಗಳು"
  },

  // Statuses & Regimen
  "Active (Oral Agents)": {
    hi: "सक्रिय (दवाओं पर)",
    hinglish: "Active (Medicines par)",
    bn: "সক্রিয় (মুখের ওষুধ চলছে)",
    mr: "सक्रिय (गोळ्या सुरू)",
    te: "యాక్టివ్ (మందులు వాడుతున్నారు)",
    ta: "செயலில் (மாத்திரைகள் மூலம்)",
    gu: "સક્રિય (દવાઓ ચાલુ)",
    pa: "ਸਰਗਰਮ (ਦਵਾਈਆਂ ਚੱਲ ਰਹੀਆਂ ਹਨ)",
    kn: "ಸಕ್ರಿಯ (ಮಾತ್ರೆಗಳು ಚಾಲ್ತಿಯಲ್ಲಿದೆ)"
  },
  "Controlled on ARB": {
    hi: "नियंत्रित (ARB दवा द्वारा)",
    hinglish: "Controlled on ARB",
    bn: "নিয়ন্ত্রিত (ARB ওষুধ দ্বারা)",
    mr: "नियंत्रित (ARB औषधाने)",
    te: "నియంత్రణలో ఉంది (ARB మందు ద్వారా)",
    ta: "கட்டுப்பாட்டில் உள்ளது (ARB)",
    gu: "નિયંત્રિત (ARB દવા દ્વારા)",
    pa: "ਕੰਟਰੋਲ ਹੇਠ (ARB ਦਵਾਈ)",
    kn: "ನಿಯಂತ್ರಣದಲ್ಲಿದೆ (ARB)"
  },
  "Under Statin Therapy": {
    hi: "स्टेटिन थेरेपी जारी",
    hinglish: "Statin Therapy par",
    bn: "স্ট্যাটিন থেরাপি চলছে",
    mr: "स्टॅटिन उपचार सुरू",
    te: "స్టాటిన్ చికిత్సలో ఉంది",
    ta: "ஸ்டேடின் சிகிச்சை கீழ்",
    gu: "સ્ટેટિન સારવાર હેઠળ",
    pa: "ਸਟੈਟਿਨ ਇਲਾਜ ਅਧੀਨ",
    kn: "ಸ್ಟ್ಯಾಟಿನ್ ಚಿಕಿತ್ಸೆಯಲ್ಲಿದೆ"
  },

  // Routines & Slots
  "Morning Routine": {
    hi: "सुबह की दिनचर्या",
    hinglish: "Morning Routine",
    bn: "সকালের রুটিন",
    mr: "सकाळचे वेळापत्रक",
    te: "ఉదయం షెడ్యూల్",
    ta: "காலை அட்டவணை",
    gu: "સવારનો સમય",
    pa: "ਸਵੇਰ ਦਾ ਸਮਾਂ",
    kn: "ಬೆಳಗಿನ ದಿನಚರಿ"
  },
  "Afternoon Routine": {
    hi: "दोपहर की दिनचर्या",
    hinglish: "Afternoon Routine",
    bn: "দুপুরের রুটিন",
    mr: "दुपारचे वेळापत्रक",
    te: "మధ్యాహ్నం షెడ్యూల్",
    ta: "மதிய அட்டவணை",
    gu: "બપોરનો સમય",
    pa: "ਦੁਪਹਿਰ ਦਾ ਸਮਾਂ",
    kn: "ಮಧ್ಯಾಹ್ನದ ದಿನಚರಿ"
  },
  "Night Routine": {
    hi: "रात की दिनचर्या",
    hinglish: "Night Routine",
    bn: "রাতের রুটিন",
    mr: "रात्रीचे वेळापत्रक",
    te: "రాత్రి షెడ్యూల్",
    ta: "இரவு அட்டவணை",
    gu: "રાત્રિનો સમય",
    pa: "ਰਾਤ ਦਾ ਸਮਾਂ",
    kn: "ರಾತ್ರಿಯ ದಿನಚರಿ"
  },
  "Completed": {
    hi: "पूर्ण हुआ",
    hinglish: "Completed",
    bn: "সম্পন্ন",
    mr: "पूर्ण झाले",
    te: "పూర్తయింది",
    ta: "முடிந்தது",
    gu: "પૂર્ણ થયું",
    pa: "ਪੂਰਾ ਹੋਇਆ",
    kn: "ಪೂರ್ಣಗೊಂಡಿದೆ"
  },
  "days supply": {
    hi: "दिनों की खुराक शेष",
    hinglish: "days supply bachi hai",
    bn: "দিনের ওষুধ অবশিষ্ট",
    mr: "दिवसांचा साठा शिल्लक",
    te: "రోజుల మందులు మిగిలి ఉన్నాయి",
    ta: "நாட்கள் இருப்பு உள்ளது",
    gu: "દિવસનો જથ્થો બાકી",
    pa: "ਦਿਨਾਂ ਦੀ ਖੁਰਾਕ ਬਾਕੀ",
    kn: "ದಿನಗಳ ಸರಬರಾಜು ಉಳಿದಿದೆ"
  },
  "Take with/after meals": {
    hi: "भोजन के साथ या बाद में लें",
    hinglish: "Khane ke sath ya baad me lein",
    bn: "খাবারের সাথে বা পরে গ্রহণ করুন",
    mr: "जेवणासोबत किंवा जेवणानंतर घ्या",
    te: "భోజనంతో లేదా తర్వాత తీసుకోండి",
    ta: "உணவுடன் அல்லது உணவுக்குப் பின்",
    gu: "જમ્યા પછી અથવા સાથે લો",
    pa: "ਖਾਣੇ ਦੇ ਨਾਲ ਜਾਂ ਬਾਅਦ ਵਿੱਚ ਲਓ",
    kn: "ಊಟದೊಂದಿಗೆ ಅಥವಾ ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ"
  },
  "Take on empty stomach": {
    hi: "खाली पेट लें",
    hinglish: "Khali pet lein",
    bn: "খালি পেটে গ্রহণ করুন",
    mr: "उपाशीपोटी घ्या",
    te: "ఖాళీ కడుపుతో తీసుకోండి",
    ta: "வெறும் வயிற்றில் உட்கொள்ளவும்",
    gu: "ભૂખ્યા પેટે લો",
    pa: "ਖ਼ਾਲੀ ਪੇਟ ਲਓ",
    kn: "ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ ತೆಗೆದುಕೊಳ್ಳಿ"
  },
  "No medications scheduled for this time.": {
    hi: "इस समय के लिए कोई दवा निर्धारित नहीं है।",
    hinglish: "Is time ke liye koi medicine schedule nahi hai.",
    bn: "এই সময়ের জন্য কোনো ওষুধ নির্ধারিত নেই।",
    mr: "या वेळेसाठी कोणतेही औषध निर्धारित नाही.",
    te: "ఈ సమయానికి ఎటువంటి మందులు షెడ్యూల్ చేయబడలేదు.",
    ta: "இந்த நேரத்திற்கு எந்த மருந்தும் திட்டமிடப்படவில்லை.",
    gu: "આ સમય માટે કોઈ દવા નિર્ધારિત નથી.",
    pa: "ਇਸ ਸਮੇਂ ਲਈ ਕੋਈ ਦਵਾਈ ਨਿਰਧਾਰਤ ਨਹੀਂ ਹੈ।",
    kn: "ಈ ಸಮಯಕ್ಕೆ ಯಾವುದೇ ಔಷಧಗಳು ನಿಗದಿಯಾಗಿಲ್ಲ."
  },

  // Action Buttons & Titles
  "Daily Dosage Schedule": {
    hi: "दैनिक खुराक शेड्यूल",
    hinglish: "Daily Dose Schedule",
    bn: "দৈনিক ডোজের সময়সূচী",
    mr: "दैनिक डोस वेळापत्रक",
    te: "రోజువారీ మోతాదు షెడ్యూల్",
    ta: "தினசரி மருந்தளவு அட்டவணை",
    gu: "દૈનિક ડોઝ શેડ્યૂલ",
    pa: "ਰੋਜ਼ਾਨਾ ਖੁਰਾਕ ਸ਼ਡਿਊਲ",
    kn: "ದೈನಂದಿನ ಡೋಸ್ ವೇಳಾಪಟ್ಟಿ"
  },
  "Drug Interaction Scanner": {
    hi: "दवा टकराव व सुरक्षा स्कैनर",
    hinglish: "Drug Conflict Scanner",
    bn: "ওষুধ সংঘাত ও সুরক্ষা স্ক্যানার",
    mr: "औषध परस्परक्रिया स्कॅनर",
    te: "ఔషధ పరస్పర చర్య స్కానర్",
    ta: "மருந்து முரண்பாடு ஸ்கேனர்",
    gu: "ડ્રગ ઇન્ટરેક્શન સ્કેનર",
    pa: "ਡਰੱਗ ਇੰਟਰਐਕਸ਼ਨ ਸਕੈਨਰ",
    kn: "ಔಷಧ ಪರಸ್ಪರ ಕ್ರಿಯೆ ಸ್ಕ್ಯಾನರ್"
  },
  "Add Medication": {
    hi: "दवा जोड़ें",
    hinglish: "Medicine Add karein",
    bn: "ওষুধ যোগ করুন",
    mr: "औषध जोडा",
    te: "మందును జోడించండి",
    ta: "மருந்து சேர்க்க",
    gu: "દવા ઉમેરો",
    pa: "ਦਵਾਈ ਜੋੜੋ",
    kn: "ಔಷಧ ಸೇರಿಸಿ"
  },
  "Close Form": {
    hi: "फॉर्म बंद करें",
    hinglish: "Form Close karein",
    bn: "ফর্ম বন্ধ করুন",
    mr: "फॉर्म बंद करा",
    te: "ఫారమ్ మూసివేయండి",
    ta: "படிவத்தை மூடு",
    gu: "ફોર્મ બંધ કરો",
    pa: "ਫਾਰਮ ਬੰਦ ਕਰੋ",
    kn: "ಫಾರ್ಮ್ ಮುಚ್ಚಿ"
  },
  "Add New Prescription": {
    hi: "नया नुस्खा (प्रिस्क्रिप्शन) जोड़ें",
    hinglish: "New Prescription Add karein",
    bn: "নতুন প্রেসক্রিপশন যোগ করুন",
    mr: "नवीन प्रिस्क्रिप्शन जोडा",
    te: "కొత్త ప్రిస్క్రిప్షన్ జోడించండి",
    ta: "புதிய மருந்துச் சீட்டைச் சேர்க்கவும்",
    gu: "નવું પ્રિસ્ક્રિપ્શન ઉમેરો",
    pa: "ਨਵਾਂ ਨੁਸਖਾ ਜੋੜੋ",
    kn: "ಹೊಸ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸೇರಿಸಿ"
  },
  "Medication Name": {
    hi: "दवा का नाम",
    hinglish: "Medicine Name",
    bn: "ওষুধের নাম",
    mr: "औषधाचे नाव",
    te: "మందు పేరు",
    ta: "மருந்தின் பெயர்",
    gu: "દવાનું નામ",
    pa: "ਦਵਾਈ ਦਾ ਨਾਮ",
    kn: "ಔಷಧಿಯ ಹೆಸರು"
  },
  "Dosage": {
    hi: "खुराक (डोज़)",
    hinglish: "Dosage",
    bn: "ডোজ / মাত্রা",
    mr: "डोस (प्रमाण)",
    te: "మోతాదు",
    ta: "மருந்தளவு",
    gu: "માત્રા",
    pa: "ਖੁਰਾਕ",
    kn: "ಪ್ರಮಾಣ (ಡೋಸೇಜ್)"
  },
  "Daily Timing": {
    hi: "दिन का समय",
    hinglish: "Daily Timing",
    bn: "গ্রহণের সময়",
    mr: "घेण्याची वेळ",
    te: "తీసుకోవలసిన సమయం",
    ta: "எடுத்துக்கொள்ளும் நேரம்",
    gu: "સમય",
    pa: "ਸਮਾਂ",
    kn: "ಸಮಯ"
  },
  "Purpose / Condition": {
    hi: "उद्देश्य / बीमारी",
    hinglish: "Kiske liye hai (Condition)",
    bn: "উদ্দেশ্য / রোগ",
    mr: "उद्देश / आजार",
    te: "ఉద్దేశం / వ్యాధి",
    ta: "நோக்கம் / நோய்",
    gu: "રોગ / હેતુ",
    pa: "ਮਕਸਦ / ਬਿਮਾਰੀ",
    kn: "ಉದ್ದೇಶ / ಸ್ಥಿತಿ"
  },
  "Save to Daily Regimen": {
    hi: "दैनिक दिनचर्या में सुरक्षित करें",
    hinglish: "Save to Daily Regimen",
    bn: "দৈনিক তালিকায় সংরক্ষণ করুন",
    mr: "वेळापत्रकात सेव्ह करा",
    te: "రోజువారీ జాబితాలో సేవ్ చేయండి",
    ta: "பட்டியலில் சேமிக்கவும்",
    gu: "સેવ કરો",
    pa: "ਸੁਰੱਖਿਅਤ ਕਰੋ",
    kn: "ದಿನಚರಿಯಲ್ಲಿ ಉಳಿಸಿ"
  },
  "Test An Over-The-Counter Medicine Before Taking": {
    hi: "बिना पर्ची वाली (OTC) दवा लेने से पहले जांचें",
    hinglish: "OTC Medicine lene se pehle Safety check karein",
    bn: "কোনো সাধারণ বা ব্যথানাশক ওষুধ খাওয়ার আগে পরীক্ষা করুন",
    mr: "कोणतेही वेदनाशामक औषध घेण्यापूर्वी तपासा",
    te: "ఏదైనా పెయిన్‌కిల్లర్ తీసుకునే ముందు సురక్షితతను పరీక్షించండి",
    ta: "வலி நிவாரணி மாத்திரை எடுக்கும் முன் சோதிக்கவும்",
    gu: "પેઇનકિલર લેતાં પહેલાં તપાસો",
    pa: "ਕੋਈ ਵੀ ਦਵਾਈ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਸੁਰੱਖਿਆ ਪਰਖੋ",
    kn: "ಯಾವುದೇ ನೋವು ನಿವಾರಕ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಪರೀಕ್ಷಿಸಿ"
  },
  "Scan Safety": {
    hi: "सुरक्षा जांचें",
    hinglish: "Scan Safety",
    bn: "নিরাপত্তা স্ক্যান করুন",
    mr: "सुरक्षितता तपासा",
    te: "భద్రతను స్కాన్ చేయండి",
    ta: "பாதுகாப்பைச் சோதிக்கவும்",
    gu: "તપાસો",
    pa: "ਜਾਂਚ ਕਰੋ",
    kn: "ಸುರಕ್ಷತೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ"
  },
  "Quick Test:": {
    hi: "त्वरित जांच:",
    hinglish: "Quick Test:",
    bn: "দ্রুত পরীক্ষা:",
    mr: "जलद चाचणी:",
    te: "త్వరిత పరీక్ష:",
    ta: "விரைவு சோதனை:",
    gu: "ઝડપી પરીક્ષણ:",
    pa: "ਤੁਰੰਤ ਜਾਂਚ:",
    kn: "ತ್ವರಿತ ಪರೀಕ್ಷೆ:"
  },
  "Safer Alternative:": {
    hi: "💡 सुरक्षित विकल्प:",
    hinglish: "💡 Safer Alternative:",
    bn: "💡 নিরাপদ বিকল্প:",
    mr: "💡 सुरक्षित पर्याय:",
    te: "💡 సురక్షితమైన ప్రత్యామ్నಾಯం:",
    ta: "💡 பாதுகாப்பான மாற்று:",
    gu: "💡 સુરક્ષિત વિકલ્પ:",
    pa: "💡 ਸੁਰੱਖਿਅਤ ਬਦਲ:",
    kn: "💡 ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ:"
  },

  // ── Medications & Routines ──
  "Morning (After breakfast)": {
    hi: "सुबह (नाश्ते के बाद)",
    hinglish: "Subah (Breakfast ke baad)",
    pa: "ਸਵੇਰੇ (ਨਾਸ਼ਤੇ ਤੋਂ ਬਾਅਦ)",
    bn: "সকালে (প্রাতঃরাশের পর)",
    mr: "सकाळी (न्याहारीनंतर)",
    te: "ఉదయం (అల్పాహారం తర్వాత)",
    ta: "காலை (காலை உணவுக்குப் பின்)",
    gu: "સવારે (નાસ્તા પછી)",
    kn: "ಬೆಳಿಗ್ಗೆ (ಉಪಾಹಾರದ ನಂತರ)"
  },
  "Morning (8:00 AM)": {
    hi: "सुबह (8:00 AM)",
    hinglish: "Subah (8:00 AM)",
    pa: "ਸਵੇਰੇ (8:00 AM)",
    bn: "সকালে (৮:০০ AM)",
    mr: "सकाळी (८:०० AM)",
    te: "ఉదయం (8:00 AM)",
    ta: "காலை (8:00 AM)",
    gu: "સવારે (8:00 AM)",
    kn: "ಬೆಳಿಗ್ಗೆ (8:00 AM)"
  },
  "Afternoon (1:30 PM)": {
    hi: "दोपहर (1:30 PM)",
    hinglish: "Dopahar (1:30 PM)",
    pa: "ਦੁਪਹਿਰ (1:30 PM)",
    bn: "দুপুরে (১:৩০ PM)",
    mr: "दुपारी (१:३० PM)",
    te: "మధ్యాహ్నం (1:30 PM)",
    ta: "மதியம் (1:30 PM)",
    gu: "બપોરે (1:30 PM)",
    kn: "ಮಧ್ಯಾಹ್ನ (1:30 PM)"
  },
  "Night (9:30 PM)": {
    hi: "रात (9:30 PM)",
    hinglish: "Raat (9:30 PM)",
    pa: "ਰਾਤ (9:30 PM)",
    bn: "রাতে (৯:৩০ PM)",
    mr: "रात्री (९:३० PM)",
    te: "రాత్రి (9:30 PM)",
    ta: "இரவு (9:30 PM)",
    gu: "રાત્રે (9:30 PM)",
    kn: "ರಾತ್ರಿ (9:30 PM)"
  },
  "Blood Glucose Regulation": {
    hi: "ब्लड शुगर नियंत्रण",
    hinglish: "Blood Sugar Control",
    pa: "ਬਲੱਡ ਸ਼ੂਗਰ ਕੰਟਰੋਲ",
    bn: "রক্তের শর্করা নিয়ন্ত্রণ",
    mr: "रक्तातील साखर नियंत्रण",
    te: "రక్తంలో చక్కెర నియంత్రణ",
    ta: "இரத்த சர்க்கரை கட்டுப்பாடு",
    gu: "બ્લડ શુગર નિયંત્રણ",
    kn: "ರಕ್ತದ ಸಕ್ಕರೆ ನಿಯಂತ್ರಣ"
  },
  "Blood Pressure Control": {
    hi: "ब्लड प्रेशर नियंत्रण",
    hinglish: "Blood Pressure Control",
    pa: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਕੰਟਰੋਲ",
    bn: "রক্তচাপ নিয়ন্ত্রণ",
    mr: "रक्तदाब नियंत्रण",
    te: "రక్తపోటు నియంత్రణ",
    ta: "இரத்த அழுத்த கட்டுப்பாடு",
    gu: "બ્લડ પ્રેશર નિયંત્રણ",
    kn: "ರಕ್ತದೊತ್ತಡ ನಿಯಂತ್ರಣ"
  },
  "Stimulate Insulin Release": {
    hi: "इंसुलिन स्राव प्रोत्साहन",
    hinglish: "Insulin release stimulate karna",
    pa: "ਇੰਸੁਲਿਨ ਰਿਲੀਜ਼ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ",
    bn: "ইনসুলিন ক্ষরণ উদ্দীপনা",
    mr: "इन्सुलिन स्राव उत्तेजन",
    te: "ఇన్సులిన్ విడుదలను ప్రేరేపించడం",
    ta: "இன்சுலின் சுரப்பை தூண்டுதல்",
    gu: "ઇન્સ્યુલિન સ્ત્રાવ ઉત્તેજન",
    kn: "ಇನ್ಸುಲಿನ್ ಸ್ರವಿಸುವಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸುವುದು"
  },
  "Cholesterol Management": {
    hi: "कोलेस्ट्रॉल प्रबंधन",
    hinglish: "Cholesterol Control",
    pa: "ਕੋਲੈਸਟ੍ਰੋਲ ਪ੍ਰਬੰਧਨ",
    bn: "কোলেস্টেরল ব্যবস্থাপনা",
    mr: "कोलेस्टेरॉल नियंत्रण",
    te: "కొలెస్ట్రాల్ నిర్వహణ",
    ta: "கொலஸ்ட்ரால் மேலாண்மை",
    gu: "કોલેસ્ટ્રોલ નિયંત્રણ",
    kn: "ಕೊಲೆಸ್ಟ್ರಾಲ್ ನಿರ್ವಹಣೆ"
  },
  "Next: Rosuvastatin (Night)": {
    hi: "अगली: रोसुवास्टेटिन (रात)",
    hinglish: "Next: Rosuvastatin (Night)",
    pa: "ਅਗਲੀ: ਰੋਸੁਵਾਸਟੈਟਿਨ (ਰਾਤ)",
    bn: "পরবর্তী: রোসুভাস্ট্যাটিন (রাত)",
    mr: "पुढील: रोसुव्हास्टॅटिन (रात्र)",
    te: "తదుపరి: రోసువాస్టాటిన్ (రాత్రి)",
    ta: "அடுத்தது: ரோசுவாஸ்டேடின் (இரவு)",
    gu: "આગામી: રોસુવાસ્ટેટિન (રાત)",
    kn: "ಮುಂದಿನದು: ರೊಸುವಾಸ್ಟಾಟಿನ್ (ರಾತ್ರಿ)"
  },
  "Active Regimen Cross-Compatibility Scan": {
    hi: "दवा सुरक्षा व अनुकूलता जांच",
    hinglish: "Active Medicine Compatibility Scan",
    pa: "ਦਵਾਈ ਸੁਰੱਖਿਆ ਤੇ ਅਨੁਕੂਲਤਾ ਜਾਂਚ",
    bn: "ওষুধের নিরাপত্তা ও সামঞ্জস্য পরীক্ষা",
    mr: "औषध सुरक्षितता व अनुकूलता तपासणी",
    te: "మందుల భద్రత & అనుకూలత స్కాన్",
    ta: "மருந்து பாதுகாப்பு மற்றும் இணக்கத்தன்மை சோதனை",
    gu: "દવા સુરક્ષા તપાસ",
    kn: "ಔಷಧ ಹೊಂದಾಣಿಕೆ ಪರಿಶೀಲನೆ"
  },
  "All 4 active prescriptions verified for cross-compatibility. Alert: Avoid over-the-counter Ibuprofen due to your Telmisartan prescription.": {
    hi: "आपकी सभी 4 नियमित दवाइयां सुरक्षित हैं। चेतावनी: बीपी की दवा के कारण ब्रूफेन (Ibuprofen) जैसी दर्द निवारक दवाओं से बचें।",
    hinglish: "Aapki 4 prescriptions safe hain. Alert: BP ki dawa ke sath Ibuprofen na lein.",
    pa: "ਤੁਹਾਡੀਆਂ 4 ਦਵਾਈਆਂ ਸੁਰੱਖਿਅਤ ਹਨ। ਚੇਤਾਵਨੀ: ਬੀਪੀ ਦਵਾਈ ਦੇ ਨਾਲ ਆਈਬੂਪ੍ਰੋਫੇਨ ਤੋਂ ਬਚੋ।",
    bn: "আপনার ৪টি নিয়মিত ওষুধ সম্পূর্ণ নিরাপদ। সতর্কতা: বিপি ওষুধের কারণে আইবুপ্রোফেন এড়িয়ে চলুন।",
    mr: "आपली सर्व नियमित औषधे सुरक्षित आहेत. सतर्कता: बीपी औषधांसोबत इबुप्रोफेन घेऊ नका.",
    te: "మీ 4 రెగ్యులర్ ప్రిస్క్రిప్షన్లు సురక్షితమైనవి. హెచ్చరిక: బీపీ మందులతో ఇబుప్రోఫెన్ వాడవద్దు.",
    ta: "உங்கள் 4 வழக்கமான மருந்துகளும் பாதுகாப்பானவை. எச்சரிக்கை: இரத்த அழுத்த மருந்துகளுடன் இபுபுரூஃபனைத் தவிர்க்கவும்.",
    gu: "તમારી બધી 4 દવાઓ સુરક્ષિત છે. ચેતવણી: બીપી દવા સાથે આઇબુપ્રોફેન ન લેશો.",
    kn: "ನಿಮ್ಮ 4 ನಿಯಮಿತ ಔಷಧಿಗಳು ಸುರಕ್ಷಿತವಾಗಿವೆ. ಎಚ್ಚರಿಕೆ: ಬಿಪಿ ಔಷಧಿಯೊಂದಿಗೆ ಐಬುಪ್ರೊಫೇನ್ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ."
  },

  // ── Vitals & Trends ──
  "Resting Pulse": {
    hi: "नाड़ी की गति (हार्ट रेट)",
    hinglish: "Resting Pulse Rate",
    pa: "ਦਿਲ ਦੀ ਗਤੀ (Pulse Rate)",
    bn: "নাড়ির গতি (Pulse Rate)",
    mr: "हृदयाचे ठोके (Pulse Rate)",
    te: "నాడి వేగం (Pulse Rate)",
    ta: "நாடித் துடிப்பு (Pulse Rate)",
    gu: "હૃદયના ધબકારા",
    kn: "ನಾಡಿಮಿಡಿತ (Pulse Rate)"
  },
  "Oxygen:": {
    hi: "ऑक्सीजन:",
    hinglish: "Oxygen:",
    pa: "ਆਕਸੀਜਨ:",
    bn: "অক্সিজেন:",
    mr: "ऑक्सिजन:",
    te: "ఆక్సిజన్:",
    ta: "ஆக்ஸிஜன்:",
    gu: "ઓક્સિજન:",
    kn: "ಆಮ್ಲಜನಕ:"
  },
  "Steady reduction (-0.6 kg)": {
    hi: "वजन में सुधार (-0.6 kg)",
    hinglish: "Steady weight reduction (-0.6 kg)",
    pa: "ਭਾਰ ਵਿੱਚ ਕਮੀ (-0.6 ਕਿਲੋ)",
    bn: "ওজন হ্রাস (-০.৬ কেজি)",
    mr: "वजनात घट (-०.६ किलो)",
    te: "బరువు తగ్గడం (-0.6 కేజీ)",
    ta: "எடை குறைவு (-0.6 கிலோ)",
    gu: "વજનમાં ઘટાડો (-0.6 કિલો)",
    kn: "ತೂಕ ಇಳಿಕೆ (-0.6 ಕೆಜಿ)"
  },
  "Healthy": {
    hi: "स्वस्थ",
    hinglish: "Healthy",
    pa: "ਤੰਦਰੁਸਤ",
    bn: "সুস্থ",
    mr: "निरोगी",
    te: "ఆరోగ్యకరమైన",
    ta: "ஆரோக்கியமான",
    gu: "તંદુરસ્ત",
    kn: "ಆರೋಗ್ಯಕರ"
  },
  "Optimal": {
    hi: "सामान्य",
    hinglish: "Normal",
    pa: "ਸਧਾਰਨ",
    bn: "স্বাভাবিক",
    mr: "उत्कृष्ट",
    te: "సాధారణం",
    ta: "இயல்பானது",
    gu: "સામાન્ય",
    kn: "ಸಾಮಾನ್ಯ"
  },
  "In Target": {
    hi: "लक्ष्य में",
    hinglish: "Target me",
    pa: "ਟੀਚੇ ਵਿੱਚ",
    bn: "লক্ষ্যের মধ্যে",
    mr: "लक्ष्यात",
    te: "లక్ష్యంలో",
    ta: "இலக்கில்",
    gu: "ટાર્ગેટમાં",
    kn: "ಗುರಿಯಲ್ಲಿ"
  },
  "Borderline": {
    hi: "सीमांत",
    hinglish: "Borderline",
    pa: "ਸੀਮਾ 'ਤੇ",
    bn: "প্রান্তিক",
    mr: "सीमावर्ती",
    te: "బోర్డర్‌లైన్",
    ta: "எல்லைக்கோடு",
    gu: "બોર્ડરલાઇન",
    kn: "ಗಡಿಯಲ್ಲಿ"
  },
  "improved": {
    hi: "सुधार हुआ",
    hinglish: "behtar hua",
    pa: "ਸੁਧਾਰ ਹੋਇਆ",
    bn: "উন্নত",
    mr: "सुधारले",
    te: "మెరుగైంది",
    ta: "மேம்பட்டது",
    gu: "સુધારો થયો",
    kn: "ಸುಧಾರಿಸಿದೆ"
  },
  "Post-meal:": {
    hi: "खाने के बाद:",
    hinglish: "Khane ke baad:",
    pa: "ਖਾਣੇ ਤੋਂ ਬਾਅਦ:",
    bn: "খাবারের পর:",
    mr: "जेवणानंतर:",
    te: "భోజనం తర్వాత:",
    ta: "உணவுக்குப் பின்:",
    gu: "જમ્યા પછી:",
    kn: "ಊಟದ ನಂತರ:"
  },

  // ── Alerts & Tips ──
  "Your HbA1c is 7.2%. AI has generated 3 doctor-targeted questions and plain-language breakdown.": {
    hi: "आपका HbA1c 7.2% है। AI ने डॉक्टर से पूछने के लिए 3 महत्वपूर्ण प्रश्न और सरल सारांश तैयार किया है।",
    hinglish: "Aapka HbA1c 7.2% hai. AI ne doctor consultation ke liye 3 targeted questions aur simple summary taiyar ki hai.",
    pa: "ਤੁਹਾਡਾ HbA1c 7.2% ਹੈ। AI ਨੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਲਈ 3 ਜ਼ਰੂਰੀ ਸਵਾਲ ਅਤੇ ਸਰਲ ਵੇਰਵਾ ਤਿਆਰ ਕੀਤਾ ਹੈ।",
    bn: "আপনার HbA1c হলো ৭.২%। AI ডাক্তারের সাথে আলোচনার জন্য ৩টি লক্ষ্যযুক্ত প্রশ্ন এবং সহজ বিশ্লেষণ তৈরি করেছে।",
    mr: "तुमचे HbA1c ७.२% आहे. AI ने डॉक्टरांशी चर्चेसाठी ३ महत्त्वाचे प्रश्न आणि सोपे विश्लेषण तयार केले आहे.",
    te: "మీ HbA1c 7.2% గా ఉంది. డాక్టర్‌తో చర్చించడానికి AI 3 ముఖ్యమైన ప్రశ్నలను మరియు సులభమైన వివరణను సిద్ధం చేసింది.",
    ta: "உங்கள் HbA1c 7.2% ஆகும். மருத்துவரிடம் ஆலோசனை பெற AI 3 முக்கிய கேள்விகளையும் எளிய விளக்கத்தையும் தயாரித்துள்ளது.",
    gu: "તમારું HbA1c 7.2% છે. AI એ ડૉક્ટરની સલાહ માટે 3 લક્ષિત પ્રશ્નો અને સરળ વિશ્લેષણ તૈયાર કર્યું છે.",
    kn: "ನಿಮ್ಮ HbA1c 7.2% ಆಗಿದೆ. ವೈದ್ಯರ ಸಮಾಲೋಚನೆಗಾಗಿ AI 3 ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳನ್ನು ಮತ್ತು ಸರಳ ವಿವರಣೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿದೆ."
  },
  "Lab Report Ready: Thyrocare Metabolic Panel": {
    hi: "लैब टेस्ट तैयार: थायरोकेयर मेटाबॉलिक पैनल",
    hinglish: "Lab Report Ready: Thyrocare Metabolic Panel",
    pa: "ਲੈਬ ਰਿਪੋਰਟ ਤਿਆਰ: ਥਾਇਰੋਕੇਅਰ ਮੈਟਾਬੋਲਿਕ ਪੈਨਲ",
    bn: "ল্যাব রিপোর্ট প্রস্তুত: থাইরোকেয়ার মেটাবলিক প্যানেল",
    mr: "लॅब रिपोर्ट तयार: थायरोकेअर मेटाबॉलिक पॅनेल",
    te: "ల్యాబ్ రిపోర్ట్ సిద్ధంగా ఉంది: మెటబాలిక్ ప్యానెల్",
    ta: "ஆய்வக அறிக்கை தயார்: தைரோகேர் மெட்டபாலிக் பேனல்",
    gu: "લેબ રિપોર્ટ તૈયાર: મેટાબોલિક પેનલ",
    kn: "ಲ್ಯಾಬ್ ವರದಿ ಸಿದ್ಧ: ಥೈರೋಕೇರ್ ಮೆಟಾಬಾಲಿಕ್ ಪ್ಯಾನಲ್"
  },
  "View Report Breakdown →": {
    hi: "रिपोर्ट विवरण देखें →",
    hinglish: "Report Details Dekhein →",
    pa: "ਰਿਪੋਰਟ ਵੇਰਵੇ ਵੇਖੋ →",
    bn: "রিপোর্টের বিবরণ দেখুন →",
    mr: "रिपोर्ट तपशील पहा →",
    te: "రిపోర్టు వివరాలు చూడండి →",
    ta: "அறிக்கை விவரங்களைப் பார்க்கவும் →",
    gu: "રિપોર્ટ વિગતો જુઓ →",
    kn: "ವರದಿಯ ವಿವರಗಳನ್ನು ನೋಡಿ →"
  },
  "Offline Mode Active: Internet disconnected. Emergency Health ID & Medications remain fully accessible offline.": {
    hi: "ऑफ़लाइन मोड सक्रिय: इंटरनेट डिस्कनेक्ट है। इमरजेंसी मेडिकल ID व दवाइयां बिना इंटरनेट सुरक्षित उपलब्ध हैं।",
    hinglish: "Offline Mode Active: Internet band hai. Emergency ID aur Medicines offline available hain.",
    pa: "ਔਫਲਾਈਨ ਮੋਡ ਸਰਗਰਮ: ਇੰਟਰਨੈਟ ਡਿਸਕਨੈਕਟ ਹੈ। ਐਮਰਜੈਂਸੀ ਹੈਲਥ ਆਈਡੀ ਅਤੇ ਦਵਾਈਆਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਉਪਲਬਧ ਹਨ।",
    bn: "অফলাইন মোড সক্রিয়: ইন্টারনেট সংযোগ বিচ্ছিন্ন। জরুরি স্বাস্থ্য আইডি এবং ওষুধ অফলাইনে সম্পূর্ণ উপলব্ধ।",
    mr: "ऑफलाइन मोड सक्रिय: इंटरनेट डिस्कनेक्ट झाले आहे. आपत्कालीन आरोग्य आयडी आणि औषधे सुरक्षित उपलब्ध आहेत.",
    te: "ఆఫ్‌లైన్ మోడ్ సక్రియంగా ఉంది: ఇంటర్నెట్ డిస్‌కనెక్ట్ అయింది. అత్యవసర హెల్త్ ఐడీ & మందులు అందుబాటులో ఉన్నాయి.",
    ta: "ஆஃப்லைன் பயன்முறை செயலில் உள்ளது: இணையம் துண்டிக்கப்பட்டுள்ளது. அவசர சுகாதார ஐடி & மருந்துகள் கிடைக்கும்.",
    gu: "ઑફલાઇન મોડ સક્રિય: ઇન્ટરનેટ બંધ છે. ઇમરજન્સી હેલ્થ ID અને દવાઓ ઑફલાઇન ઉપલબ્ધ છે.",
    kn: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ: ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಂಡಿದೆ. ತುರ್ತು ಹೆಲ್ತ್ ಐಡಿ ಮತ್ತು ಔಷಧಿಗಳು ಲಭ್ಯವಿದೆ."
  },
  "🚨 View Emergency ID": {
    hi: "🚨 आपातकालीन आईडी देखें",
    hinglish: "🚨 Emergency ID Dekhein",
    pa: "🚨 ਐਮਰਜੈਂਸੀ ਆਈਡੀ ਵੇਖੋ",
    bn: "🚨 জরুরি আইডি দেখুন",
    mr: "🚨 आणीबाणी आयडी पहा",
    te: "🚨 ఎమర్జెన్సీ ఐడీ చూడండి",
    ta: "🚨 அவசர ஐடியைக் காண்க",
    gu: "🚨 ઇમરજન્સી ID જુઓ",
    kn: "🚨 ತುರ್ತು ಐಡಿ ವೀಕ್ಷಿಸಿ"
  },
  "View Emergency ID": {
    hi: "आपातकालीन आईडी देखें",
    hinglish: "Emergency ID Dekhein",
    pa: "ਐਮਰਜੈਂਸੀ ਆਈਡੀ ਵੇਖੋ",
    bn: "জরুরি আইডি দেখুন",
    mr: "आणीबाणी आयडी पहा",
    te: "ఎమర్జెన్సీ ఐడీ చూడండి",
    ta: "அவசர ஐடியைக் காண்க",
    gu: "ઇમરજન્સી ID જુઓ",
    kn: "ತುರ್ತು ಐಡಿ ವೀಕ್ಷಿಸಿ"
  },
  "HOW DO YOU FEEL RIGHT NOW? (ONE-TOUCH TRIAGE)": {
    hi: "अभी आप कैसा महसूस कर रहे हैं? (त्वरित जांच)",
    hinglish: "Abhi aap kaisa feel kar rahe hain?",
    pa: "ਹੁਣ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ? (ਤੁਰੰਤ ਜਾਂਚ)",
    bn: "এখন আপনি কেমন অনুভব করছেন? (এক স্পর্শে মূল্যায়ন)",
    mr: "आत्ता तुम्हाला कसे वाटत आहे? (त्वरित तपासणी)",
    te: "ఇప్పుడు మీకు ఎలా అనిపిస్తోంది? (త్వరిత పరీక్ష)",
    ta: "இப்போது எப்படி உணர்கிறீர்கள்? (விரைவு சோதனை)",
    gu: "અત્યારે તમને કેવું લાગે છે? (ઝડપી તપાસ)",
    kn: "ಈಗ ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ? (ತ್ವರಿತ ಪರೀಕ್ಷೆ)"
  },
  "Feeling dizzy / shaky": {
    hi: "चक्कर आना / कमजोरी",
    hinglish: "Chakkar aana / Kamzori",
    pa: "ਚੱਕਰ ਆਉਣਾ / ਕੰਬਣੀ",
    bn: "মাথা ঘোরা / দুর্বলতা",
    mr: "चक्कर येणे / थरथरणे",
    te: "తలతిరగడం / వణుకు",
    ta: "தலைச்சுற்றல் / நடுக்கம்",
    gu: "ચક્કર આવવા / કંપન",
    kn: "ತಲೆತಿರುಗುವಿಕೆ / ನಡುಕ"
  },
  "Explain HbA1c 7.2%": {
    hi: "HbA1c 7.2% का क्या मतलब है?",
    hinglish: "HbA1c 7.2% ka matlab samjhao",
    pa: "HbA1c 7.2% ਦਾ ਕੀ ਅਰਥ ਹੈ?",
    bn: "HbA1c ৭.২% এর অর্থ কী?",
    mr: "HbA1c ७.२% चा अर्थ काय?",
    te: "HbA1c 7.2% అర్థం ఏమిటి?",
    ta: "HbA1c 7.2% என்றால் என்ன?",
    gu: "HbA1c 7.2% નો અર્થ શું છે?",
    kn: "HbA1c 7.2% ನ ಅರ್ಥವೇನು?"
  },
  "When to take Statin?": {
    hi: "स्टेटिन कब लेनी चाहिए?",
    hinglish: "Statin kab leni chahiye?",
    pa: "ਸਟੈਟਿਨ ਕਦੋਂ ਲੈਣੀ ਚਾਹੀਦੀ ਹੈ?",
    bn: "স্ট্যাটিন কখন গ্রহণ করতে হবে?",
    mr: "स्टॅटिन कधी घ्यावी?",
    te: "స్టాటిన్ ఎప్పుడు తీసుకోవాలి?",
    ta: "ஸ்டேடின் எப்போது எடுக்க வேண்டும்?",
    gu: "સ્ટેટિન ક્યારે લેવી?",
    kn: "ಸ್ಟ್ಯಾಟಿನ್ ಯಾವಾಗ ತೆಗೆದುಕೊಳ್ಳಬೇಕು?"
  },
  "Find Specialist Doctor": {
    hi: "विशेषज्ञ डॉक्टर खोजें",
    hinglish: "Specialist Doctor Khojein",
    pa: "ਮਾਹਿਰ ਡਾਕਟਰ ਲੱਭੋ",
    bn: "বিশেষজ্ঞ ডাক্তার খুঁজুন",
    mr: "तज्ज्ञ डॉक्टर शोधा",
    te: "స్పెషలిస్ట్ వైద్యుడిని కనుగొనండి",
    ta: "நிபுணர் மருத்துவரைத் தேடுங்கள்",
    gu: "નિષ્ણાત ડૉક્ટર શોધો",
    kn: "ತಜ್ಞ ವೈದ್ಯರನ್ನು ಹುಡುಕಿ"
  },
  "Start Symptom Check": {
    hi: "लक्षण जांच शुरू करें",
    hinglish: "Symptom check shuru karein",
    pa: "ਲੱਛਣ ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ",
    bn: "লক্ষণ পরীক্ষা শুরু করুন",
    mr: "लक्षण तपासणी सुरू करा",
    te: "లక్షణాల పరీక్ష ప్రారంభించండి",
    ta: "அறிகுறி பரிசோதனையைத் தொடங்குங்கள்",
    gu: "લક્ષણ તપાસ શરૂ કરો",
    kn: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ"
  },

  // ── Patient Lifestyle, Family & History ──
  "Non-Smoker": {
    hi: "धूम्रपान नहीं करते",
    hinglish: "Non-Smoker",
    pa: "ਸਿਗਰਟਨੋਸ਼ੀ ਨਹੀਂ ਕਰਦੇ",
    bn: "ধূমপান করেন না",
    mr: "धूम्रपान करत नाही",
    te: "ధూమపానం చేయరు",
    ta: "புகைபிடிப்பதில்லை",
    gu: "ધૂમ્રપાન નથી કરતા",
    kn: "ಧೂಮಪಾನ ಮಾಡುವುದಿಲ್ಲ"
  },
  "Occasional (Social)": {
    hi: "कभी-कभार (सामाजिक)",
    hinglish: "Occasional (Social)",
    pa: "ਕਦੇ-ਕਦਾਈਂ (ਸਮਾਜਿਕ)",
    bn: "কখনও কখনও (সামাজিক)",
    mr: "कधीतरी (सामाजिक)",
    te: "అప్పుడప్పుడు (సామాజిక)",
    ta: "எப்போதாவது",
    gu: "ક્યારેક ક્યારેક",
    kn: "ಅಪರೂಪಕ್ಕೆ"
  },
  "Moderate (30 mins brisk walk, 5x/wk)": {
    hi: "मध्यम (30 मिनट तेज सैर, हफ्ते में 5 दिन)",
    hinglish: "Moderate (30 min walk, 5 din)",
    pa: "ਦਰਮਿਆਨਾ (30 ਮਿੰਟ ਸੈਰ, ਹਫ਼ਤੇ 'ਚ 5 ਵਾਰ)",
    bn: "মাঝারি (৩০ মিনিট দ্রুত হাঁটা, সপ্তাহে ৫ দিন)",
    mr: "मध्यम (३० मिनिटे जलद चालणे, आठवड्यातून ५ वेळा)",
    te: "మధ్యస్థం (30 నిమిషాల వేగవంతమైన నడక, వారానికి 5 సార్లు)",
    ta: "மிதமான (30 நிமிட நடை, வாரத்தில் 5 நாட்கள்)",
    gu: "મધ્યમ (30 મિનિટ ઝડપી ચાલવું, અઠવાડિયામાં 5 વાર)",
    kn: "ಮಧ್ಯಮ (30 ನಿಮಿಷ ನಡಿಗೆ, ವಾರಕ್ಕೆ 5 ಬಾರಿ)"
  },
  "6.5 - 7 hours / night": {
    hi: "6.5 - 7 घंटे प्रति रात",
    hinglish: "6.5 - 7 ghante / raat",
    pa: "6.5 - 7 ਘੰਟੇ / ਰਾਤ",
    bn: "৬.৫ - ৭ ঘণ্টা / রাত",
    mr: "६.৫ - ७ तास / रात्र",
    te: "6.5 - 7 గంటలు / రాత్రి",
    ta: "6.5 - 7 மணிநேரம் / இரவு",
    gu: "6.5 - 7 કલાક / રાત",
    kn: "6.5 - 7 ಗಂಟೆ / ರಾತ್ರಿ"
  },
  "Diabetic-conscious / Low Glycemic Index": {
    hi: "डायबिटीज-अनुकूल / कम ग्लाइसेमिक आहार",
    hinglish: "Diabetic-friendly / Low GI Diet",
    pa: "ਸ਼ੂਗਰ-ਅਨੁਕੂਲ / ਘੱਟ ਗਲਾਈਸੈਮਿਕ ਖੁਰਾਕ",
    bn: "ডায়াবেটিস-বান্ধব / কম গ্লাইসেমিক ডায়েট",
    mr: "मधुमेह-अनुकूल आहार",
    te: "డయాబెటిస్-అనుకూల ఆహారం",
    ta: "நீரிழிவு நட்பு உணவு",
    gu: "ડાયાબિટીસ-અનુકૂળ આહાર",
    kn: "ಮಧುಮೇಹ ಸ್ನೇಹಿ ಆಹಾರ"
  },
  "Spouse": {
    hi: "जीवनसाथी",
    hinglish: "Spouse",
    pa: "ਜੀਵਨ ਸਾਥੀ",
    bn: "স্ত্রী / স্বামী",
    mr: "जोडीदार",
    te: "జీవిత భాగస్వామి",
    ta: "துணைவர்",
    gu: "જીવનસાથી",
    kn: "ಪತ್ನಿ / ಪತಿ"
  },
  "Brother": {
    hi: "भाई",
    hinglish: "Bhai",
    pa: "ਭਰਾ",
    bn: "ভাই",
    mr: "भाऊ",
    te: "సోదరుడు",
    ta: "சகோதரர்",
    gu: "ભાઈ",
    kn: "ಸಹೋದರ"
  },
  "Father": {
    hi: "पिता",
    hinglish: "Father",
    pa: "ਪਿਤਾ",
    bn: "পিতা",
    mr: "वडील",
    te: "తండ్రి",
    ta: "தந்தை",
    gu: "પિતા",
    kn: "ತಂದೆ"
  },
  "Mother": {
    hi: "माता",
    hinglish: "Mother",
    pa: "ਮਾਤਾ",
    bn: "মাতা",
    mr: "आई",
    te: "తల్లి",
    ta: "தாய்",
    gu: "માતા",
    kn: "ತಾಯಿ"
  },
  "Severe Urticaria / Hives": {
    hi: "गंभीर पित्ती / चकत्ते (Urticaria)",
    hinglish: "Severe Urticaria / Hives",
    pa: "ਗੰਭੀਰ ਧੱਫੜ (Urticaria)",
    bn: "তীব্র আমবাত / এলার্জি",
    mr: "तीव्र पित्त / गांधी उठणे",
    te: "తీవ్రమైన దద్దుర్లు",
    ta: "கடுமையான தடிப்புகள்",
    gu: "ગંભીર ચકામા",
    kn: "ತೀವ್ರವಾದ ದದ್ದುಗಳು"
  },
  "Skin Rash & Erythema": {
    hi: "त्वचा पर लाल चकत्ते व जलन",
    hinglish: "Skin Rash & Erythema",
    pa: "ਚਮੜੀ ਦੇ ਲਾਲ ਧੱਫੜ ਤੇ ਜਲਨ",
    bn: "ত্বকে লাল ফুসকুড়ি",
    mr: "त्वचेवर लाल पुरळ",
    te: "చర్మంపై ఎర్రటి దద్దుర్లు",
    ta: "தோல் சிவத்தல் மற்றும் அரிப்பு",
    gu: "ત્વચા પર ફોલ્લીઓ",
    kn: "ಚರ್ಮದ ದದ್ದು"
  },
  "Critical": {
    hi: "गंभीर",
    hinglish: "Critical",
    pa: "ਗੰਭੀਰ",
    bn: "সংকটজনক",
    mr: "गंभीर",
    te: "క్లిష్టమైన",
    ta: "சிக்கலான",
    gu: "ગંભીર",
    kn: "ತೀವ್ರ"
  },
  "Moderate": {
    hi: "मध्यम",
    hinglish: "Moderate",
    pa: "ਦਰਮਿਆਨਾ",
    bn: "মাঝারি",
    mr: "मध्यम",
    te: "మధ్యస్థం",
    ta: "மிதமான",
    gu: "મધ્યમ",
    kn: "ಮಧ್ಯಮ"
  },
  "Consultation": {
    hi: "परामर्श",
    hinglish: "Consultation",
    pa: "ਸਲਾਹ-ਮਸ਼ਵਰਾ",
    bn: "পরামর্শ",
    mr: "सल्ला",
    te: "సంప్రదింపు",
    ta: "ஆலோசனை",
    gu: "સલાહ",
    kn: "ಸಮಾಲೋಚನೆ"
  },
  "Lab Test": {
    hi: "लैब टेस्ट",
    hinglish: "Lab Test",
    pa: "ਲੈਬ ਟੈਸਟ",
    bn: "ল্যাব টেস্ট",
    mr: "लॅब चाचणी",
    te: "ల్యాబ్ పరీక్ష",
    ta: "ஆய்வக சோதனை",
    gu: "લેબ ટેસ્ટ",
    kn: "ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆ"
  },
  "Diagnostic": {
    hi: "जांच / इमेजिंग",
    hinglish: "Diagnostic",
    pa: "ਜਾਂਚ / ਇਮੇਜਿੰਗ",
    bn: "ডায়াগনস্টিক",
    mr: "निदान / तपासणी",
    te: "రోగ నిర్ధారణ",
    ta: "கண்டறிதல்",
    gu: "તપાસ",
    kn: "ರೋಗನಿರ್ಣಯ"
  },
  "Immunization": {
    hi: "टीकाकरण",
    hinglish: "Vaccination",
    pa: "ਟੀਕਾਕਰਨ",
    bn: "টিকাদান",
    mr: "लसीकरण",
    te: "టీకాలు",
    ta: "தடுப்பூசி",
    gu: "રસીકરણ",
    kn: "ಲಸಿಕೆ"
  },
  "Attending Physician": {
    hi: "परामर्श चिकित्सक",
    hinglish: "Attending Doctor",
    pa: "ਸਲਾਹਕਾਰ ਡਾਕਟਰ",
    bn: "উপস্থিত চিকিৎসক",
    mr: "उपस्थित डॉक्टर",
    te: "హాజరైన వైద్యుడు",
    ta: "மருத்துவர்",
    gu: "ડૉક્ટર",
    kn: "ಹಾಜರಾದ ವೈದ್ಯರು"
  },
  "Documented clinical review and observation notes.": {
    hi: "चिकित्सीय समीक्षा एवं अवलोकन विवरण दर्ज किया गया।",
    hinglish: "Clinical review aur observation notes save kiye gaye.",
    pa: "ਡਾਕਟਰੀ ਸਮੀਖਿਆ ਅਤੇ ਨਿਰੀਖਣ ਨੋਟ ਦਰਜ ਕੀਤੇ ਗਏ।",
    bn: "চিকিৎসা পর্যালোচনা এবং পর্যবেক্ষণ নোট নথিভুক্ত করা হয়েছে।",
    mr: "वैद्यकीय पुनरावलोकन आणि निरीक्षण नोंदी जतन केल्या.",
    te: "క్లినికల్ సమీక్ష మరియు పరిశీలన గమనికలు నమోదు చేయబడ్డాయి.",
    ta: "மருத்துவ மதிப்பாய்வு மற்றும் கண்காணிப்பு குறிப்புகள் பதிவு செய்யப்பட்டன.",
    gu: "તબીબી સમીક્ષા અને અવલોકન નોંધો નોંધવામાં આવી.",
    kn: "ವೈದ್ಯಕೀಯ ವಿಮರ್ಶೆ ಮತ್ತು ಅವಲೋಕನ ಟಿಪ್ಪಣಿಗಳನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ."
  },
  "Logged": {
    hi: "दर्ज",
    hinglish: "Logged",
    pa: "ਦਰਜ",
    bn: "নথিভুক্ত",
    mr: "नोंदवले",
    te: "నమోదైంది",
    ta: "பதிவுசெய்யப்பட்டது",
    gu: "નોંધાયેલ",
    kn: "ದಾಖಲಿಸಲಾಗಿದೆ"
  }
};

/**
 * Translates any medical term, condition, allergy, timing, or UI phrase.
 * Supports exact match, case-insensitive match, reverse lookup, and compound phrases (e.g. " • ").
 */
export function translateMedicalTerm(term, lang = "en") {
  if (!term || typeof term !== "string" || !lang || lang === "en") {
    return term;
  }
  const clean = term.trim();
  if (!clean) return term;

  // 1. Direct match in dictionary
  const entry = MEDICAL_DICTIONARY[clean];
  if (entry && entry[lang]) {
    return entry[lang];
  }

  // 2. Case-insensitive lookup
  const lower = clean.toLowerCase();
  for (const [key, val] of Object.entries(MEDICAL_DICTIONARY)) {
    if (key.toLowerCase() === lower && val[lang]) {
      return val[lang];
    }
  }

  // 3. Reverse lookup (if clean matches a Hindi translation in the dictionary)
  for (const val of Object.values(MEDICAL_DICTIONARY)) {
    if (val.hi === clean && val[lang]) {
      return val[lang];
    }
  }

  // 4. Compound phrase splitting: handles "Morning (After breakfast) • Blood Glucose Regulation"
  if (clean.includes(" • ")) {
    return clean
      .split(" • ")
      .map((part) => translateMedicalTerm(part, lang))
      .join(" • ");
  }
  if (clean.includes(" / ")) {
    return clean
      .split(" / ")
      .map((part) => translateMedicalTerm(part, lang))
      .join(" / ");
  }

  // 5. Handling leading icons or bullet prefixes (e.g. "● Type 2 Diabetes", "⚠️ Penicillin")
  const KNOWN_PREFIXES = ["● ", "●", "⚠️ ", "⚠️", "💡 ", "💡", "🚨 ", "🚨", "🟢 ", "🟢", "🩺 ", "🩺", "👨‍⚕️ ", "👨‍⚕️", "💊 ", "💊", "📅 ", "📅", "📈 ", "📈"];
  for (const p of KNOWN_PREFIXES) {
    if (clean.startsWith(p)) {
      const rest = clean.slice(p.length).trim();
      const translatedRest = translateMedicalTerm(rest, lang);
      return p + translatedRest;
    }
  }

  return term;
}

let activeDomObserver = null;
let currentActiveLang = "en";

/**
 * Recursively scans visible text nodes across the entire page
 * and replaces recognized English phrases with the active language translation.
 * Non-destructive and lossless (stores original in memory).
 * Uses a persistent MutationObserver to maintain translation on dynamic React updates.
 */
export function applyDomTranslations(lang = "en") {
  if (typeof document === "undefined" || !document.body) return;
  currentActiveLang = lang;

  // Disconnect any existing observer
  if (activeDomObserver) {
    try {
      activeDomObserver.disconnect();
    } catch {
      // Ignored
    }
    activeDomObserver = null;
  }

  const translateNode = (node) => {
    try {
      const parent = node.parentElement;
      if (
        !parent ||
        parent.tagName === "SCRIPT" ||
        parent.tagName === "STYLE" ||
        parent.tagName === "FONT" ||
        parent.tagName === "INPUT" ||
        parent.tagName === "TEXTAREA" ||
        parent.tagName === "SELECT" ||
        parent.tagName === "OPTION" ||
        parent.isContentEditable ||
        parent.closest(".notranslate") ||
        parent.closest("[translate='no']") ||
        parent.closest("[lang='zxx']")
      ) {
        return;
      }

      const raw = node.nodeValue;
      if (!raw) return;
      const clean = raw.trim();
      if (!clean) return;

      // Cache original in memory once
      if (!node.__pulseOriginal) {
        node.__pulseOriginal = raw;
      }

      const orig = node.__pulseOriginal;
      const cleanOrig = orig.trim();

      if (lang === "en") {
        if (node.nodeValue !== orig) {
          node.nodeValue = orig;
        }
        return;
      }

      // 1. Direct translation
      let translated = translateMedicalTerm(cleanOrig, lang);

      // 2. Phrase matching fallback if direct translation didn't change anything
      if (translated === cleanOrig) {
        for (const [key, val] of Object.entries(MEDICAL_DICTIONARY)) {
          if (val[lang] && val[lang] !== key && cleanOrig.includes(key)) {
            translated = cleanOrig.replaceAll(key, val[lang]);
            break;
          }
        }
      }

      if (translated && translated !== cleanOrig) {
        const finalVal = orig.replace(cleanOrig, translated);
        if (node.nodeValue !== finalVal) {
          node.nodeValue = finalVal;
        }
      }
    } catch {
      // Individual node error safely caught
    }
  };

  // Walk entire DOM
  try {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    let node;
    while ((node = walker.nextNode())) {
      translateNode(node);
    }
  } catch (err) {
    console.warn("[PulseAI] Walker skipped:", err);
  }

  // If not English, attach a MutationObserver to translate any newly added or mutated nodes
  if (lang !== "en" && typeof MutationObserver !== "undefined") {
    let debounceTimer = null;
    activeDomObserver = new MutationObserver((mutations) => {
      if (currentActiveLang === "en") return;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        try {
          if (activeDomObserver) activeDomObserver.disconnect();
          mutations.forEach((mutation) => {
            if (mutation.type === "characterData") {
              translateNode(mutation.target);
            } else if (mutation.addedNodes) {
              mutation.addedNodes.forEach((added) => {
                if (added.nodeType === 3) {
                  translateNode(added);
                } else if (added.nodeType === 1) {
                  const subWalker = document.createTreeWalker(
                    added,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                  );
                  let subNode;
                  while ((subNode = subWalker.nextNode())) {
                    translateNode(subNode);
                  }
                }
              });
            }
          });
        } finally {
          if (activeDomObserver && document.body) {
            activeDomObserver.observe(document.body, {
              childList: true,
              subtree: true,
              characterData: true
            });
          }
        }
      }, 35);
    });

    try {
      activeDomObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    } catch (err) {
      console.warn("[PulseAI] Observer init skipped:", err);
    }
  }
}

/**
 * Safe translation activator - calls applyDomTranslations directly
 */
export function triggerGoogleTranslate(lang = "en") {
  applyDomTranslations(lang);
}


