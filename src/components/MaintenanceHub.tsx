import React, { useState } from 'react';
import { MaintenanceTicket, Equipment } from '../types';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  User, 
  DollarSign, 
  Calendar, 
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MaintenanceHubProps {
  tickets: MaintenanceTicket[];
  equipment: Equipment[];
  onUpdateTicketStatus: (ticketId: string, status: MaintenanceTicket['status']) => void;
  onCreateTicket: (ticket: Partial<MaintenanceTicket>) => void;
  onSelectEquipmentFromTicket: (equipmentId: string) => void;
}

export const MaintenanceHub: React.FC<MaintenanceHubProps> = ({
  tickets,
  equipment,
  onUpdateTicketStatus,
  onCreateTicket,
  onSelectEquipmentFromTicket,
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newEqId, setNewEqId] = useState(equipment[0]?.id || '');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [newTechnician, setNewTechnician] = useState('Sarah Jenkins (Lead Tech)');
  const [newEstCost, setNewEstCost] = useState(450);

  const filteredTickets = tickets.filter(t => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  const columns: Array<{ title: string; status: MaintenanceTicket['status']; color: string }> = [
    { title: 'Predictive Backlog', status: 'pending', color: 'border-slate-600' },
    { title: 'Assigned / In Progress', status: 'in_progress', color: 'border-cyan-500' },
    { title: 'Completed & Verified', status: 'completed', color: 'border-emerald-500' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEq = equipment.find(eq => eq.id === newEqId);
    onCreateTicket({
      equipmentId: newEqId,
      equipmentName: targetEq?.name || 'Equipment Node',
      title: newTitle || `Predictive Inspection: ${targetEq?.name}`,
      description: `Dispatched following ML vibration/thermal degradation warnings on ${targetEq?.code}.`,
      priority: newPriority,
      status: 'pending',
      assignedTo: newTechnician,
      estimatedCostUsd: Number(newEstCost),
      dueDate: 'Tomorrow, 14:00',
      partsRequired: ['Thermal Compound', 'Bearing Assembly #402'],
      aiDiagnosisNotes: targetEq?.aiPrediction.recommendedAction || 'Inspect cooling array and mechanical balance.'
    });
    setShowCreateModal(false);
    setNewTitle('');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070c] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>AI-DISPATCHED WORK ORDER & SLA DISPATCHER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Predictive Maintenance Hub</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Priority filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#0e1628] border border-white/10 text-slate-300 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Work Order</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => {
          const colTickets = filteredTickets.filter(t => t.status === col.status);

          return (
            <div key={col.status} className="bg-[#080d18] border border-white/5 rounded-2xl p-4 flex flex-col space-y-3">
              
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color.replace('border-', 'bg-')}`} />
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">{col.title}</h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {colTickets.length}
                </span>
              </div>

              {/* Tickets List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-16rem)] pr-1">
                {colTickets.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 font-mono">No work orders in this state</div>
                ) : (
                  colTickets.map(ticket => (
                    <div 
                      key={ticket.id}
                      className="p-4 bg-[#0c1324] hover:bg-[#101930] border border-white/5 hover:border-cyan-500/30 rounded-xl transition-all space-y-3"
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          ticket.priority === 'critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : ticket.priority === 'high'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        }`}>
                          {ticket.priority.toUpperCase()} PRIORITY
                        </span>
                        
                        <span className="text-[10px] font-mono text-slate-400">{ticket.createdAt}</span>
                      </div>

                      {/* Title & Equipment */}
                      <div>
                        <h4 className="text-sm font-bold text-white leading-snug">{ticket.title}</h4>
                        <button
                          onClick={() => onSelectEquipmentFromTicket(ticket.equipmentId)}
                          className="text-xs text-cyan-400 hover:text-cyan-300 font-mono mt-1 flex items-center gap-1"
                        >
                          <span>{ticket.equipmentName}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* AI Diagnosis */}
                      {ticket.aiDiagnosisNotes && (
                        <div className="p-2.5 bg-[#070b14] border border-cyan-500/20 rounded-lg text-xs text-slate-300 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>AI ROOT-CAUSE DIAGNOSIS:</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-slate-300">{ticket.aiDiagnosisNotes}</p>
                        </div>
                      )}

                      {/* Meta Info: Assignee, Cost, Due */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                        <div className="flex items-center gap-1 truncate">
                          <User className="w-3 h-3 text-slate-500" />
                          <span className="truncate">{ticket.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end font-mono text-slate-300">
                          <DollarSign className="w-3 h-3 text-emerald-400" />
                          <span>${ticket.estimatedCostUsd}</span>
                        </div>
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        {ticket.status === 'pending' && (
                          <button
                            onClick={() => onUpdateTicketStatus(ticket.id, 'in_progress')}
                            className="flex-1 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold rounded-lg text-center"
                          >
                            Assign & Start
                          </button>
                        )}
                        {ticket.status === 'in_progress' && (
                          <button
                            onClick={() => onUpdateTicketStatus(ticket.id, 'completed')}
                            className="flex-1 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Resolved</span>
                          </button>
                        )}
                        {ticket.status === 'completed' && (
                          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>ISO-55001 Verified</span>
                          </span>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Manual Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <span>Create Predictive Work Order</span>
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Target Asset / Equipment</label>
                <select
                  value={newEqId}
                  onChange={(e) => setNewEqId(e.target.value)}
                  className="w-full bg-[#070c18] border border-white/10 text-white rounded-lg p-2.5"
                >
                  {equipment.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name} ({eq.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Work Order Title</label>
                <input
                  type="text"
                  placeholder="e.g. Inspect Bearing Vibration Harmonic on Blower Fan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#070c18] border border-white/10 text-white rounded-lg p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#070c18] border border-white/10 text-white rounded-lg p-2.5"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Estimated Cost ($)</label>
                  <input
                    type="number"
                    value={newEstCost}
                    onChange={(e) => setNewEstCost(Number(e.target.value))}
                    className="w-full bg-[#070c18] border border-white/10 text-white rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Assigned Lead Engineer</label>
                <input
                  type="text"
                  value={newTechnician}
                  onChange={(e) => setNewTechnician(e.target.value)}
                  className="w-full bg-[#070c18] border border-white/10 text-white rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg"
                >
                  Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
