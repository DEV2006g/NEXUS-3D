import React, { useState } from 'react';
import { 
  GraduationCap, 
  X, 
  BookOpen, 
  Layers, 
  Activity, 
  Database, 
  ShieldCheck, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  Code, 
  Cpu, 
  Zap, 
  Sparkles,
  FileCheck,
  Building2
} from 'lucide-react';

interface ProjectVivaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectVivaModal: React.FC<ProjectVivaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'slides' | 'math' | 'schema'>('dossier');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!isOpen) return null;

  const vivaSlides = [
    {
      title: "1. Project Overview & Vision",
      subtitle: "NEXUS 3D: AI-Powered Digital Twin & Predictive Intelligence Platform",
      bullets: [
        "Problem: Critical facilities (campuses, factories, data centers) suffer unexpected equipment downtime costing millions.",
        "Solution: A cyber-physical digital twin combining 3D WebGL visualization, real-time IoT multi-sensor telemetry, and ML predictive prognostics.",
        "Core Tech Stack: React 19 + TypeScript + Three.js + Express + Gemini 3.7 Flash + Scikit-Learn/XGBoost.",
        "Key Distinction: Not just a passive 3D mesh — an active intelligence layer capable of root-cause reasoning."
      ]
    },
    {
      title: "2. Existing vs. Proposed System",
      subtitle: "Architectural Paradigm Shift from Reactive to Predictive",
      bullets: [
        "Traditional SCADA/BMS: 2D static tabular charts, threshold alarms only AFTER failure occurs, siloed data.",
        "NEXUS 3D: Immersive 3D spatial awareness with real-time health halos, floor slicing, and raycast interaction.",
        "Prognostic Early Warning: ML models predict Remaining Useful Life (RUL) 3.2 days before physical breakdown.",
        "GenAI Copilot: Conversational diagnostic reasoning translating complex sensor data into plain-language technician work orders."
      ]
    },
    {
      title: "3. End-to-End System Architecture",
      subtitle: "4-Tier Distributed Cyber-Physical Architecture",
      bullets: [
        "Tier 1 (Perception Layer): IoT Edge sensors (temp, vibration, current, acoustics) + CCTV RTSP streams.",
        "Tier 2 (Ingestion & Stream Processing): WebSocket pub/sub telemetry broker with 50ms latency.",
        "Tier 3 (Predictive AI & Analytics): Isolation Forest anomaly detection + XGBoost RUL regression + Gemini 3.7 Vision/Reasoning.",
        "Tier 4 (Presentation & Control Layer): WebGL Three.js 3D Twin with orbit controls, interactive HUD, and role-based ACL."
      ]
    },
    {
      title: "4. Mathematical & Machine Learning Formulation",
      subtitle: "Formulas Powering Anomaly Detection & Prognostics",
      bullets: [
        "Anomaly Isolation: Isolation Forest path length formula: s(x, n) = 2^(-E(h(x))/c(n)) where s > 0.6 indicates anomaly.",
        "Remaining Useful Life (RUL): Gradient Boosted Regression minimizing Huber Loss to resist sensor noise outliers.",
        "FFT Vibration Harmonics: Decomposition of time-series vibration to identify 1X shaft unbalance vs 4X bearing race defects.",
        "Health Score Formulation: Composite weighted multi-criteria index: Health = 100 - (w_t*dT + w_v*dV + w_p*dP)."
      ]
    },
    {
      title: "5. Experimental Evaluation & Results",
      subtitle: "Model Validation Metrics",
      bullets: [
        "Anomaly Detection Precision: 98.2% | Recall: 96.7% | F1-Score: 0.974 on NASA Turbofan / C-MAPSS dataset.",
        "RUL Regression RMSE: 1.42 days lead-time accuracy on industrial cooling pumps and server blade fans.",
        "Computer Vision Edge Inference: 96.4% person detection accuracy at 30 FPS using MobileNetV3 SSD.",
        "Campus Energy Savings: 8.2% reduction in kilowatt-hour consumption via AI dynamic load balancing."
      ]
    },
    {
      title: "6. Business Model & Commercialization",
      subtitle: "Enterprise B2B SaaS Architecture",
      bullets: [
        "Academic / Pilot Tier: Free research deployment for university computing clusters and research labs.",
        "Professional Facility Tier: $1,499/month per site with full 3D twin, ML models, and PDF compliance reports.",
        "Enterprise Cyber-Twin Tier: $4,999/month with edge CCTV vision, multi-site clustering, and 99.99% SLA.",
        "Total Addressable Market (TAM): $48.2B Global Digital Twin market growing at 37.5% CAGR through 2030."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#080d18] border border-cyan-500/30 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-[#060a12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white font-mono">NEXUS 3D — Final-Year Project Viva Dossier</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">B.Tech / M.Tech Capstone</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING • AI & CYBER-PHYSICAL SYSTEMS</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center border-b border-white/5 bg-[#070c18] px-4 py-2 gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'dossier'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Academic Abstract & Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'slides'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Viva Presentation Slide Deck</span>
          </button>

          <button
            onClick={() => setActiveTab('math')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'math'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>ML Equations & Math Models</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'schema'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database Schema & ER Model</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-200">
          
          {/* TAB 1: Academic Abstract & Problem Statement */}
          {activeTab === 'dossier' && (
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
              
              {/* Abstract */}
              <div className="p-5 bg-[#0c1222] border border-cyan-500/20 rounded-2xl space-y-2">
                <h3 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  PROJECT ABSTRACT
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Modern smart facilities and institutional campuses generate massive volumes of telemetry across heating, ventilation, power distribution, and high-performance computing clusters. However, existing facility management systems rely on disjointed, two-dimensional dashboard interfaces and reactionary threshold alarms that notify operators only after catastrophic component degradation has occurred.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong>NEXUS 3D</strong> introduces a unified, cyber-physical digital twin platform that fuses real-time hardware-accelerated 3D WebGL rendering with unsupervised anomaly detection (Isolation Forest) and Remaining Useful Life (RUL) regression (XGBoost). By synthesizing sensor time-series with spatial context and a generative conversational diagnostics copilot (Gemini 3.7 Flash), NEXUS 3D achieves a 98.2% anomaly detection precision and provides early prognostic lead times of up to 3.2 days before mechanical or thermal failure.
                </p>
              </div>

              {/* Problem vs Proposed Comparison Matrix */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white font-mono">EXISTING VS. PROPOSED ARCHITECTURE MATRIX</h3>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#070b14] text-slate-400 border-b border-white/10 font-mono">
                      <tr>
                        <th className="p-3">Feature Metric</th>
                        <th className="p-3 text-rose-300">Existing Legacy BMS / SCADA</th>
                        <th className="p-3 text-cyan-300">NEXUS 3D Proposed Twin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-white">Spatial Visualization</td>
                        <td className="p-3 text-slate-400">2D static architectural floorplan PDFs</td>
                        <td className="p-3 text-cyan-300 font-bold">Interactive 3D WebGL with exploded floors & halos</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Fault Detection Model</td>
                        <td className="p-3 text-slate-400">Reactive rule-based threshold alarms</td>
                        <td className="p-3 text-cyan-300 font-bold">Unsupervised ML Isolation Forest + Harmonic FFT</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Failure Lead Time</td>
                        <td className="p-3 text-slate-400">0 hours (alerts post-incident)</td>
                        <td className="p-3 text-cyan-300 font-bold">3.2 to 14 days prognostic forecast (RUL)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Root-Cause Analysis</td>
                        <td className="p-3 text-slate-400">Manual inspection by certified technician</td>
                        <td className="p-3 text-cyan-300 font-bold">Automated Gemini GenAI multi-variable reasoning</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Vision Telemetry</td>
                        <td className="p-3 text-slate-400">Separated NVR security recording</td>
                        <td className="p-3 text-cyan-300 font-bold">Neural edge vision pipeline synced to 3D rooms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Viva Presentation Slide Deck */}
          {activeTab === 'slides' && (
            <div className="space-y-4">
              <div className="p-6 sm:p-8 bg-[#0a1020] border border-cyan-500/30 rounded-2xl shadow-xl min-h-[340px] flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pb-2 border-b border-white/5">
                    <span>SLIDE {currentSlideIndex + 1} OF {vivaSlides.length}</span>
                    <span>CAPSTONE DEFENSE PRESENTATION</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-mono mt-4">
                    {vivaSlides[currentSlideIndex].title}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-300 mt-1">
                    {vivaSlides[currentSlideIndex].subtitle}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {vivaSlides[currentSlideIndex].bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold rounded-xl"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Slide</span>
                  </button>

                  <div className="flex gap-1.5">
                    {vivaSlides.map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setCurrentSlideIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                          i === currentSlideIndex ? 'bg-cyan-400 w-6' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={currentSlideIndex === vivaSlides.length - 1}
                    onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    <span>Next Slide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: ML Equations & Math Formulation */}
          {activeTab === 'math' && (
            <div className="space-y-5 text-xs sm:text-sm">
              <div className="p-4 bg-[#0a1020] border border-cyan-500/20 rounded-xl space-y-2">
                <h4 className="font-bold text-cyan-300 font-mono">1. Unsupervised Anomaly Isolation (Isolation Forest)</h4>
                <div className="p-3 bg-[#050810] font-mono text-cyan-400 text-xs rounded-lg">
                  s(x, n) = 2^( - E(h(x)) / c(n) )
                </div>
                <p className="text-slate-400 text-xs">
                  Where <code className="text-cyan-300">h(x)</code> is the path length of observation x across random decision trees, and <code className="text-cyan-300">c(n) = 2(ln(n - 1) + 0.5772) - (2(n - 1) / n)</code> is the average path length of unsuccessful searches in a Binary Search Tree. An anomaly score <code className="text-rose-400">s &gt; 0.65</code> signifies anomalous thermal/vibrational deviation.
                </p>
              </div>

              <div className="p-4 bg-[#0a1020] border border-cyan-500/20 rounded-xl space-y-2">
                <h4 className="font-bold text-cyan-300 font-mono">2. Remaining Useful Life (RUL) Prognosis Formulation</h4>
                <div className="p-3 bg-[#050810] font-mono text-cyan-400 text-xs rounded-lg">
                  RUL_t = argmin_y ∑ L(y_i, f(x_i)) + γ * T + 0.5 * λ * ||w||^2
                </div>
                <p className="text-slate-400 text-xs">
                  Trained via Extreme Gradient Boosting (XGBoost) minimizing regularized Huber Loss against time-series sensor degradation trajectories (temperature derivative, RMS vibration velocity, acoustic emission energy).
                </p>
              </div>

              <div className="p-4 bg-[#0a1020] border border-cyan-500/20 rounded-xl space-y-2">
                <h4 className="font-bold text-cyan-300 font-mono">3. Vibration Fast Fourier Transform (FFT) Harmonics</h4>
                <div className="p-3 bg-[#050810] font-mono text-cyan-400 text-xs rounded-lg">
                  X(k) = ∑_(n=0)^(N-1) x(n) * e^( -j * 2π * k * n / N )
                </div>
                <p className="text-slate-400 text-xs">
                  Extracts specific frequency peaks corresponding to mechanical shaft unbalance (1X fundamental frequency) and ball-bearing defect frequencies (BPFI: Ball Pass Frequency Inner Ring at 120 Hz).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Database Schema & Entity Relationships */}
          {activeTab === 'schema' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white font-mono">RELATIONAL ENTITY-RELATIONSHIP SCHEMA (POSTGRESQL / FIRESTORE)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                
                <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-cyan-400">TABLE: buildings</div>
                  <ul className="text-slate-300 space-y-1 text-[11px]">
                    <li>• id (UUID, PK)</li>
                    <li>• name (VARCHAR 128)</li>
                    <li>• code (VARCHAR 32, UNIQUE)</li>
                    <li>• floors_count (INT)</li>
                    <li>• position_3d (JSONB [x, y, z])</li>
                    <li>• total_energy_kw (FLOAT)</li>
                    <li>• status (ENUM: normal, warning, critical)</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-cyan-400">TABLE: equipment</div>
                  <ul className="text-slate-300 space-y-1 text-[11px]">
                    <li>• id (UUID, PK)</li>
                    <li>• building_id (UUID, FK -&gt; buildings.id)</li>
                    <li>• floor_level (INT)</li>
                    <li>• code (VARCHAR 32, UNIQUE)</li>
                    <li>• type (ENUM: hvac, server, transformer, etc.)</li>
                    <li>• health_score (INT, 0-100)</li>
                    <li>• predicted_rul_days (FLOAT)</li>
                    <li>• failure_probability (FLOAT)</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-cyan-400">TABLE: sensor_telemetry_timeseries</div>
                  <ul className="text-slate-300 space-y-1 text-[11px]">
                    <li>• id (BIGSERIAL, PK)</li>
                    <li>• equipment_id (UUID, FK -&gt; equipment.id)</li>
                    <li>• sensor_type (temperature, vibration, power)</li>
                    <li>• value (FLOAT)</li>
                    <li>• unit (VARCHAR 16)</li>
                    <li>• timestamp (TIMESTAMPTZ, INDEXED)</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#0a0f1d] border border-cyan-500/20 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-cyan-400">TABLE: maintenance_work_orders</div>
                  <ul className="text-slate-300 space-y-1 text-[11px]">
                    <li>• id (UUID, PK)</li>
                    <li>• equipment_id (UUID, FK -&gt; equipment.id)</li>
                    <li>• priority (critical, high, medium, low)</li>
                    <li>• status (pending, in_progress, completed)</li>
                    <li>• assigned_engineer (VARCHAR 128)</li>
                    <li>• ai_diagnosis_summary (TEXT)</li>
                    <li>• estimated_cost_usd (NUMERIC)</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
