import React from 'react';
import { 
  Building2, 
  Activity, 
  Layers, 
  BarChart3, 
  Video, 
  Wrench, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  Bell, 
  UserCheck, 
  Radio, 
  ChevronDown,
  Download
} from 'lucide-react';
import { EnvironmentType, UserRole, SystemAlert } from '../types';

interface NavbarProps {
  activeTab: 'landing' | 'command_center' | 'analytics' | 'cv_lab' | 'maintenance';
  onTabChange: (tab: 'landing' | 'command_center' | 'analytics' | 'cv_lab' | 'maintenance') => void;
  currentEnvironment: EnvironmentType;
  onEnvironmentChange: (env: EnvironmentType) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  alerts: SystemAlert[];
  onOpenAlerts: () => void;
  onOpenVivaModal: () => void;
  onOpenReportModal: () => void;
  onOpenCopilot: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currentEnvironment,
  onEnvironmentChange,
  currentRole,
  onRoleChange,
  alerts,
  onOpenAlerts,
  onOpenVivaModal,
  onOpenReportModal,
  onOpenCopilot,
  isSimulating,
  onToggleSimulation,
}) => {
  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070b14]/95 border-b border-cyan-500/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => onTabChange('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-[#070b14] rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-wider text-white font-mono">NEXUS<span className="text-cyan-400">3D</span></span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">v4.2 AI</span>
              </div>
              <span className="hidden sm:block text-[10px] text-slate-400 font-mono tracking-tight">AI DIGITAL TWIN & PREDICTIVE INTELLIGENCE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d1424] p-1 rounded-lg border border-white/5">
            <button
              onClick={() => onTabChange('landing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'landing'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Product Tour
            </button>
            <button
              onClick={() => onTabChange('command_center')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'command_center'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              3D Command Center
            </button>
            <button
              onClick={() => onTabChange('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'analytics'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Intelligence Dashboard
            </button>
            <button
              onClick={() => onTabChange('cv_lab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'cv_lab'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Computer Vision
            </button>
            <button
              onClick={() => onTabChange('maintenance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'maintenance'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Predictive Work Orders
            </button>
          </nav>
        </div>

        {/* Right Tools & Role Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Environment Switcher Dropdown */}
          <div className="relative group hidden sm:block">
            <select
              value={currentEnvironment}
              onChange={(e) => onEnvironmentChange(e.target.value as EnvironmentType)}
              className="appearance-none bg-[#0e1628] border border-cyan-500/30 text-cyan-300 text-xs font-medium rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="college">🎓 Smart Campus Twin</option>
              <option value="factory">🏭 Smart Robotics Factory</option>
              <option value="datacenter">⚡ Tier-IV Data Center</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* User Role Switcher */}
          <div className="relative group hidden md:block">
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="appearance-none bg-[#0e1628] border border-white/10 text-slate-300 text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="admin">👤 Admin (Full Access)</option>
              <option value="facility_manager">🛠️ Facility Manager</option>
              <option value="analyst">📊 Data & ML Analyst</option>
              <option value="viewer">👁️ Viewer (Read-only)</option>
            </select>
            <UserCheck className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* IoT Stream Simulation Toggle */}
          <button
            onClick={onToggleSimulation}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              isSimulating
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800/40 border-slate-700 text-slate-400'
            }`}
            title="Toggle Live IoT Telemetry Simulator"
          >
            <Radio className={`w-3.5 h-3.5 ${isSimulating ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">{isSimulating ? 'IoT STREAM: ON' : 'IoT PAUSED'}</span>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 border border-cyan-400/40 text-cyan-200 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-md transition-all"
            title="Open AI Operations Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* College Project Viva & Report Button */}
          <button
            onClick={onOpenVivaModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 text-xs font-semibold rounded-lg transition-all"
            title="Final-Year College Viva Dossier & Architecture Slides"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden xl:inline">Viva Dossier</span>
          </button>

          {/* Monthly Intelligence Report Export */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 text-xs font-medium rounded-lg transition-all"
            title="Generate Monthly Facility Intelligence PDF"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Export PDF</span>
          </button>

          {/* Alerts Bell Badge */}
          <button
            onClick={onOpenAlerts}
            className="relative p-2 bg-[#0e1628] hover:bg-[#15223e] border border-cyan-500/30 text-slate-300 hover:text-cyan-300 rounded-lg transition-colors"
            title="System Alert Center"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-[#090e1a] border-t border-white/5 overflow-x-auto text-xs font-medium text-slate-400 gap-3">
        <button 
          onClick={() => onTabChange('command_center')}
          className={`whitespace-nowrap ${activeTab === 'command_center' ? 'text-cyan-300 font-bold' : ''}`}
        >
          3D Command Center
        </button>
        <button 
          onClick={() => onTabChange('analytics')}
          className={`whitespace-nowrap ${activeTab === 'analytics' ? 'text-cyan-300 font-bold' : ''}`}
        >
          Analytics
        </button>
        <button 
          onClick={() => onTabChange('cv_lab')}
          className={`whitespace-nowrap ${activeTab === 'cv_lab' ? 'text-cyan-300 font-bold' : ''}`}
        >
          Computer Vision
        </button>
        <button 
          onClick={() => onTabChange('maintenance')}
          className={`whitespace-nowrap ${activeTab === 'maintenance' ? 'text-cyan-300 font-bold' : ''}`}
        >
          Work Orders
        </button>
      </div>
    </header>
  );
};
