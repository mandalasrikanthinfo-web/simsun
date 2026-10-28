export const NAV = [
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'process', label: 'How we work' },
  { id: 'stack', label: 'Technology' },
  { id: 'contact', label: 'Contact' },
]

export const SERVICES = [
  { icon: 'code', title: 'Software Development', text: 'Custom web platforms, ERP modules and line-of-business software built around how your team already works.', tags: ['React', 'Python', 'ASP.NET Core'] },
  { icon: 'cloud', title: 'Cloud Solutions', text: 'Migration, hosting, backups and cost-controlled infrastructure on AWS, Azure and Cloudflare.', tags: ['AWS', 'Azure', 'DevOps'] },
  { icon: 'ai', title: 'AI & Data Solutions', text: 'Dashboards, reports, chatbots and automation that turn the data you already collect into decisions.', tags: ['Power BI', 'LLMs', 'SQL'] },
  { icon: 'devices', title: 'Web & Mobile Apps', text: 'Fast websites, portals and Android / iOS apps with clean design and secure payments.', tags: ['Flutter', 'PWA', 'UPI'] },
  { icon: 'megaphone', title: 'Digital Marketing', text: 'SEO, Google & Meta ads, social media and landing pages that bring measurable enquiries.', tags: ['SEO', 'Ads', 'Analytics'] },
  { icon: 'cap', title: 'Training & Consultancy', text: 'Technology consulting for leadership and hands-on training programs for students and teams.', tags: ['Workshops', 'Audits', 'Roadmaps'] },
]

export const INDUSTRIES = [
  {
    key: 'business', icon: 'building', name: 'Business & Enterprises', short: 'ERP · CRM · HRMS · Payroll',
    lead: 'One connected system for sales, people and money.',
    points: ['ERP with finance, inventory and purchase', 'CRM with lead pipeline and follow-ups', 'HRMS with attendance, leave and appraisals', 'Payroll with PF, ESI, TDS and payslips'],
    mock: { title: 'Payroll · October', kpis: [['Employees', '248'], ['Net pay', '₹ 1.42 Cr'], ['Pending', '3']], bars: [62, 74, 70, 81, 77, 88], rows: [['Leave approvals', '12 waiting', 'warn'], ['Payslips generated', '245 / 248', 'ok'], ['TDS challan', 'Due 7 Nov', 'info']] },
  },
  {
    key: 'education', icon: 'cap', name: 'Schools & Colleges', short: 'Admissions · Exams · Academic ERP',
    lead: 'From the first enquiry to the final grade card.',
    points: ['Online admissions with fee payment', 'Student information and attendance', 'Exam timetables, hall tickets and results', 'Parent & student mobile portal'],
    mock: { title: 'Semester exams · Timetable', kpis: [['Students', '12,480'], ['Exams', '386'], ['Clashes', '0']], bars: [40, 55, 72, 90, 84, 66], rows: [['Hall tickets', 'Published', 'ok'], ['Room allocation', '94 halls', 'info'], ['Results upload', '2 departments left', 'warn']] },
  },
  {
    key: 'health', icon: 'heart', name: 'Hospitals & Healthcare', short: 'HMS · Appointments · Billing',
    lead: 'Shorter queues at the front desk, cleaner records behind it.',
    points: ['Hospital management with OPD / IPD', 'Online appointments and reminders', 'Billing, insurance and pharmacy', 'Secure patient portal and reports'],
    mock: { title: 'OPD · Today', kpis: [['Appointments', '164'], ['Avg wait', '11 min'], ['Beds free', '18']], bars: [30, 58, 86, 92, 64, 40], rows: [['Dr. Rao · Cardiology', '14 in queue', 'warn'], ['Lab reports', '52 ready', 'ok'], ['Insurance claims', '6 to submit', 'info']] },
  },
  {
    key: 'retail', icon: 'cart', name: 'Retail & E-Commerce', short: 'POS · Inventory · Online store',
    lead: 'Counter, warehouse and website, all on the same stock.',
    points: ['Billing / POS with barcode and GST', 'Inventory across stores and godowns', 'Online store with your own brand', 'UPI, cards and payment gateway integration'],
    mock: { title: 'Store · Live sales', kpis: [['Orders', '1,032'], ['Revenue', '₹ 6.8 L'], ['Low stock', '9']], bars: [48, 52, 61, 70, 95, 88], rows: [['UPI payments', '71% of bills', 'ok'], ['Reorder: Basmati 5kg', '4 left', 'warn'], ['Online orders', '38 to pack', 'info']] },
  },
  {
    key: 'startup', icon: 'rocket', name: 'Startups & Entrepreneurs', short: 'Websites · Apps · SaaS · MVP',
    lead: 'Go from idea to paying users without hiring a full tech team.',
    points: ['Brand website and landing pages', 'Android and iOS mobile applications', 'SaaS products with subscriptions', 'MVP in weeks, then scale with you'],
    mock: { title: 'MVP · Launch board', kpis: [['Sprint', '4 / 6'], ['Signups', '2,310'], ['Uptime', '99.9%']], bars: [12, 24, 38, 55, 73, 96], rows: [['Payments module', 'Shipped', 'ok'], ['App Store review', 'In progress', 'info'], ['Onboarding emails', 'Testing', 'warn']] },
  },
  {
    key: 'consulting', icon: 'compass', name: 'IT Consulting & Training', short: 'Consulting · Training · Marketing',
    lead: 'Advice, skills and reach for teams that want to grow.',
    points: ['Technology consulting and IT audits', 'Corporate and campus training programs', 'Digital marketing and SEO campaigns', 'Ongoing support and managed services'],
    mock: { title: 'Campaign · Enquiries', kpis: [['Leads', '486'], ['Cost / lead', '₹ 92'], ['Batches', '7']], bars: [35, 42, 50, 63, 71, 82], rows: [['Full-stack batch', '28 enrolled', 'ok'], ['Google Ads', 'CTR 6.1%', 'info'], ['Audit report', 'Due Friday', 'warn']] },
  },
]

export const PROCESS = [
  { title: 'Discover', text: 'A free call to understand your goals, users and budget. You get a written scope and quote.' },
  { title: 'Design', text: 'Clickable screens in your brand colours, approved by you before any code is written.' },
  { title: 'Build', text: 'Short sprints with a working demo every week, so you see progress, not promises.' },
  { title: 'Launch', text: 'Testing, data migration, hosting and staff training, then go-live with us on call.' },
  { title: 'Grow', text: 'Support, updates, marketing and new features as your business changes.' },
]

export const STACK = [
  { group: 'Frontend', items: ['React', 'Angular', 'Next.js', 'TypeScript', 'Tailwind'] },
  { group: 'Backend', items: ['Python · FastAPI', 'Django', 'ASP.NET Core', 'Node.js', 'REST & GraphQL'] },
  { group: 'Data', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Power BI'] },
  { group: 'Cloud & Mobile', items: ['AWS', 'Azure', 'Cloudflare', 'Docker', 'Flutter'] },
]

export const PROMISES = [
  { big: '1 day', text: 'Reply to every enquiry within one business day' },
  { big: 'Weekly', text: 'Live demos during development' },
  { big: '100%', text: 'Source code and data ownership stays with you' },
  { big: '3 mo', text: 'Free support after go-live' },
]
