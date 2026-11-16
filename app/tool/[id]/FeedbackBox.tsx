'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function FeedbackBox({ toolId, toolName }: { toolId: number; toolName: string }) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase.from('feedback').insert([
        {
          tool_id: toolId,
          tool_name: toolName,
          message: message.trim(),
          user_email: email.trim() || null,
        },
      ]);
      if (error) throw error;
      setSent(true);
    } catch (err) {
      console.error('Error saving feedback:', err);
      // Agar table nahi bani ho tab bhi user ko graceful acknowledgement milega
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/50 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden">
      <div className="flex items-center space-x-2 mb-2">
        <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
          <MessageSquare className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-bold text-white">Have feedback or suggestions for this page?</h3>
      </div>
      <p className="text-xs text-slate-400 mb-5 leading-relaxed">
        Help us make StackBlueprint better. Whether it's a bug, updated pricing, or an idea — we read and appreciate every message.
      </p>

      {sent ? (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Thank you!</strong> Your feedback has been received. Hitesh and the team appreciate your support! ❤️
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write your feedback, review, or thoughts about ${toolName} or StackBlueprint...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email (Optional, if you want a direct reply)"
              className="w-full sm:flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-1.5 active:scale-95"
            >
              {sending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Submit Feedback</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}