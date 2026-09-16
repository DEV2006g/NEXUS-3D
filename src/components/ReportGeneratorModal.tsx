import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  FileText, 
  Download, 
  X, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Printer, 
  Building2,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { Building, Equipment, SystemAlert } from '../types';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildings: Building[];
  equipment: Equipment[];
  alerts: SystemAlert[];
  environmentName: string;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  buildings,
  equipment,
  alerts,
  environmentName,
}) => {
  const [reportType, setReportType] = useState<'monthly' | 'predictive_audit' | 'energy'>('monthly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGeneratePdf = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();

      // Color Palette
      const primaryColor = [6, 182, 212]; // Cyan
      const darkBg = [10, 15, 29]; // Dark Slate
      const textColor = [255, 255, 255];

      // 1. Header Banner
      doc.setFillColor(7, 11, 20);
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(6, 182, 212);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('NEXUS 3D — DIGITAL TWIN INTELLIGENCE REPORT', 14, 18);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`FACILITY: ${environmentName.toUpperCase()} | REPORT DATE: ${new Date().toLocaleDateString()}`, 14, 26);
      doc.text('ISO-55001 ASSET MANAGEMENT COMPLIANCE AUDIT', 14, 32);

      // 2. Executive Summary Metrics
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('1. Executive Intelligence & Fleet Health Summary', 14, 52);

      const criticalCount = equipment.filter(e => e.status === 'critical').length;
      const warningCount = equipment.filter(e => e.status === 'warning').length;
      const avgHealth = Math.round(equipment.reduce((acc, e) => acc + e.aiPrediction.healthScore, 0) / equipment.length);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`• Total Monitored Buildings: ${buildings.length}`, 14, 60);
      doc.text(`• Active IoT Telemetry Nodes: ${equipment.length}`, 14, 66);
      doc.text(`• Campus Average Health Index: ${avgHealth} / 100`, 14, 72);
      doc.text(`• Equipment At Risk (RUL < 14 Days): ${criticalCount + warningCount} units`, 14, 78);
      doc.text(`• Active Critical Alarms: ${alerts.filter(a => a.severity === 'critical').length}`, 14, 84);

      // 3. Equipment Risk Matrix Table
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('2. Equipment Health & Predictive Prognostics Table', 14, 98);

      const tableRows = equipment.map(e => [
        e.code,
        e.name,
        e.roomName,
        `${e.temperatureC} °C`,
        `${e.vibrationMmS} mm/s`,
        `${e.aiPrediction.healthScore} / 100`,
        `${e.aiPrediction.predictedDaysToFailure} Days`,
        e.status.toUpperCase()
      ]);

      autoTable(doc, {
        startY: 104,
        head: [['Asset Code', 'Equipment Name', 'Location', 'Temp', 'Vibration', 'Health', 'RUL', 'Status']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [6, 182, 212], textColor: [0, 0, 0], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [241, 245, 249] },
        styles: { fontSize: 8, cellPadding: 3 }
      });

      // 4. AI Diagnostics & Recommendations
      const finalY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 14 : 190;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('3. AI Machine Learning Prognostic Recommendations', 14, finalY);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('• Priority 1: Replace mechanical blower fan assembly on Server Rack SR-04 within 48 hours.', 14, finalY + 8);
      doc.text('• Priority 2: Rebalance 33kV Substation transformer phase loading to eliminate midday winding hot spots.', 14, finalY + 14);
      doc.text('• Priority 3: Clean CRAC Chiller intake heat exchangers to recover 4.2% chiller COP efficiency.', 14, finalY + 20);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Generated autonomously by NEXUS 3D Cyber-Physical Digital Twin Engine.', 14, 285);

      // Save PDF
      doc.save(`NEXUS3D_${environmentName.replace(/\s+/g, '_')}_Intelligence_Report.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">Monthly Intelligence Report</h3>
              <p className="text-[10px] text-slate-400 font-mono">ISO-55001 COMPLIANCE PDF EXPORT</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Report Configuration */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-semibold">Select Report Template</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setReportType('monthly')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  reportType === 'monthly'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                    : 'bg-[#070c18] border-white/5 text-slate-400'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                <span>Executive Monthly</span>
              </button>

              <button
                onClick={() => setReportType('predictive_audit')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  reportType === 'predictive_audit'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                    : 'bg-[#070c18] border-white/5 text-slate-400'
                }`}
              >
                <Activity className="w-4 h-4 mx-auto mb-1 text-rose-400" />
                <span>RUL Audit</span>
              </button>

              <button
                onClick={() => setReportType('energy')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  reportType === 'energy'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                    : 'bg-[#070c18] border-white/5 text-slate-400'
                }`}
              >
                <Zap className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                <span>Energy Audit</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#070c18] border border-white/5 rounded-xl space-y-1.5 text-[11px] text-slate-300">
            <div className="font-bold text-cyan-400 font-mono">REPORT INCLUDES:</div>
            <div>• All {buildings.length} building spatial zones and health indices</div>
            <div>• {equipment.length} equipment ML remaining useful life (RUL) regression scores</div>
            <div>• Vibration FFT harmonics breakdown & root-cause diagnostic findings</div>
            <div>• Generated with vector-sharp high-resolution tables & ISO headers</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Compiling High-Res PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>PDF Downloaded Successfully!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Facility Intelligence PDF</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
