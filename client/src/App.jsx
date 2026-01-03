import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { fetchContacts } from './api';
import { FaAddressBook } from 'react-icons/fa';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);

  // Fetch count when list refreshes
  useEffect(() => {
    const getCount = async () => {
      try {
        const { data } = await fetchContacts();
        setTotalContacts(data.length);
      } catch (error) {
        console.error("Failed to fetch count");
      }
    };
    getCount();
  }, [refresh]);

  const handleContactAdded = () => {
    setRefresh(prev => !prev);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F2F5F9] font-sans text-slate-800">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* Top Navigation / Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 text-slate-600">
            <span className="font-semibold text-lg flex items-center gap-2">
              <FaAddressBook className="text-blue-500" />
              Contact Manager
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Dashboard Stats & Form */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Welcome</h1>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">My Address Book</h2>
              <p className="text-slate-400 font-medium">{currentDate}</p>
            </div>

            {/* Stats Card */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm flex flex-col justify-between h-40 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="z-10">
                <h3 className="font-bold text-slate-700">Total Contacts</h3>
                <p className="text-slate-400 text-sm mt-1">{totalContacts} Saved</p>
              </div>
              <div className="z-10">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <FaAddressBook />
                </div>
              </div>
              {/* Decorative background blob */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 z-0"></div>
            </div>

            {/* Form Section */}
            <div className="mt-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Add New Contact</h3>
              <ContactForm onContactAdded={handleContactAdded} />
            </div>
          </div>

          {/* Right Panel: Contact List */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-sm min-h-[600px]">
            <ContactList refreshTrigger={refresh} setTotalCount={setTotalContacts} />
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
