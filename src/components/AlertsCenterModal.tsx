import React from 'react';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Eye, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { SystemAlert } from '../types';

interface AlertsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: SystemAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
  onResolveAlert: (alertId: string) => void;
  onViewAlertIn3D: (alert: SystemAlert) => void;
}

export const AlertsCenterModal: React.FC<AlertsCenterModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onAcknowledgeAlert,
  onResolveAlert,
  onViewAlertIn3D,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col p-6 space-y-4 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Facility System Alerts Center</h3>
              <p className="text-[10px] text-slate-400 font-mono">REAL-TIME ANOMALY INCIDENT LOG</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
          {alerts.length === 0 ? (
            <div className="p-10 text-center text-slate-500 font-mono">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <span>All systems nominal. Zero active alarms.</span>
            </div>
          ) : (
            alerts.map(alt => (
              <div
                key={alt.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  alt.severity === 'critical'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      alt.severity === 'critical' ? 'bg-rose-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                    }`}>
                      {alt.severity.toUpperCase()}
                    </span>
                    <span className="font-bold text-sm text-white">{alt.title}</span>
                  </div>

                  <div className="text-xs text-slate-300">
                    Telemetry: <span className="font-mono font-bold text-white">{alt.actualValue}</span> (Limit: {alt.thresholdValue})
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{alt.timestamp}</span>
                    {alt.acknowledged && <span className="text-cyan-400 font-bold">• Acknowledged by Operator</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      onViewAlertIn3D(alt);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-200 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in 3D</span>
                  </button>

                  {!alt.acknowledged && (
                    <button
                      onClick={() => onAcknowledgeAlert(alt.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
                    >
                      Acknowledge
                    </button>
                  )}

                  <button
                    onClick={() => onResolveAlert(alt.id)}
                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Resolve</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
