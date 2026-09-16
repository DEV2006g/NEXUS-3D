import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Layers, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Eye, 
  BarChart3, 
  Wrench, 
  Video, 
  GraduationCap,
  Globe,
  Database,
  Lock
} from 'lucide-react';
import { EnvironmentType } from '../types';

interface HeroLandingProps {
  onLaunchDemo: () => void;
  onOpenVivaModal: () => void;
  onSelectEnvironment: (env: EnvironmentType) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onLaunchDemo,
  onOpenVivaModal,
  onSelectEnvironment,
}) => {
  return (
    <div className="w-full bg-[#05070b] text-slate-100 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Futuristic background grid & radial flare */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
          <div className="w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] translate-x-40" />
        </div>

        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ENTERPRISE CYBER-PHYSICAL DIGITAL TWIN</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-mono leading-[1.1]">
            NEXUS <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">3D</span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-200">
            Turn Physical Spaces Into Intelligent Digital Twins.
          </p>

          <p className="mt-2 text-base sm:text-lg font-mono text-cyan-400 tracking-wider uppercase">
            Visualize. Predict. Optimize.
          </p>

          <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Bridging 3D spatial WebGL rendering, real-time IoT multi-sensor telemetry, and machine-learning predictive maintenance to eliminate physical machinery downtime before it strikes.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-launch-twin-btn"
              onClick={onLaunchDemo}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Launch 3D Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVivaModal}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0d1424] hover:bg-[#15223e] border border-cyan-500/30 hover:border-cyan-400/60 text-slate-200 font-semibold text-sm rounded-xl transition-all"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Final-Year Viva Dossier</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#0a0f1c]/90 border border-cyan-500/20 rounded-2xl backdrop-blur-xl shadow-2xl">
            <div className="text-left border-r border-white/5 pr-4">
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">99.4%</div>
              <div className="text-xs text-slate-400 mt-0.5">Anomaly Detection Accuracy</div>
            </div>
            <div className="text-left md:border-r border-white/5 pr-4">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">3.2 Days</div>
              <div className="text-xs text-slate-400 mt-0.5">Early Failure Lead Time</div>
            </div>
            <div className="text-left border-r border-white/5 pr-4">
              <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400">&lt; 50ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Live IoT Telemetry Latency</div>
            </div>
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-400">38%</div>
              <div className="text-xs text-slate-400 mt-0.5">Campus Energy Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Digital Twin Environments Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Configurable Digital Architectures</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">Multi-Domain Digital Twin Ecosystem</p>
          <p className="text-slate-400 text-sm mt-2">NEXUS 3D adapts seamlessly across education, advanced manufacturing, and critical infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Preset 1: College */}
          <div 
            onClick={() => { onSelectEnvironment('college'); onLaunchDemo(); }}
            className="group relative p-6 bg-[#0a0f1d] hover:bg-[#0e162b] border border-cyan-500/20 hover:border-cyan-400/50 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">Smart University Campus</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Real-time monitoring of academic halls, high-performance computing clusters, DGX AI lab systems, and 33kV substation grids.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span>Launch Campus Twin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Preset 2: Factory */}
          <div 
            onClick={() => { onSelectEnvironment('factory'); onLaunchDemo(); }}
            className="group relative p-6 bg-[#0a0f1d] hover:bg-[#0e162b] border border-cyan-500/20 hover:border-cyan-400/50 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">Smart Robotics Factory</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Vibration harmonic monitoring of 5-axis CNC spindles, robotic arm joints, assembly conveyor belts, and thermal treatment cells.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span>Launch Factory Twin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Preset 3: Data Center */}
          <div 
            onClick={() => { onSelectEnvironment('datacenter'); onLaunchDemo(); }}
            className="group relative p-6 bg-[#0a0f1d] hover:bg-[#0e162b] border border-cyan-500/20 hover:border-cyan-400/50 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-300 mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">Tier-IV Hypercloud Data Center</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Mission-critical liquid cooling distribution units, redundant UPS battery arrays, and AI compute cold aisle containment.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-400">
              <span>Launch Data Center Twin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Main Pillars of NEXUS 3D */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Core Technological Differentiators</h2>
          <p className="text-2xl sm:text-4xl font-bold text-white mt-1">Not Just a 3D Model — An AI Intelligence Layer</p>
          <p className="text-slate-400 text-sm mt-2">Connecting real-world telemetry with spatial visualization and predictive machine learning models.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-[#090e1a] border border-cyan-500/20 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">1. 3D Spatial Twin</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              WebGL & Three.js hardware-accelerated interactive models with floor slicing, status rings, and one-click camera focus.
            </p>
          </div>

          <div className="p-6 bg-[#090e1a] border border-cyan-500/20 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">2. ML Predictive Engine</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Isolation Forest anomaly clustering and XGBoost Remaining Useful Life (RUL) regression forecasting component wear.
            </p>
          </div>

          <div className="p-6 bg-[#090e1a] border border-cyan-500/20 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">3. Gemini AI Diagnostics</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Natural-language root-cause breakdown ("Why is risk 87%?") and automated maintenance work order dispatching.
            </p>
          </div>

          <div className="p-6 bg-[#090e1a] border border-cyan-500/20 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
              <Video className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">4. Edge Computer Vision</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Live CCTV neural object detection for occupancy density, fire/smoke hazard analysis, and security perimeter enforcement.
            </p>
          </div>

        </div>
      </section>

      {/* 4. SaaS Business Model & Revenue Potential */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">Commercialization & SaaS Pricing</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">Enterprise Subscription Matrix</p>
          <p className="text-slate-400 text-sm mt-2">Designed for predictable recurring SaaS revenue and high-margin professional deployments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-7 bg-[#090e1a] border border-white/10 rounded-2xl">
            <div className="text-xs font-mono text-slate-400">STARTER / ACADEMIC</div>
            <div className="text-3xl font-black text-white font-mono mt-2">$0 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <p className="text-xs text-slate-400 mt-2">For university labs, research departments, and educational pilot deployments.</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Single Campus 3D Model</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Up to 25 IoT Sensor Streams</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Standard Threshold Alarms</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 7-day Telemetry Retention</li>
            </ul>
          </div>

          <div className="p-7 bg-[#0a1122] border-2 border-cyan-500/60 rounded-2xl shadow-xl shadow-cyan-500/10 relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
              Most Popular
            </div>
            <div className="text-xs font-mono text-cyan-300">PROFESSIONAL FACILITY</div>
            <div className="text-3xl font-black text-white font-mono mt-2">$1,499 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <p className="text-xs text-slate-400 mt-2">For manufacturing plants, hospitals, and enterprise data centers.</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Full Exploded Floor 3D Twin</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> ML Predictive RUL & Failure Models</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Automated ISO-55001 PDF Reports</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Up to 250 Asset Nodes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 4 Role-Based Access Tiers</li>
            </ul>
          </div>

          <div className="p-7 bg-[#090e1a] border border-white/10 rounded-2xl">
            <div className="text-xs font-mono text-indigo-400">ENTERPRISE CYBER-TWIN</div>
            <div className="text-3xl font-black text-white font-mono mt-2">$4,999 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <p className="text-xs text-slate-400 mt-2">For multi-facility corporations, government infrastructure, and hypercloud hubs.</p>
            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited Multi-Site Digital Twins</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Edge CCTV Computer Vision Pipeline</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated Gemini AI Diagnostic Copilot</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> BACnet / MQTT / OPC-UA Connectors</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 99.99% Guaranteed Uptime SLA</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-10 px-4 max-w-7xl mx-auto border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-300">NEXUS 3D</span>
          <span>• Final-Year Computer Science Engineering Capstone Project</span>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4 font-mono text-[11px]">
          <span>React 19</span>
          <span>•</span>
          <span>Three.js</span>
          <span>•</span>
          <span>Gemini 3.7 Flash</span>
          <span>•</span>
          <span>Tailwind CSS</span>
        </div>
      </footer>

    </div>
  );
};
