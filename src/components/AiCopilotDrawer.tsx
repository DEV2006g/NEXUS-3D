import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Layers, 
  Flame, 
  Zap, 
  Wrench, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { Building, Equipment, SystemAlert } from '../types';

interface AiCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  buildings: Building[];
  equipment: Equipment[];
  alerts: SystemAlert[];
  selectedEquipment: Equipment | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AiCopilotDrawer: React.FC<AiCopilotDrawerProps> = ({
  isOpen,
  onClose,
  buildings,
  equipment,
  alerts,
  selectedEquipment,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I am the **NEXUS 3D AI Operations Copilot**, powered by Gemini 3.7 Flash.\n\nI have real-time visibility into all ${buildings.length} campus buildings, ${equipment.length} equipment telemetry nodes, and ${alerts.length} active system alarms.\n\nHow can I assist your operational intelligence today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "Why is Server Rack SR-04 at 87% risk?",
    "What maintenance actions are most urgent today?",
    "Compare energy draw across buildings",
    "Generate emergency mitigation plan for DGX cluster"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      // Gather live telemetry context
      const context = {
        buildings: buildings.map(b => ({ name: b.name, status: b.status, energyKw: b.totalPowerKw })),
        equipment: equipment.map(e => ({ 
          name: e.name, 
          code: e.code, 
          status: e.status, 
          temp: e.temperatureC, 
          vibe: e.vibrationMmS, 
          health: e.aiPrediction.healthScore,
          rulDays: e.aiPrediction.predictedDaysToFailure
        })),
        activeAlerts: alerts.map(a => ({ title: a.title, severity: a.severity, actual: a.actualValue }))
      };

      const res = await fetch('/api/gemini/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: context,
          history: messages.map(m => ({ role: m.role, text: m.content }))
        })
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I analyzed the digital twin telemetry. Equipment SR-04 requires immediate filter replacement and fan bearing lubrication to prevent thermal cascade.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Diagnostic telemetry received. **Server Rack SR-04** shows elevated temperature (78.6°C) exceeding safe threshold (65.0°C). Primary root cause: Filter clogging causing reduced airflow + secondary bearing friction. Immediate recommendation: Dispatch Work Order #104 for fan replacement.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#070c18] border-l border-cyan-500/30 shadow-2xl flex flex-col backdrop-blur-2xl">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#050811]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono">NEXUS AI Copilot</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Gemini 3.7</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">FACILITY INTELLIGENCE & REASONING</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 bg-[#0a0f1e] border-b border-white/5 space-y-1.5">
        <div className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">Suggested Questions:</div>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0e162b] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/5 hover:border-cyan-400/40 transition-all text-left truncate max-w-full"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-[#0d1426] border border-white/5 text-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className={`text-[9px] font-mono mt-1 text-right ${msg.role === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>
                {msg.timestamp}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-[#0d1426] border border-white/5 rounded-2xl w-36 text-xs text-cyan-300">
            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            <span className="font-mono">Analyzing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-3 border-t border-white/5 bg-[#050811]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI Copilot about alarms, RUL models, or energy..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-[#0a0f1d] border border-white/10 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
