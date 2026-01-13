import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Privacy = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
    <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block">Privacy Policy</h1>
    <div className="prose prose-lg text-gray-800">
      <p><strong>Last Updated:</strong> January 2026</p>
      <h3>1. Client-Side Processing</h3>
      <p>The "Sentinel Secure" dashboard utilizes browser-based APIs (FileReader) to analyze files locally on your machine. At no point are your files uploaded to our servers, Vercel, or any third party.</p>
      <h3>2. Data Collection</h3>
      <p>We collect contact information (Name, Email, Phone) only when you voluntarily submit an inquiry via our contact forms. This data is transmitted securely via WhatsApp API.</p>
    </div>
    <Link to="/">
      <Button variant="secondary" className="mt-12">Return Home</Button>
    </Link>
  </div>
);

export default Privacy;