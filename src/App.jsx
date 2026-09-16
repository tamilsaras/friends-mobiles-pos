import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Stock from './pages/Stock';
import Billing from './pages/Billing';
import PurchaseHistory from './pages/PurchaseHistory';
import Recharge from './pages/Recharge';
import MoneyTransfer from './pages/MoneyTransfer';
import SecondHandPhones from './pages/SecondHandPhones';
import OtherIncome from './pages/OtherIncome';
import Service from './pages/Service';
import CustomerDatabase from './pages/CustomerDatabase';
import SupplierDue from './pages/SupplierDue';
import CustomerDue from './pages/CustomerDue';
import Creditors from './pages/Creditors';
import ProfitLoss from './pages/ProfitLoss';
import Expenses from './pages/Expenses';
import Savings from './pages/Savings';
import Settings from './pages/Settings';

const AppContent = () => {
  const { auth } = useAuth();
  const [currentModule, setCurrentModule] = useState('Dashboard');

  if (!auth) {
    return <LoginPage />;
  }

  const renderModule = () => {
    switch (currentModule) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Stock':
        return <Stock />;
      case 'Billing':
        return <Billing />;
      case 'Purchase History':
        return <PurchaseHistory />;
      case 'Recharge':
        return <Recharge />;
      case 'Money Transfer':
        return <MoneyTransfer />;
      case 'Second Hand':
        return <SecondHandPhones />;
      case 'Other Income':
        return <OtherIncome />;
      case 'Service':
        return <Service />;
      case 'Customers':
        return <CustomerDatabase />;
      case 'Supplier Due':
        return <SupplierDue />;
      case 'Customer Due':
        return <CustomerDue />;
      case 'Creditors':
        return <Creditors />;
      case 'Profit/Loss':
        return <ProfitLoss />;
      case 'Expenses':
        return <Expenses />;
      case 'Savings':
        return <Savings />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar currentModule={currentModule} setCurrentModule={setCurrentModule} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
