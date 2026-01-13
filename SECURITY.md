# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| 1.x     | :x:                |

## Reporting a Vulnerability

**Sentinel Secure** takes the security of our software and our users seriously. If you believe you have found a security vulnerability in this dashboard, please report it to us as described below.

### **DO NOT report security vulnerabilities through public GitHub issues.**

Please report sensitive security issues via email:

* **Email:** `contact.aa@tuta.io`
* **Subject:** `[VULN] Sentinel Secure - <Short Description>`

### Response Timeline
1.  **Acknowledgement:** We will acknowledge receipt of your report within 24 hours.
2.  **Assessment:** We will confirm the vulnerability and determine its severity within 48 hours.
3.  **Fix:** We aim to release a patch for critical vulnerabilities within 5 business days.

### Scope
* **In Scope:**
    * Client-side entropy calculation flaws.
    * Failures in the SHA-256 hashing implementation.
    * Exposure of sensitive data via the "Panic Button" API calls.
    * Cross-Site Scripting (XSS) in the Dashboard.
* **Out of Scope:**
    * Attacks requiring physical access to the user's device (Localhost attacks).
    * Social engineering attacks against the support team.

Thank you for helping keep Sentinel Secure safe for everyone.