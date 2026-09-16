import React, { useState } from 'react';
import { 
  Video, 
  Upload, 
  Sparkles, 
  ShieldAlert, 
  Users, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Camera, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import { CVDetectionResult } from '../types';

interface ComputerVisionLabProps {
  onSyncOccupancyToTwin: (roomId: string, count: number) => void;
}

export const ComputerVisionLab: React.FC<ComputerVisionLabProps> = ({
  onSyncOccupancyToTwin,
}) => {
  const [selectedFeed, setSelectedFeed] = useState<string>('cctv-aiml-02');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // CCTV Predefined Feeds
  const cctvFeeds = [
    {
      id: 'cctv-aiml-02',
      name: 'AI Neural Computing Lab (LAB-AI-201)',
      targetRoomId: 'rm-aiml-lab',
      location: 'CS Block • 1st Floor',
      cameraModel: 'Axis P3245-V 4K Edge AI',
      mockResult: {
        peopleCount: 34,
        occupancyPct: 85,
        crowdDensity: 'High' as const,
        safetyViolations: ['Lab aisle passage partially obstructed by mobile robot cart'],
        fireSmokeDetected: false,
        fireSmokeConfidence: 0.01,
        unauthorizedAccess: false,
        detectedObjects: [
          { label: 'Person', confidence: 0.96, box: [120, 80, 50, 140] },
          { label: 'Person', confidence: 0.94, box: [200, 110, 55, 130] },
          { label: 'Person', confidence: 0.91, box: [320, 95, 48, 135] },
          { label: 'GPU Server Rack', confidence: 0.98, box: [450, 60, 120, 200] },
        ],
        timestamp: '10:45:20',
        summary: 'Neural Lab shows 34 occupants (85% capacity). High collaborative activity with active GPU cluster experiments.'
      }
    },
    {
      id: 'cctv-srv-01',
      name: 'Central Server Room & HPC Hub (SR-04)',
      targetRoomId: 'rm-server-room',
      location: 'CS Block • Ground Floor (Restricted)',
      cameraModel: 'Hikvision Thermal Dual-Spectrum',
      mockResult: {
        peopleCount: 3,
        occupancyPct: 38,
        crowdDensity: 'Low' as const,
        safetyViolations: ['1 technician operating near Blade Rack SR-04 without ESD strap'],
        fireSmokeDetected: false,
        fireSmokeConfidence: 0.04,
        unauthorizedAccess: false,
        detectedObjects: [
          { label: 'Technician', confidence: 0.95, box: [220, 140, 60, 160] },
          { label: 'Blade Server SR-04', confidence: 0.99, box: [100, 40, 140, 240] },
        ],
        timestamp: '10:45:22',
        summary: 'Server Vault occupancy normal (3/8). Thermal optics detect localized heat plume at Blade Rack SR-04 exhaust.'
      }
    },
    {
      id: 'cctv-gate-01',
      name: 'Campus Main Security Portal & Gate',
      targetRoomId: 'rm-main-complex',
      location: 'Main Complex • Exterior Perimeter',
      cameraModel: 'Bosch DINION IP 8000',
      mockResult: {
        peopleCount: 52,
        occupancyPct: 52,
        crowdDensity: 'Moderate' as const,
        safetyViolations: [],
        fireSmokeDetected: false,
        fireSmokeConfidence: 0.0,
        unauthorizedAccess: false,
        detectedObjects: [
          { label: 'Pedestrian', confidence: 0.97, box: [80, 120, 40, 100] },
          { label: 'Vehicle', confidence: 0.99, box: [300, 150, 180, 110] },
        ],
        timestamp: '10:45:18',
        summary: 'Smooth pedestrian flow at campus entrance. No security perimeter anomalies.'
      }
    }
  ];

  const currentActiveFeed = cctvFeeds.find(f => f.id === selectedFeed) || cctvFeeds[0];
  const [detectionResult, setDetectionResult] = useState<CVDetectionResult>(currentActiveFeed.mockResult as CVDetectionResult);

  // Run AI Computer Vision inference via Gemini 3.7 Flash server endpoint
  const handleRunInference = async (imageToAnalyze?: string) => {
    const activeImage = imageToAnalyze || customImage;
    setIsAnalyzing(true);
    try {
      if (activeImage) {
        const res = await fetch('/api/gemini/cv-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: activeImage,
            prompt: 'Analyze smart campus CCTV security image for exact occupancy count and safety'
          })
        });
        const data = await res.json();
        setDetectionResult({
          peopleCount: typeof data.peopleCount === 'number' ? data.peopleCount : 0,
          occupancyPct: typeof data.occupancyPct === 'number' ? data.occupancyPct : 0,
          crowdDensity: data.crowdDensity || (data.peopleCount > 15 ? 'High' : data.peopleCount > 5 ? 'Moderate' : data.peopleCount === 0 ? 'Vacant' : 'Low'),
          safetyViolations: data.safetyViolations || [],
          fireSmokeDetected: Boolean(data.fireSmokeDetected),
          fireSmokeConfidence: typeof data.fireSmokeConfidence === 'number' ? data.fireSmokeConfidence : 0.0,
          unauthorizedAccess: Boolean(data.unauthorizedAccess),
          detectedObjects: [
            { label: data.roomType || 'Analyzed Scene & Occupants', confidence: 0.98, box: [80, 40, 320, 220] }
          ],
          timestamp: new Date().toLocaleTimeString(),
          summary: data.summary || `Visual frame processed: ${data.peopleCount ?? 0} occupant(s) detected.`
        });
      } else {
        // Run refresh on active preset
        setDetectionResult({
          ...currentActiveFeed.mockResult as CVDetectionResult,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    } catch (err) {
      console.error('Inference error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Upload Custom Image handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setCustomImage(base64);
      // Automatically run AI inference on the newly uploaded image
      handleRunInference(base64);
    };
    reader.readAsDataURL(file);
  };

  // Sync to 3D Twin
  const handleSyncToDigitalTwin = () => {
    onSyncOccupancyToTwin(currentActiveFeed.targetRoomId, detectionResult.peopleCount);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070c] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Video className="w-3.5 h-3.5" />
            <span>NEURAL COMPUTER VISION & CCTV OCCUPANCY PIPELINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Computer Vision Analytics Lab</h1>
        </div>

        <button
          onClick={handleSyncToDigitalTwin}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Layers className="w-4 h-4" />
          <span>Sync CV Occupancy to 3D Digital Twin</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Video Feed Viewport */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Feed Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {cctvFeeds.map(feed => (
              <button
                key={feed.id}
                onClick={() => {
                  setSelectedFeed(feed.id);
                  setCustomImage(null);
                  setDetectionResult(feed.mockResult as CVDetectionResult);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  selectedFeed === feed.id && !customImage
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md'
                    : 'bg-[#0a0f1d] hover:bg-slate-800 text-slate-400 border border-white/5'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{feed.name}</span>
              </button>
            ))}

            {/* Upload Button */}
            <label className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#0a0f1d] hover:bg-slate-800 text-slate-300 border border-white/10 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upload Custom CCTV Frame</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Video Viewport Simulated Screen */}
          <div className="relative w-full aspect-video bg-[#080d18] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group">
            
            {/* Mock Camera Imagery or Custom Upload */}
            {customImage ? (
              <div className="w-full h-full relative flex items-center justify-center bg-black/80">
                <img src={customImage} alt="Uploaded CCTV" className="w-full h-full object-contain" />
                
                {/* Laser Scanning Animation when analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-bounce" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-4 py-2 bg-black/80 border border-cyan-400 text-cyan-300 font-mono text-xs rounded-xl shadow-xl flex items-center gap-2 backdrop-blur-md">
                        <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                        <span>AI Neural Vision Scanning Frame...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Real-time Status Overlay Badge */}
                {!isAnalyzing && (
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    {detectionResult.peopleCount === 0 ? (
                      <div className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-400 text-emerald-300 font-mono text-xs rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-md">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>VACANT ROOM • 0 OCCUPANTS DETECTED</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-mono text-xs rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-md">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span>{detectionResult.peopleCount} OCCUPANTS DETECTED</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full relative bg-gradient-to-tr from-[#070d1a] to-[#0f172a] flex items-center justify-center">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Graphical Representation of CCTV Scene */}
                <div className="text-center z-10 space-y-3">
                  <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400">
                    <Video className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">{currentActiveFeed.name}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{currentActiveFeed.cameraModel} • {currentActiveFeed.location}</div>
                  </div>
                </div>

                {/* Simulated Neural Bounding Boxes */}
                <div className="absolute top-1/4 left-1/5 w-24 h-44 border-2 border-emerald-400 bg-emerald-500/10 rounded-sm">
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-bold font-mono">
                    PERSON 96%
                  </span>
                </div>

                <div className="absolute top-1/3 left-2/5 w-24 h-40 border-2 border-emerald-400 bg-emerald-500/10 rounded-sm">
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-bold font-mono">
                    PERSON 94%
                  </span>
                </div>

                <div className="absolute top-1/5 right-1/4 w-36 h-56 border-2 border-cyan-400 bg-cyan-500/10 rounded-sm">
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 bg-cyan-500 text-slate-950 text-[9px] font-bold font-mono">
                    EQUIPMENT 99%
                  </span>
                </div>
              </div>
            )}

            {/* Video HUD Overlays */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/70 border border-white/10 rounded-md backdrop-blur-md text-[10px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>REC • 4K 60FPS</span>
              <span className="text-slate-600">|</span>
              <span>{detectionResult.timestamp}</span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => handleRunInference()}
                disabled={isAnalyzing}
                className="px-3 py-1.5 bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing Frame...' : 'Re-run CV Inference'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Neural Vision Analytics Breakdown */}
        <div className="space-y-4">
          
          {/* Key Metrics Card */}
          <div className="p-5 bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Edge Vision Inference Results
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#070c18] border border-white/5 rounded-xl">
                <div className="text-[10px] font-mono text-slate-400">OCCUPANTS</div>
                <div className="text-2xl font-black font-mono text-cyan-400 mt-1">
                  {detectionResult.peopleCount} <span className="text-xs text-slate-500 font-normal">Persons</span>
                </div>
              </div>

              <div className="p-3 bg-[#070c18] border border-white/5 rounded-xl">
                <div className="text-[10px] font-mono text-slate-400">ROOM OCCUPANCY</div>
                <div className={`text-2xl font-black font-mono mt-1 ${
                  detectionResult.occupancyPct > 80 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {detectionResult.occupancyPct}%
                </div>
              </div>
            </div>

            {/* Crowd Density & Fire Hazard Status */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 bg-[#070c18] rounded-xl flex items-center justify-between">
                <span className="text-slate-400">Crowd Density:</span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                  detectionResult.crowdDensity === 'Overcrowded' || detectionResult.crowdDensity === 'High'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {detectionResult.crowdDensity}
                </span>
              </div>

              <div className="p-2.5 bg-[#070c18] rounded-xl flex items-center justify-between">
                <span className="text-slate-400">Fire / Smoke Thermal Haze:</span>
                <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                  detectionResult.fireSmokeDetected
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {detectionResult.fireSmokeDetected ? 'HAZARD DETECTED' : 'CLEAR (0.01)'}
                </span>
              </div>

              <div className="p-2.5 bg-[#070c18] rounded-xl flex items-center justify-between">
                <span className="text-slate-400">Perimeter Access Control:</span>
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  AUTHORIZED
                </span>
              </div>
            </div>

            {/* Safety Violations */}
            {(detectionResult.safetyViolations || []).length > 0 && (
              <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Safety Compliance Alerts:</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300 pl-4 list-disc">
                  {(detectionResult.safetyViolations || []).map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Summary */}
            <div className="p-3 bg-[#080e1c] border border-white/5 rounded-xl text-xs text-slate-300">
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Scene Summary:</div>
              <p className="mt-1 leading-relaxed">{detectionResult.summary}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
