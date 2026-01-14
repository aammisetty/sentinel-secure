import React from 'react';
import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6 lg:p-12 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-orange-500 text-white p-8 border-2 border-black mb-8">
          <Cookie size={48} className="mb-4" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Cookie Policy</h1>
          <p className="font-mono text-sm font-bold opacity-90">Cookies & Local Storage</p>
        </div>

        <div className="bg-white border-2 border-black p-8 lg:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-black uppercase mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device. Sentinel Secure primarily uses <strong>Local Storage</strong> (a modern alternative to cookies) to keep you logged in and store your preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">2. Technologies We Use</h2>
              <table className="w-full text-left border-2 border-black mt-4">
                <thead className="bg-black text-white uppercase text-sm">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-mono">
                  <tr className="border-b border-gray-300">
                    <td className="p-3">sentinel_token</td>
                    <td className="p-3">Local Storage</td>
                    <td className="p-3">Maintains your active login session.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-3">sentinel_user</td>
                    <td className="p-3">Local Storage</td>
                    <td className="p-3">Stores your email for display.</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-3">sentinel_config</td>
                    <td className="p-3">Local Storage</td>
                    <td className="p-3">Saves your dashboard preferences (Panic Number, Name).</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4">3. Managing Preferences</h2>
              <p>
                Since these data points are "Strictly Essential" for the application to function (i.e., you cannot use the dashboard without logging in), they cannot be disabled within the app. However, you can clear them at any time by:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Clicking "Logout" in the Dashboard.</li>
                <li>Clearing your browser cache/storage settings.</li>
              </ul>
            </section>

        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;