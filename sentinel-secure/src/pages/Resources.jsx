import React from 'react';
import { Download } from 'lucide-react';

const Resources = () => (
  <div className="pt-28 min-h-screen max-w-4xl mx-auto p-8">
    <h1 className="text-5xl font-black uppercase mb-8">Whitepapers</h1>
    <div className="space-y-4">
        {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-6 border-2 border-black hover:bg-gray-50 cursor-pointer">
                <div>
                    <h3 className="font-bold text-lg">The State of Indian Cybersecurity 2026 - Vol {i}</h3>
                    <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                </div>
                <div className="bg-black text-white p-2 rounded-full"><Download size={20}/></div>
            </div>
        ))}
    </div>
  </div>
);
export default Resources;