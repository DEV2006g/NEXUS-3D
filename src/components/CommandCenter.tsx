import React, { useState } from 'react';
import { 
  Building, 
  Equipment, 
  HealthStatus, 
  Position3D, 
  SystemAlert, 
  TimelineEvent, 
  UserRole 
} from '../types';
import { DigitalTwin3D } from './DigitalTwin3D';
import { 
  Building2, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Wrench, 
  Zap, 
  Flame, 
  ShieldAlert, 
  ChevronRight, 
  Compass, 
  Sliders, 
  TrendingUp, 
  Play, 
  RotateCcw,
  Eye,
  Info,
  Radio
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface CommandCenterProps {
  buildings: Building[];
  equipment: Equipment[];
  alerts: SystemAlert[];
  timeline: TimelineEvent[];
  selectedBuilding: Building | null;
  selectedEquipment: Equipment | null;
  selectedFloorLevel: number | 'all';
  viewMode: 'standard' | 'thermal' | 'energy' | 'security';
  currentRole: UserRole;
  onSelectBuilding: (building: Building | null) => void;
  onSelectEquipment: (equipment: Equipment | null) => void;
  onSelectFloor: (level: number | 'all') => void;
  onViewModeChange: (mode: 'standard' | 'thermal' | 'energy' | 'security') => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onResolveAlert: (alertId: string) => void;
  onCreateMaintenanceTicket: (eq: Equipment) => void;
  onInjectAnomaly: (scenario: 'server_thermal' | 'ai_fan_wear' | 'substation_surge' | 'reset_nominal') => void;
  onExplainRiskWithGemini: (eq: Equipment) => void;
  isExplainingAi: boolean;
  aiExplanationResult: any | null;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  buildings,
  equipment,
  alerts,
  timeline,
  selectedBuilding,
  selectedEquipment,
  selectedFloorLevel,
  viewMode,
  currentRole,
  onSelectBuilding,
  onSelectEquipment,
  onSelectFloor,
  onViewModeChange,
  onAcknowledgeAlert,
  onResolveAlert,
  onCreateMaintenanceTicket,
  onInjectAnomaly,
  onExplainRiskWithGemini,
  isExplainingAi,
  aiExplanationResult,
}) => {
  const [focusPosition, setFocusPosition] = useState<Position3D | null>(null);
  const [activeTabLeft, setActiveTabLeft] = useState<'tree' | 'simulator'>('tree');

  // Handle clicking "VIEW IN 3D" from an alert
  const handleViewAlertIn3D = (alert: SystemAlert) => {
    if (alert.equipmentId) {
      const targetEq = equipment.find(e => e.id === alert.equipmentId);
      if (targetEq) {
        onSelectEquipment(targetEq);
        setFocusPosition(targetEq.position);
      }
    } else if (alert.buildingId) {
      const targetB = buildings.find(b => b.id === alert.buildingId);
      if (targetB) {
        onSelectBuilding(targetB);
        setFocusPosition(targetB.position);
      }
    }
  };

  // Currently focused active equipment or default to the most critical asset
  const activeEq = selectedEquipment || equipment.find(e => e.status === 'critical') || equipment[0];

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col bg-[#05070c] text-slate-100 overflow-hidden select-none">
      
      {/* Main 3-Column Cockpit Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* ================= LEFT PANEL: SPATIAL HIERARCHY & VIVA SIMULATOR ================= */}
        <aside className="w-full lg:w-80 h-auto lg:h-full bg-[#080d18] border-b lg:border-b-0 lg:border-r border-cyan-500/20 flex flex-col z-20 flex-shrink-0">
          {/* Sub Tabs */}
          <div className="flex items-center border-b border-white/5 bg-[#060a12] p-1 gap-1">
            <button
              onClick={() => setActiveTabLeft('tree')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTabLeft === 'tree'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Campus Hierarchy</span>
            </button>
            <button
              onClick={() => setActiveTabLeft('simulator')}
              className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTabLeft === 'simulator'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Viva Demo Injector</span>
            </button>
          </div>

          {/* Tab 1: Hierarchy Tree */}
          {activeTabLeft === 'tree' && (
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                <span>FACILITY NODES ({buildings.length})</span>
                <span>STATUS</span>
              </div>

              {buildings.map(b => {
                const isSelected = selectedBuilding?.id === b.id;
                const buildingEquipment = equipment.filter(e => e.buildingId === b.id);
                const hasCritical = buildingEquipment.some(e => e.status === 'critical');

                return (
                  <div 
                    key={b.id} 
                    className={`rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#0d162a] border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-[#0a0f1d]/80 border-white/5 hover:border-cyan-500/30'
                    }`}
                  >
                    {/* Building Header */}
                    <div 
                      onClick={() => {
                        onSelectBuilding(b);
                        setFocusPosition(b.position);
                      }}
                      className="p-3 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-3 h-3 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: b.color }}
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-100 truncate">{b.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{b.code} • {b.floorsCount} Floors</div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        b.status === 'critical' || hasCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                          : b.status === 'warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {hasCritical ? 'CRITICAL' : b.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Expandable Equipment & Floors */}
                    {isSelected && (
                      <div className="px-3 pb-3 pt-1 border-t border-white/5 space-y-1.5">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Internal Assets:</div>
                        {buildingEquipment.map(eq => {
                          const isEqSelected = selectedEquipment?.id === eq.id;
                          return (
                            <div
                              key={eq.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectEquipment(eq);
                                setFocusPosition(eq.position);
                              }}
                              className={`p-2 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                                isEqSelected
                                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                                  : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                  eq.status === 'critical' ? 'bg-rose-500 animate-ping' : eq.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                                }`} />
                                <span className="truncate">{eq.name}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 ml-2">{eq.code}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Anomaly Simulation Injector for College Viva */}
          {activeTabLeft === 'simulator' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <Play className="w-4 h-4 text-rose-400" />
                  <span>College Viva Live Demo Scenario</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Demonstrate the full pipeline to your examiners: Click an anomaly below to inject real-time sensor anomalies, trigger ML risk models, update 3D status halos, and auto-zoom the camera!
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onInjectAnomaly('server_thermal')}
                  className="w-full text-left p-3 bg-[#0d1424] hover:bg-rose-950/40 border border-rose-500/30 hover:border-rose-500/60 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                    <span>1. Server Room SR-04 Thermal Spike</span>
                    <Flame className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Spikes temp to 78.6°C, increases vibration to 4.8mm/s, drops health to 38/100, and triggers critical 3D halo.
                  </div>
                </button>

                <button
                  onClick={() => onInjectAnomaly('ai_fan_wear')}
                  className="w-full text-left p-3 bg-[#0d1424] hover:bg-amber-950/40 border border-amber-500/30 hover:border-amber-500/60 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                    <span>2. DGX AI Lab GPU Fan Wear</span>
                    <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Triggers sustained GPU die thermal drift (62.1°C) and ML remaining useful life degradation alert.
                  </div>
                </button>

                <button
                  onClick={() => onInjectAnomaly('substation_surge')}
                  className="w-full text-left p-3 bg-[#0d1424] hover:bg-yellow-950/40 border border-yellow-500/30 hover:border-yellow-500/60 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-yellow-300">
                    <span>3. 33kV Substation Load Surge</span>
                    <Zap className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Simulates midday campus peak power draw (680kW) and winding oil thermal warning.
                  </div>
                </button>

                <button
                  onClick={() => onInjectAnomaly('reset_nominal')}
                  className="w-full text-left p-3 bg-[#0a1524] hover:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span>Restore All Assets to Nominal</span>
                    <RotateCcw className="w-4 h-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Normalizes all sensor streams, resets baseline temperatures, and clears active alarms.
                  </div>
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* ================= CENTER: 3D DIGITAL TWIN CANVAS ================= */}
        <main className="flex-1 h-[400px] lg:h-full relative overflow-hidden bg-[#05070c]">
          <DigitalTwin3D
            buildings={buildings}
            equipment={equipment}
            selectedEquipment={selectedEquipment}
            selectedBuilding={selectedBuilding}
            selectedFloorLevel={selectedFloorLevel}
            viewMode={viewMode}
            onSelectEquipment={(eq) => {
              onSelectEquipment(eq);
              if (eq) setFocusPosition(eq.position);
            }}
            onSelectBuilding={(b) => {
              onSelectBuilding(b);
              if (b) setFocusPosition(b.position);
            }}
            focusTargetPosition={focusPosition}
            onFloorChange={onSelectFloor}
            onViewModeChange={onViewModeChange}
          />
        </main>

        {/* ================= RIGHT PANEL: LIVE AI TELEMETRY & PREDICTIVE PROGNOSIS ================= */}
        <aside className="w-full lg:w-96 h-auto lg:h-full bg-[#080d18] border-t lg:border-t-0 lg:border-l border-cyan-500/20 flex flex-col z-20 flex-shrink-0 overflow-y-auto">
          {activeEq ? (
            <div className="p-4 space-y-4">
              
              {/* Asset Header */}
              <div className="p-4 bg-[#0c1222] border border-cyan-500/20 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {activeEq.code}
                  </span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    activeEq.status === 'critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : activeEq.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {activeEq.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-sm font-black text-white mt-2 leading-tight">{activeEq.name}</h3>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeEq.roomName}</span>
                </div>
              </div>

              {/* Health Score & ML RUL KPI Matrix */}
              <div className="grid grid-cols-2 gap-3">
                {/* Health Score Gauge */}
                <div className="p-3 bg-[#0a101e] border border-white/5 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400">EQUIPMENT HEALTH</div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-2xl font-black font-mono ${
                      activeEq.aiPrediction.healthScore < 50
                        ? 'text-rose-400'
                        : activeEq.aiPrediction.healthScore < 80
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}>
                      {activeEq.aiPrediction.healthScore}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/100</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        activeEq.aiPrediction.healthScore < 50
                          ? 'bg-rose-500'
                          : activeEq.aiPrediction.healthScore < 80
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${activeEq.aiPrediction.healthScore}%` }}
                    />
                  </div>
                </div>

                {/* Predicted Failure RUL */}
                <div className="p-3 bg-[#0a101e] border border-white/5 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400">PREDICTED RUL</div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-2xl font-black font-mono ${
                      activeEq.aiPrediction.predictedDaysToFailure < 5
                        ? 'text-rose-400'
                        : activeEq.aiPrediction.predictedDaysToFailure < 20
                        ? 'text-amber-400'
                        : 'text-cyan-400'
                    }`}>
                      {activeEq.aiPrediction.predictedDaysToFailure}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Days</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Fail Prob: <span className="text-rose-300 font-bold">{activeEq.aiPrediction.failureProbabilityPct}%</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Sensor Telemetry Sparklines */}
              <div className="p-3 bg-[#0a101e] border border-white/5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    Live Telemetry Stream
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* Sensor Values Pills */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 bg-slate-900/80 rounded-lg">
                    <div className="text-[10px] text-slate-400 font-mono">TEMP</div>
                    <div className={`text-xs font-bold font-mono ${activeEq.temperatureC > 65 ? 'text-rose-400' : 'text-slate-100'}`}>
                      {activeEq.temperatureC}°C
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-lg">
                    <div className="text-[10px] text-slate-400 font-mono">VIBRATION</div>
                    <div className={`text-xs font-bold font-mono ${activeEq.vibrationMmS > 3.5 ? 'text-rose-400' : 'text-slate-100'}`}>
                      {activeEq.vibrationMmS} mm/s
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900/80 rounded-lg">
                    <div className="text-[10px] text-slate-400 font-mono">POWER</div>
                    <div className="text-xs font-bold font-mono text-cyan-300">
                      {activeEq.powerKw} kW
                    </div>
                  </div>
                </div>

                {/* Telemetry Chart */}
                {activeEq.sensors[0]?.history && (
                  <div className="h-24 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activeEq.sensors[0].history}>
                        <defs>
                          <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="timestamp" stroke="#475569" fontSize={9} tickLine={false} />
                        <YAxis stroke="#475569" fontSize={9} tickLine={false} width={24} domain={['auto', 'auto']} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#090e1a', borderColor: '#06b6d4', fontSize: '11px' }}
                          itemStyle={{ color: '#38bdf8' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#telemetryGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* AI Explanation & Root-Cause Analysis (Gemini GenAI Engine) */}
              <div className="p-3 bg-[#090f1d] border border-cyan-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI Risk & Root Cause Engine</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    {activeEq.aiPrediction.mlAlgorithm}
                  </span>
                </div>

                {/* Root causes bullet points */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-slate-300">Primary Degradation Vectors:</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {(aiExplanationResult?.rootCauses || activeEq.aiPrediction?.rootCauses || ['Baseline nominal harmonics within statistical tolerance']).map((cause: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <span className="text-rose-400 font-bold mt-0.5">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Action */}
                <div className="p-2.5 bg-[#050912] border border-cyan-500/20 rounded-lg text-[11px] text-cyan-200 mt-2">
                  <div className="font-bold text-cyan-400 text-[10px] uppercase font-mono">Recommended Action:</div>
                  <p className="mt-0.5 leading-relaxed">
                    {aiExplanationResult?.recommendedAction || activeEq.aiPrediction?.recommendedAction || 'Asset operating within normal operational parameters.'}
                  </p>
                </div>

                {/* Gemini AI On-Demand Deep Diagnostics Trigger */}
                <button
                  onClick={() => onExplainRiskWithGemini(activeEq)}
                  disabled={isExplainingAi}
                  className="w-full mt-2 py-2 px-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-cyan-300 ${isExplainingAi ? 'animate-spin' : ''}`} />
                  <span>{isExplainingAi ? 'Running Gemini Diagnostics...' : 'Deep AI Diagnostics (Gemini 3.7)'}</span>
                </button>
              </div>

              {/* Maintenance Work Order Action */}
              <div className="pt-1">
                <button
                  onClick={() => onCreateMaintenanceTicket(activeEq)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Create Maintenance Ticket</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              Select an equipment or building from the 3D canvas or hierarchy tree to inspect live intelligence.
            </div>
          )}
        </aside>

      </div>

      {/* ================= BOTTOM BAR: TIMELINE & ACTIVE ALERTS STRIP ================= */}
      <footer className="h-auto lg:h-32 bg-[#060912] border-t border-cyan-500/20 flex flex-col lg:flex-row z-30 flex-shrink-0">
        
        {/* Alerts Center Feed with instant "VIEW IN 3D" trigger */}
        <div className="w-full lg:w-3/5 p-2.5 lg:p-3 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>ACTIVE SYSTEM ALERTS ({alerts.length})</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Click &quot;VIEW IN 3D&quot; to auto-zoom camera</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {(alerts || []).slice(0, 3).map(alt => (
              <div 
                key={alt.id}
                className={`p-2 rounded-lg border min-w-[280px] sm:min-w-[320px] flex items-center justify-between gap-2 ${
                  alt.severity === 'critical'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="truncate">
                  <div className="flex items-center gap-1.5 text-xs font-bold truncate">
                    <span className={`w-1.5 h-1.5 rounded-full ${alt.severity === 'critical' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                    <span className="truncate">{alt.title}</span>
                  </div>
                  <div className="text-[10px] opacity-80 truncate">{alt.actualValue} (Threshold: {alt.thresholdValue})</div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleViewAlertIn3D(alt)}
                    className="px-2 py-1 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-200 font-bold text-[10px] rounded flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>VIEW IN 3D</span>
                  </button>
                  {!alt.acknowledged && (
                    <button
                      onClick={() => onAcknowledgeAlert(alt.id)}
                      className="px-1.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded"
                      title="Acknowledge Alert"
                    >
                      Ack
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Event Timeline */}
        <div className="w-full lg:w-2/5 p-2.5 lg:p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>LIVE AI EVENT TIMELINE</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">TELEMETRY SYNCED</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 text-[11px] font-mono">
            {(timeline || []).slice(-4).reverse().map(event => (
              <div key={event.id} className="p-1.5 bg-[#0a101e] border border-white/5 rounded-lg min-w-[200px] truncate">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-cyan-300">{event.timestamp}</span>
                  <span className={event.severity === 'critical' ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                    {event.type?.toUpperCase()}
                  </span>
                </div>
                <div className="text-slate-200 truncate mt-0.5">{event.title}</div>
              </div>
            ))}
          </div>
        </div>

      </footer>

    </div>
  );
};
