import emailjs from '@emailjs/browser';

// 1. CONFIGURATION
const EMAILJS_SERVICE_ID = "service_c2balt9"; 
const EMAILJS_TEMPLATE_ID = "template_zy0w4s9"; 
const EMAILJS_PUBLIC_KEY = "wVo4ohloUasTxQp4m";

// 2. CRYPTO OTP
export const generateOTP = () => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return (array[0] % 900000 + 100000).toString();
};

// 3. SEND REAL EMAIL (DEBUG MODE)
export const sendOTPEmail = async (email, otpCode, type = "Verification") => {
  try {
    const expiryDate = new Date(Date.now() + 15 * 60000);
    const timeString = expiryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log(`[EmailJS] Attempting to send to: ${email} with code: ${otpCode}`);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: email,                  
        passcode: otpCode,                
        time: timeString,                 
        company_name: "Sentinel Secure",  
        subject: `${type} Code: ${otpCode}`, 
      },
      EMAILJS_PUBLIC_KEY
    );
    
    console.log("[EmailJS] Success!", response.status, response.text);
    return { success: true, response };

  } catch (error) {
    // 🛑 DEBUG ALERT: This will tell you the EXACT error on screen
    alert(`EMAIL FAILED: ${JSON.stringify(error)}`);
    console.error("EmailJS Failed:", error);
    return { success: false, error };
  }
};

// 4. DATABASE SIMULATION
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