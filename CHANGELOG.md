# Changelog

All notable changes to **Sentinel Secure** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **IP Lookup Tool:** Added `src/pages/Tools/IpLookup.jsx` using `ipapi.co`.
- **Phishing Detector:** Added Regex-based heuristic scanner for URLs.
- **Verification Flow:** Added 2-step OTP simulation in `Signup.jsx`.

## [2.1.0] - 2026-01-14

### Added
- **Magic Byte Analysis:** Dashboard now reads the first 4 bytes of files to detect Extension Spoofing (e.g., EXE disguised as PDF).
- **Battery Monitor:** Dashboard header now shows live battery percentage and charging status.
- **Network Status:** Live Online/Offline indicator.

### Changed
- **Hashing Algorithm:** Migrated from basic checksums to `crypto.subtle.digest('SHA-256')` for robust file verification.
- **Navigation:** Replaced flat menu with Dropdown structure in Header for better UX.

## [1.0.0] - 2026-01-10

### Initial Release
- **Shannon Entropy Engine:** Client-side ransomware detection logic.
- **Neo-Brutalist Design:** Tailwind CSS implementation.
- **Panic Button:** WhatsApp API integration.