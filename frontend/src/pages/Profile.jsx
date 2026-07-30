import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, HeartPulse, Shield, Save, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    bloodGroup: user?.bloodGroup || 'O+',
    medicalNotes: user?.medicalNotes || ''
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.updateProfile(formData);
      if (res.success) {
        updateUser(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.warn('[Profile update error]', err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xl">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Emergency Medical Profile</h1>
          <p className="text-xs text-gray-400">Information here is shared with emergency paramedics upon SOS dispatch</p>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Medical Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase">Blood Group</label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
            >
              {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase">Account Role</label>
            <input
              type="text"
              disabled
              value={user?.role || 'Citizen'}
              className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-300 uppercase">Critical Medical History / Allergies</label>
          <textarea
            rows="3"
            value={formData.medicalNotes}
            onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
            placeholder="e.g. Asthma, Penicillin Allergy, Diabetic Type 2..."
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="py-2.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> SAVE PROFILE DETAILS
        </button>
      </form>
    </div>
  );
};

export default Profile;
