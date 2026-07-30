import React, { useState } from 'react';
import { Bot, Send, HeartPulse, Flame, Zap, ShieldAlert, Sparkles } from 'lucide-react';

const AIFirstAidChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your AI First Aid Assistant. In case of an emergency, call 911 or hit SOS immediately. What first-aid emergency guidance do you need?"
    }
  ]);
  const [input, setInput] = useState('');

  const firstAidGuides = {
    cpr: "CPR Protocol: 1. Place hands in center of chest. 2. Push hard and fast (100-120 bpm, to the beat of 'Staying Alive'). 3. Give 30 compressions followed by 2 rescue breaths.",
    burns: "Burn Care: 1. Cool the burn under cold running water for 10-20 minutes. 2. Remove tight clothing/rings. 3. Cover loosely with clean plastic wrap or non-stick bandage. Do NOT apply ice or butter.",
    stroke: "Stroke FAST Check: F - Face drooping, A - Arm weakness, S - Speech difficulty, T - Time to call 911 immediately!"
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const prompt = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let reply = "For any severe medical symptom, please activate the SOS button. Always ensure the patient is breathing and in a safe environment.";

      if (prompt.includes('cpr') || prompt.includes('heart') || prompt.includes('cardiac')) {
        reply = firstAidGuides.cpr;
      } else if (prompt.includes('burn') || prompt.includes('fire')) {
        reply = firstAidGuides.burns;
      } else if (prompt.includes('stroke') || prompt.includes('face') || prompt.includes('speech')) {
        reply = firstAidGuides.stroke;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            AI Emergency Triage & First Aid Assistant <Sparkles className="w-4 h-4 text-emerald-400" />
          </h1>
          <p className="text-xs text-gray-400">Instant instructions for CPR, choking, burns, cardiac arrest, and bleeding</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-gray-800 h-[500px] flex flex-col justify-between overflow-hidden">
        {/* Messages feed */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-gray-800/90 text-gray-200 border border-gray-700/80 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-800 bg-[#090d16] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about CPR, burn treatment, stroke symptoms..."
            className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIFirstAidChat;
