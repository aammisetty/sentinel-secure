import emailjs from '@emailjs/browser';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const EMAILJS_SERVICE_ID = "service_c2balt9"; 
const EMAILJS_TEMPLATE_ID = "template_zy0w4s9"; 
const EMAILJS_PUBLIC_KEY = "wVo4ohloUasTxQp4m";

// ==========================================
// 2. CRYPTO-SECURE OTP GENERATOR
// ==========================================
export const generateOTP = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return (array[0] % 900000 + 100000).toString();
};

// ==========================================
// 3. SEND REAL EMAIL VIA EMAILJS
// ==========================================
export const sendOTPEmail = async (email, otpCode, type = "Verification") => {
  try {
    const expiryDate = new Date(Date.now() + 15 * 60000);
    const timeString = expiryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log(`[EmailJS] Sending to: ${email}`);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: email,                  
        passcode: otpCode,                
        time: timeString,                 
        company_name: "Sentinel Secure",  
        // UPDATED SUBJECT LINE HERE:
        subject: "OTP for your Sentinel Secure authentication", 
      },
      EMAILJS_PUBLIC_KEY
    );
    
    return { success: true, response };

  } catch (error) {
    console.error("EmailJS Error:", error);
    // Helpful debug alert for development
    alert(`EMAIL FAILED: ${JSON.stringify(error)}`); 
    return { success: false, error };
  }
};

// ==========================================
// 4. DATABASE SIMULATION (LocalStorage)
// ==========================================
export const db = {
  saveUser: (user) => {
    try {
      const dbData = JSON.parse(localStorage.getItem('sentinel_users_db') || '{}');
      if (dbData[user.email]) return { success: false, msg: 'User already exists' };
      dbData[user.email] = user;
      localStorage.setItem('sentinel_users_db', JSON.stringify(dbData));
      return { success: true };
    } catch (e) { return { success: false, msg: 'Database Error' }; }
  },

  getUser: (email) => {
    const dbData = JSON.parse(localStorage.getItem('sentinel_users_db') || '{}');
    return dbData[email] || null;
  },

  verifyCredentials: (email, password) => {
    const user = db.getUser(email);
    if (!user) return { success: false, msg: 'User not found. Please Sign Up.' };
    if (user.password !== password) return { success: false, msg: 'Invalid password.' };
    return { success: true, user };
  }
};