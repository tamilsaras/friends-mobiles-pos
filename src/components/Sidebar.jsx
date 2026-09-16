import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, User, Settings } from 'lucide-react';
import useStore from '../store/useStore';

const Sidebar = ({ currentModule, setCurrentModule }) => {
  const { auth, logout } = useAuth();
  const { shopDetails } = useStore();
  const [isOpen, setIsOpen] = useState(true);

  const modules = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Stock', icon: '📦' },
    { name: 'Billing', icon: '🧾' },
    { name: 'Purchase History', icon: '📜' },
    { name: 'Recharge', icon: '📱' },
    { name: 'Money Transfer', icon: '💸' },
    { name: 'Second Hand', icon: '🔄' },
    { name: 'Other Income', icon: '💰' },
    { name: 'Service', icon: '🔧' },
    { name: 'Customers', icon: '👥' },
    { name: 'Supplier Due', icon: '📋' },
    { name: 'Customer Due', icon: '💳' },
    { name: 'Creditors', icon: '🏦' },
    { name: 'Profit/Loss', icon: '📈' },
    { name: 'Expenses', icon: '💸' },
    { name: 'Savings', icon: '🏪' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const filteredModules = modules.filter((mod) => {
    if (auth.role === 'owner') return true;
    const staffModules = ['Dashboard', 'Stock', 'Billing', 'Recharge', 'Money Transfer', 'Second Hand', 'Other Income', 'Service', 'Customers'];
    return staffModules.includes(mod.name);
  });

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transition-all duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-40 lg:z-auto flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-slate-900">
              FM
            </div>
            <div>
              <h1 className="font-bold text-sm">Friends Mobiles</h1>
              <p className="text-xs text-slate-400">{shopDetails.centerId}</p>
            </div>
          </div>
          <div className="bg-slate-700 rounded-lg p-2 text-xs">
            <p className="text-slate-300">Balance: ₹{shopDetails.centerBalance?.toLocaleString()}</p>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <User size={16} className="text-emerald-400" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{auth.name}</p>
              <p className="text-xs text-slate-400 capitalize">{auth.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {filteredModules.map((module) => (
            <button
              key={module.name}
              onClick={() => {
                setCurrentModule(module.name);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm font-medium ${
                currentModule === module.name
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <span className="text-lg">{module.icon}</span>
              {module.name}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 p-4 space-y-2">
          <button
            onClick={() => setCurrentModule('Settings')}
            className="w-full text-left px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700/50 transition flex items-center gap-3 text-sm"
          >
            <Settings size={16} />
            Settings
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition flex items-center gap-3 text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
