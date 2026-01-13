/**
 * REAL LOGIC UTILITIES
 * - Shannon Entropy (Ransomware Detection)
 * - AES-GCM Encryption (Secure Notes)
 * - CSPRNG (Password Generation)
 */

// --- 1. File Forensics ---
export const calculateEntropy = (text) => {
  const len = text.length;
  if (len === 0) return 0;
  const frequencies = Array.from(text).reduce((freq, char) => {
    freq[char] = (freq[char] || 0) + 1;
    return freq;
  }, {});
  return Object.values(frequencies).reduce((sum, f) => {
    const p = f / len;
    return sum - p * Math.log2(p);
  }, 0);
};

export const analyzeFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Read error"));
    reader.onload = (e) => {
      const content = e.target.result;
      const entropy = calculateEntropy(content);
      let status = 'SAFE';
      let riskLevel = 'LOW';
      if (entropy > 7.5) { status = 'LIKELY ENCRYPTED'; riskLevel = 'CRITICAL'; } 
      else if (entropy > 6.0) { status = 'COMPRESSED/BINARY'; riskLevel = 'MEDIUM'; } 
      else { status = 'PLAINTEXT/READABLE'; riskLevel = 'LOW'; }
      resolve({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        entropy: entropy.toFixed(4),
        status,
        riskLevel,
        timestamp: new Date().toLocaleTimeString()
      });
    };
    reader.readAsBinaryString(file);
  });
};

// --- 2. Secure Password Generator (CSPRNG) ---
export const generateSecurePassword = (length = 16, useSym = true, useNum = true) => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let charset = letters;
  if (useNum) charset += numbers;
  if (useSym) charset += symbols;

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[array[i] % charset.length];
  }
  return result;
};

// --- 3. Browser Fingerprinting (Real Data) ---
export const getBrowserFingerprint = () => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cores: navigator.hardwareConcurrency || 'Unknown',
    memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown',
    cookiesEnabled: navigator.cookieEnabled,
    screenRes: `${window.screen.width}x${window.screen.height}`,
    connection: navigator.connection ? navigator.connection.effectiveType : 'Unknown'
  };
};

// --- 4. Network Latency Test ---
export const checkNetworkSpeed = async () => {
  const start = performance.now();
  try {
    // Fetch a tiny header from a reliable CDN (Google Fonts) to test latency
    await fetch('https://fonts.googleapis.com/css?family=Roboto');
    const end = performance.now();
    return (end - start).toFixed(2); // Latency in ms
  } catch (e) {
    return 'Error';
  }
};