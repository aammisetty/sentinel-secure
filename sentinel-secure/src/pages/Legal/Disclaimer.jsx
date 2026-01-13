import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Disclaimer = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 prose prose-lg">
    <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block no-underline">Disclaimer</h1>
    <p>The information provided by Sentinel Secure ("we," "us," or "our") on this site is for general informational purposes only.</p>
    <p><strong>External Links:</strong> The Site may contain links to other websites. We do not warrant the accuracy of third-party info.</p>
    <Link to="/"><Button variant="secondary" className="not-prose mt-8">Back Home</Button></Link>
  </div>
);
export default Disclaimer;