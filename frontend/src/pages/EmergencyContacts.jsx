import React, { useEffect, useState } from 'react';
import { PhoneCall, Plus, Trash2, UserCheck, Shield } from 'lucide-react';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'John Doe', phone: '+1 555-0193', relation: 'Spouse', isPrimary: true },
    { id: '2', name: 'Dr. Robert Vance', phone: '+1 555-0144', relation: 'Physician', isPrimary: false }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Family');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    setContacts([
      ...contacts,
      { id: Date.now().toString(), name: newName, phone: newPhone, relation: newRelation, isPrimary: false }
    ]);
    setNewName('');
    setNewPhone('');
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
          Personal Emergency Contacts
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Contacts configured here will automatically receive SMS alerts whenever your One-Tap SOS is activated.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <form onSubmit={handleAdd} className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-red-400" /> Add Emergency Contact
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase">Contact Name</label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Mary Smith"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase">Phone Number</label>
            <input
              type="tel"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+1 555-0188"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase">Relationship</label>
            <select
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
            >
              <option value="Family">Family / Parent</option>
              <option value="Spouse">Spouse / Partner</option>
              <option value="Friend">Friend / Neighbor</option>
              <option value="Physician">Personal Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider transition"
          >
            SAVE CONTACT
          </button>
        </form>

        {/* Contact List */}
        <div className="space-y-3">
          <h3 className="text-base font-bold font-heading text-white">Active Contact List</h3>
          {contacts.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  {c.name} {c.isPrimary && <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px]">Primary</span>}
                </p>
                <p className="text-gray-400 text-[11px]">{c.phone} • ({c.relation})</p>
              </div>

              <button
                onClick={() => handleDelete(c.id)}
                className="p-2 text-gray-400 hover:text-red-400 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
