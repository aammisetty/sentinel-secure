import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Terms = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
    <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block">Terms of Service</h1>
    <div className="prose prose-lg text-gray-800">
      <h3>1. Disclaimer</h3>
      <p>This software is a monitoring aid, not a guarantee of immunity against cyber attacks. Arun Ammisetty and Sentinel Secure are not liable for data loss incurred while using this tool.</p>
      <h3>2. Subscription</h3>
      <p>Services are billed monthly. Cancellation requires 14 days written notice.</p>
    </div>
    <Link to="/">
      <Button variant="secondary" className="mt-12">Return Home</Button>
    </Link>
  </div>
);

export default Terms;