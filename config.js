// ---- Site configuration: edit these values, no other code changes needed ----
export const SITE = {
  company: 'SIMSUN Technologies',
  // Registration requests are emailed here
  notifyEmail: 'mandalasrikanthinfo@gmail.com',
  phone: '+91 00000 00000',          // TODO: your business phone
  city: 'Visakhapatnam, Andhra Pradesh, India', // TODO: your office address
  // How the registration form sends mail:
  //  'formsubmit' -> works on GitHub Pages / Cloudflare Pages with no server (first request sends you an activation email)
  //  'api'        -> posts to the Python backend in /backend (set API_URL)
  formMode: 'formsubmit',
  apiUrl: 'https://api.simsuntech.example/api/register',
}
