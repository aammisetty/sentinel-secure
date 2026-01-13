import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Settings as Gear, Save, Bell, Smartphone, User } from 'lucide-react';

const Settings = () => {
  const [config, setConfig] = useState({
    panicNumber: '918329004424',
    userName: 'Admin',
    autoScan: true,
    theme: 'light'
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('sentinel_config');
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  const handleSave = () => {
    localStorage.setItem('sentinel_config', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pt-28 min-h-screen max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
        <Gear size={40} /> Global Configuration
      </h1>

      <div className="space-y-8">
          
          {/* Section 1 */}
          <div className="bg-white border-2 border-black p-6 neo-shadow">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Smartphone size={20}/> Panic Button Setup</h3>
              <label className="block text-sm font-bold uppercase mb-2">Emergency WhatsApp Number</label>
              <input 
                value={config.panicNumber}
                onChange={e => setConfig({...config, panicNumber: e.target.value})}
                className="w-full p-3 border-2 border-black font-mono"
              />
              <p className="text-xs text-gray-500 mt-2">Format: CountryCode + Number (e.g. 919999999999)</p>
          </div>

          {/* Section 2 */}
          <div className="bg-white border-2 border-black p-6 neo-shadow">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2"><User size={20}/> Profile</h3>
              <label className="block text-sm font-bold uppercase mb-2">Dashboard Display Name</label>
              <input 
                value={config.userName}
                onChange={e => setConfig({...config, userName: e.target.value})}
                className="w-full p-3 border-2 border-black"
              />
          </div>

          {/* Section 3 */}
          <div className="bg-white border-2 border-black p-6 neo-shadow">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2"><Bell size={20}/> Preferences</h3>
              <label className="flex items-center gap-4 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={config.autoScan}
                    onChange={e => setConfig({...config, autoScan: e.target.checked})}
                    className="w-6 h-6 border-2 border-black accent-black"
                  />
                  <span className="font-bold">Enable Passive Entropy Monitoring</span>
              </label>
          </div>

          <Button onClick={handleSave} className="w-full py-4 text-xl bg-green-500 hover:bg-green-600 border-black text-white">
              {saved ? 'SETTINGS SAVED!' : 'SAVE CONFIGURATION'}
          </Button>
      </div>
    </div>
  );
};
export default Settings;