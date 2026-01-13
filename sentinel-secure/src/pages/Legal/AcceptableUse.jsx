import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const AcceptableUse = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8 prose prose-lg">
    <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block no-underline">Acceptable Use</h1>
    <p>You agree not to use the Services to:</p>
    <ul>
        <li>Violate any laws in India.</li>
        <li>Distribute malware or viruses.</li>
        <li>Attempt to reverse engineer the Sentinel dashboard.</li>
    </ul>
    <Link to="/"><Button variant="secondary" className="not-prose mt-8">Back Home</Button></Link>
  </div>
);
export default AcceptableUse;