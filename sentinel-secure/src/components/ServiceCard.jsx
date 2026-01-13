import React from 'react';

const ServiceCard = ({ icon: Icon, title, desc, price }) => (
  <div className="group p-8 border-b-2 border-black md:border-r-2 hover:bg-blue-50 transition-colors bg-white h-full flex flex-col">
    <div className="mb-4 text-black group-hover:text-blue-600 transition-colors">
      <Icon size={40} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-black uppercase mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow">{desc}</p>
    {price && (
      <div className="pt-4 border-t-2 border-dashed border-gray-300">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Starting at</span>
        <p className="text-lg font-black">{price}</p>
      </div>
    )}
  </div>
);

export default ServiceCard;