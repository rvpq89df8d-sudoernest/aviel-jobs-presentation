export const agents = {
  he: [
    {
      name: 'אברהם',
      role: 'קליטה ראשונית',
      line: 'קליטת מועמדים וייעוץ ראשוני בטלגרם ווואטסאפ.',
      task: 'שיחה פעילה · וואטסאפ',
    },
    {
      name: 'יחזקאל',
      role: 'מנוע החלטות',
      line: 'מנוע קבלת ההחלטות והניתוח המרכזי.',
      task: 'מנתח התאמת סניף',
    },
    {
      name: 'שרה',
      role: 'תפעול גלובלי',
      line: 'ניהול תפעול, אינטגרציות והתאמת סניפים גלובלית.',
      task: 'סנכרון סניף · אירופה',
    },
  ],
  en: [
    {
      name: 'Avraham',
      role: 'Intake',
      line: 'Candidate intake and first-line consulting on Telegram and WhatsApp.',
      task: 'Live chat · WhatsApp',
    },
    {
      name: 'Yehezkel',
      role: 'Decision engine',
      line: 'Central decision-making and analysis engine.',
      task: 'Scoring branch fit',
    },
    {
      name: 'Sarah',
      role: 'Global operations',
      line: 'Operations, integrations, and global branch matching.',
      task: 'Branch sync · Europe',
    },
  ],
} as const

export const safetyControls = {
  he: [
    { name: 'Kill-Switch', detail: 'עצירה מיידית של כל פעולת סוכן, גלובלית או לפי תא.' },
    { name: 'Shadow Mode', detail: 'הסוכנים מציעים; בני אדם מבצעים עד שנבנה אמון.' },
    { name: 'Hallucination Safeguards', detail: 'תשובות רק מתוך מצב שליטת הסניפים החי.' },
    { name: 'Promise Guards', detail: 'אין הבטחות שהמערכת לא יכולה לקיים מול המועמד או המעסיק.' },
    { name: 'Loop Prevention', detail: 'חוסם לולאות פעולה אינסופיות בין סוכנים וכלי מערכת.' },
    { name: 'Human-in-the-Loop', detail: 'מהלכים בלתי הפיכים ממתינים לאישור הבעלים.' },
    { name: 'Action Budgets', detail: 'הגבלת קצב להודעות, פרסומים ושליחת הרשאות.' },
    { name: 'Scope Sandbox', detail: 'סוכן סניף לא רואה את הארון של סניף אחר.' },
    { name: 'Immutable Audit Trail', detail: 'כל קריאת כלי נשמרת עם שחקן, זמן ומטען.' },
    { name: 'Dual-Control', detail: 'ארבע עיניים על רוטציית הרשאות ושדרוג מצב קשר.' },
    { name: 'Prompt Injection Firewall', detail: 'טקסט חיצוני לא יכול לשכתב מדיניות מערכת.' },
    { name: 'PII / DLP', detail: 'תיקי מועמדים נשארים בכספת המעסיק.' },
    { name: 'Model Version Pinning', detail: 'אין החלפת מודל שקטה בתאי ייצור.' },
    { name: 'Geographic Compliance Lock', detail: 'לא מערבבים שפת ישראל ושפת חו״ל באותו מסך.' },
  ],
  en: [
    { name: 'Kill-Switch', detail: 'Instant halt of every agent action, globally or per cell.' },
    { name: 'Shadow Mode', detail: 'Agents propose; humans execute until trust is earned.' },
    { name: 'Hallucination Safeguards', detail: 'Ground answers in live Branch Control state only.' },
    { name: 'Promise Guards', detail: 'The system cannot promise what it cannot deliver.' },
    { name: 'Loop Prevention', detail: 'Blocks infinite action loops between agents and tools.' },
    { name: 'Human-in-the-Loop', detail: 'Irreversible moves wait for owner approval.' },
    { name: 'Action Budgets', detail: 'Rate limits on messages, publishes, and credential sends.' },
    { name: 'Scope Sandbox', detail: 'A branch agent cannot see another branch’s cabinet.' },
    { name: 'Immutable Audit Trail', detail: 'Every tool call is stored with actor, time, and payload.' },
    { name: 'Dual-Control', detail: 'Four-eyes on credential rotation and contact-mode upgrades.' },
    { name: 'Prompt Injection Firewall', detail: 'External text cannot rewrite system policy.' },
    { name: 'PII / DLP', detail: 'Candidate files stay inside the employer vault.' },
    { name: 'Model Version Pinning', detail: 'No silent model swaps in production cells.' },
    { name: 'Geographic Compliance Lock', detail: 'Israel vs abroad language cannot be mixed in one scene.' },
  ],
} as const

export const jobCards = {
  he: [
    { title: 'מנהל/ת סניף', city: 'נתניה', tag: 'ניהול' },
    { title: 'נציג/ת שירות', city: 'תל אביב', tag: 'שירות' },
    { title: 'מחסנאי/ת', city: 'חיפה', tag: 'לוגיסטיקה' },
  ],
  en: [
    { title: 'Branch manager', city: 'Netanya', tag: 'Ops' },
    { title: 'Service associate', city: 'Tel Aviv', tag: 'Service' },
    { title: 'Warehouse associate', city: 'Haifa', tag: 'Logistics' },
  ],
} as const

export const consultRows = {
  he: [
    { cat: 'הפצה, לוגיסטיקה, תחבורה', sub: 'נהג/ת משאית', meta: 'ייעוץ · 12 דק׳ · עברית' },
    { cat: 'מזון ומשקאות', sub: 'מנהל/ת משמרת', meta: 'ייעוץ · 08 דק׳ · עברית' },
    { cat: 'תחזוקה', sub: 'מחסנאי/ת', meta: 'ייעוץ · 10 דק׳ · עברית' },
    { cat: 'שירות לקוחות', sub: 'נציג/ת מוקד', meta: 'ייעוץ · 09 דק׳ · עברית' },
  ],
  en: [
    { cat: 'Distribution, logistics, transport', sub: 'Fleet coordinator', meta: 'Consulting · 12 min' },
    { cat: 'Food and beverage', sub: 'Shift lead', meta: 'Consulting · 08 min' },
    { cat: 'Facilities', sub: 'Floor coordinator', meta: 'Consulting · 10 min' },
    { cat: 'Customer care', sub: 'Service desk', meta: 'Consulting · 09 min' },
  ],
} as const

export const chatScript = {
  he: [
    { from: 'ai' as const, text: 'שלום! כאן אברהם מאביאל ג׳ובס. קליטת המועמדות התקבלה. בודק התאמת סניף.' },
    { from: 'user' as const, text: 'מעולה. אפשר לקבל פרטים על המשמרות בסניף?' },
    { from: 'ai' as const, text: 'סנכרנתי את התיק למחסן החכם. הסניף רואה את המועמדות עכשיו.' },
  ],
  en: [
    { from: 'ai' as const, text: 'Hello, this is Avraham from TTNT. The application is in. Checking branch fit.' },
    { from: 'user' as const, text: 'Great. Can I get shift details for the branch?' },
    { from: 'ai' as const, text: 'I synced the file into the Smart Warehouse. The branch can see the candidacy now.' },
  ],
} as const
