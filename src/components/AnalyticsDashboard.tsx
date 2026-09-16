import React from 'react';
import { 
  Building, 
  Equipment, 
  SystemAlert 
} from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  AlertTriangle, 
  ShieldAlert, 
  Wrench, 
  Users, 
  Cpu, 
  CheckCircle2,
  Calendar,
  Flame,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface AnalyticsDashboardProps {
  buildings: Building[];
  equipment: Equipment[];
  alerts: SystemAlert[];
  metrics: {
    overallHealth: number;
    activeAlerts: number;
    equipmentAtRisk: number;
    totalEnergyMwh: number;
    averageOccupancyPct: number;
    predictedMaintenanceCount: number;
    criticalEventsCount: number;
  };
  onSelectEquipment: (eq: Equipment) => void;
  onNavigateToCommandCenter: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  buildings,
  equipment,
  alerts,
  metrics,
  onSelectEquipment,
  onNavigateToCommandCenter,
}) => {

  // 24-Hour Energy Consumption vs AI Baseline Curve
  const energyTrendData = [
    { time: '00:00', actualKw: 240, baselineKw: 250, aiOptimizedKw: 220 },
    { time: '03:00', actualKw: 190, baselineKw: 200, aiOptimizedKw: 180 },
    { time: '06:00', actualKw: 310, baselineKw: 320, aiOptimizedKw: 280 },
    { time: '09:00', actualKw: 680, baselineKw: 710, aiOptimizedKw: 620 },
    { time: '12:00', actualKw: 880, baselineKw: 920, aiOptimizedKw: 790 },
    { time: '15:00', actualKw: 810, baselineKw: 850, aiOptimizedKw: 740 },
    { time: '18:00', actualKw: 560, baselineKw: 590, aiOptimizedKw: 510 },
    { time: '21:00', actualKw: 340, baselineKw: 360, aiOptimizedKw: 300 },
  ];

  // Degradation & RUL Curves for key assets
  const degradationData = [
    { day: 'Day 0', serverRack: 95, dgxCluster: 98, transformer: 94, hvacChiller: 96 },
    { day: 'Day 15', serverRack: 88, dgxCluster: 92, transformer: 91, hvacChiller: 93 },
    { day: 'Day 30', serverRack: 76, dgxCluster: 84, transformer: 86, hvacChiller: 88 },
    { day: 'Day 45', serverRack: 58, dgxCluster: 78, transformer: 80, hvacChiller: 82 },
    { day: 'Day 60 (Now)', serverRack: 38, dgxCluster: 71, transformer: 74, hvacChiller: 78 },
    { day: 'Day 75 (Fcst)', serverRack: 12, dgxCluster: 62, transformer: 68, hvacChiller: 72 },
  ];

  // Vibration FFT Harmonics Data
  const vibrationFftData = [
    { freq: '10 Hz (1X)', baseline: 0.8, actual: 1.2, alertLimit: 3.0 },
    { freq: '20 Hz (2X)', baseline: 0.6, actual: 1.1, alertLimit: 3.0 },
    { freq: '50 Hz (Pole)', baseline: 1.1, actual: 2.8, alertLimit: 3.5 },
    { freq: '120 Hz (Bearing)', baseline: 1.2, actual: 4.8, alertLimit: 4.0 }, // Peak Anomaly!
    { freq: '240 Hz (Harmonic)', baseline: 0.7, actual: 2.4, alertLimit: 3.5 },
    { freq: '480 Hz (Blade)', baseline: 0.4, actual: 1.5, alertLimit: 3.0 },
  ];

  // Anomaly Category Distribution Pie
  const anomalyCategories = [
    { name: 'Thermal Anomaly', value: 42, color: '#f43f5e' },
    { name: 'Bearing Vibration', value: 28, color: '#f59e0b' },
    { name: 'Power Surge/Sag', value: 18, color: '#06b6d4' },
    { name: 'Overcrowding/Safety', value: 12, color: '#8b5cf6' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070c] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span>NEXUS PREDICTIVE INTELLIGENCE & TELEMETRY HUB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Command-Center Analytics</h1>
        </div>

        <button
          onClick={onNavigateToCommandCenter}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
        >
          <span>Open 3D Command Center</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7 Core KPI Cards requested in Section 10 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        
        {/* KPI 1: Overall Health */}
        <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Overall Health</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1">
            {metrics.overallHealth}<span className="text-xs text-slate-500">/100</span>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-1 font-mono">
            <ArrowUpRight className="w-3 h-3" />
            <span>+2.4% vs last wk</span>
          </div>
        </div>

        {/* KPI 2: Active Alerts */}
        <div className="p-4 bg-[#0a0f1d] border border-rose-500/30 rounded-2xl">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Active Alerts</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400 mt-1">
            {String(metrics.activeAlerts).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-rose-400 flex items-center gap-0.5 mt-1 font-mono">
            <span>1 Critical • 3 Warn</span>
          </div>
        </div>

        {/* KPI 3: Equipment At Risk */}
        <div className="p-4 bg-[#0a0f1d] border border-amber-500/30 rounded-2xl">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Equipment At Risk</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-1">
            {String(metrics.equipmentAtRisk).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-amber-400 flex items-center gap-0.5 mt-1 font-mono">
            <span>RUL &lt; 14 Days</span>
          </div>
        </div>

        {/* KPI 4: Energy Consumption */}
        <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Energy Usage</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400 mt-1">
            {metrics.totalEnergyMwh} <span className="text-xs text-slate-400">MWh</span>
          </div>
          <div className="text-[10px] text-cyan-400 flex items-center gap-0.5 mt-1 font-mono">
            <ArrowDownRight className="w-3 h-3" />
            <span>-8.2% AI saving</span>
          </div>
        </div>

        {/* KPI 5: Occupancy */}
        <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Avg Occupancy</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-400 mt-1">
            {metrics.averageOccupancyPct}%
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-1 font-mono">
            <span>Peak: 88%</span>
          </div>
        </div>

        {/* KPI 6: Predicted Maintenance */}
        <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Predicted Maint</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 mt-1">
            {String(metrics.predictedMaintenanceCount).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-cyan-400 flex items-center gap-0.5 mt-1 font-mono">
            <span>Next: 24 hrs</span>
          </div>
        </div>

        {/* KPI 7: Critical Events */}
        <div className="p-4 bg-[#0a0f1d] border border-rose-500/30 rounded-2xl col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Critical Events</div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-500 mt-1 animate-pulse">
            {String(metrics.criticalEventsCount).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-rose-400 flex items-center gap-0.5 mt-1 font-mono">
            <span>SR-04 Thermal</span>
          </div>
        </div>

      </div>

      {/* Row 2: Charts (Energy Trend & Degradation Forecast Curves) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: 24h Energy Optimization */}
        <div className="p-5 bg-[#0a0f1d] border border-white/5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                24-Hour Energy Load vs AI Optimized Baseline
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time load balancing saved 1.8 MWh across campus today.</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/30">
              SMART HVAC
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyTrendData}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit=" kW" width={55} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#06b6d4', fontSize: '11px' }} />
                <Area type="monotone" dataKey="actualKw" name="Actual Draw (kW)" stroke="#06b6d4" strokeWidth={2} fill="url(#actualGrad)" />
                <Line type="monotone" dataKey="baselineKw" name="Standard Baseline (kW)" stroke="#64748b" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="aiOptimizedKw" name="AI Target (kW)" stroke="#10b981" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Predictive Remaining Useful Life (RUL) Degradation */}
        <div className="p-5 bg-[#0a0f1d] border border-white/5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400" />
                Multi-Asset Health Score Degradation (RUL Models)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">XGBoost & Random Forest time-series remaining useful life trajectory.</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-500/10 text-rose-300 rounded border border-rose-500/30">
              PROGNOSTICS
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={degradationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" width={40} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#06b6d4', fontSize: '11px' }} />
                <Line type="monotone" dataKey="serverRack" name="HPC Blade SR-04" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="dgxCluster" name="DGX AI Cluster" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="transformer" name="33kV Transformer" stroke="#eab308" strokeWidth={2} />
                <Line type="monotone" dataKey="hvacChiller" name="CRAC Chiller" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 3: Vibration FFT Spectrum & Anomaly Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Vibration FFT Spectrum */}
        <div className="lg:col-span-2 p-5 bg-[#0a0f1d] border border-white/5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Vibration Fast Fourier Transform (FFT) Frequency Harmonics
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Detecting mechanical bearing fault frequencies (120 Hz peak harmonic).</p>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vibrationFftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="freq" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} unit=" mm/s" width={55} />
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#06b6d4', fontSize: '11px' }} />
                <Bar dataKey="actual" name="Live Harmonic Peak (mm/s)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="baseline" name="Nominal Baseline" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alertLimit" name="ISO Safety Ceiling" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Distribution Pie */}
        <div className="p-5 bg-[#0a0f1d] border border-white/5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              Anomaly Distribution
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Historical classification by subsystem.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={anomalyCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={4}>
                  {anomalyCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#06b6d4', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            {anomalyCategories.map(cat => (
              <div key={cat.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="truncate">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
