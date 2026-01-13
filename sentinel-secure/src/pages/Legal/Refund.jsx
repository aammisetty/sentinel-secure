import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Refund = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 prose prose-lg">
    <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block no-underline">Refund Policy</h1>
    <p><strong>7-Day Guarantee:</strong> If you are not satisfied with our dashboard, you may request a refund within 7 days of purchase.</p>
    <p>Contact <code>contact.aa@tuta.io</code> to initiate a return.</p>
    <Link to="/"><Button variant="secondary" className="not-prose mt-8">Back Home</Button></Link>
  </div>
);
export default Refund;