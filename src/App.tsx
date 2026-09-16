import React, { useState, useEffect, useCallback } from 'react';
import { 
  Building, 
  Equipment, 
  EnvironmentType, 
  UserRole, 
  SystemAlert, 
  TimelineEvent, 
  MaintenanceTicket 
} from './types';
import { 
  campusBuildings, 
  campusEquipment, 
  initialAlerts, 
  initialTimeline, 
  initialTickets 
} from './data/seedData';
import { 
  factoryBuildings, 
  factoryEquipment, 
  dataCenterBuildings, 
  dataCenterEquipment 
} from './data/extraPresets';

import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { CommandCenter } from './components/CommandCenter';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ComputerVisionLab } from './components/ComputerVisionLab';
import { MaintenanceHub } from './components/MaintenanceHub';
import { AiCopilotDrawer } from './components/AiCopilotDrawer';
import { ProjectVivaModal } from './components/ProjectVivaModal';
import { ReportGeneratorModal } from './components/ReportGeneratorModal';
import { AlertsCenterModal } from './components/AlertsCenterModal';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'landing' | 'command_center' | 'analytics' | 'cv_lab' | 'maintenance'>('landing');
  const [currentEnvironment, setCurrentEnvironment] = useState<EnvironmentType>('college');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Core Digital Twin State
  const [buildings, setBuildings] = useState<Building[]>(campusBuildings);
  const [equipment, setEquipment] = useState<Equipment[]>(campusEquipment);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedFloorLevel, setSelectedFloorLevel] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'standard' | 'thermal' | 'energy' | 'security'>('standard');

  // Dynamic Alarms & Events
  const [alerts, setAlerts] = useState<SystemAlert[]>(initialAlerts);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(initialTickets);

  // Simulation & Modals
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isVivaModalOpen, setIsVivaModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState<boolean>(false);

  // Gemini AI Diagnostic state
  const [isExplainingAi, setIsExplainingAi] = useState<boolean>(false);
  const [aiExplanationResult, setAiExplanationResult] = useState<any | null>(null);

  // Switch Environment Preset
  const handleEnvironmentChange = (env: EnvironmentType) => {
    setCurrentEnvironment(env);
    if (env === 'college') {
      setBuildings(campusBuildings);
      setEquipment(campusEquipment);
      setSelectedBuilding(null);
      setSelectedEquipment(campusEquipment[0]);
    } else if (env === 'factory') {
      setBuildings(factoryBuildings);
      setEquipment(factoryEquipment);
      setSelectedBuilding(null);
      setSelectedEquipment(factoryEquipment[0]);
    } else if (env === 'datacenter') {
      setBuildings(dataCenterBuildings);
      setEquipment(dataCenterEquipment);
      setSelectedBuilding(null);
      setSelectedEquipment(dataCenterEquipment[0]);
    }
  };

  // Real-Time IoT Telemetry Stream Simulator (Simulates live sensor ticks)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setEquipment(prevEquipment => 
        prevEquipment.map(eq => {
          // Small realistic random jitter
          const tempDelta = (Math.random() - 0.5) * 0.4;
          const vibeDelta = (Math.random() - 0.5) * 0.08;
          const powerDelta = (Math.random() - 0.5) * 0.6;

          const newTemp = Number(Math.max(15, eq.temperatureC + tempDelta).toFixed(1));
          const newVibe = Number(Math.max(0.1, eq.vibrationMmS + vibeDelta).toFixed(2));
          const newPower = Number(Math.max(1, eq.powerKw + powerDelta).toFixed(1));

          // Update sensor history
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const updatedSensors = eq.sensors.map(sensor => {
            const hist = sensor.history ? [...sensor.history.slice(1)] : [];
            let val = newTemp;
            if (sensor.type === 'vibration') val = newVibe;
            if (sensor.type === 'power') val = newPower;
            hist.push({ timestamp: nowStr, value: val });
            return {
              ...sensor,
              currentValue: val,
              history: hist
            };
          });

          return {
            ...eq,
            temperatureC: newTemp,
            vibrationMmS: newVibe,
            powerKw: newPower,
            sensors: updatedSensors
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Handle Viva Demo Scenario Anomaly Injection
  const handleInjectAnomaly = (scenario: 'server_thermal' | 'ai_fan_wear' | 'substation_surge' | 'reset_nominal') => {
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (scenario === 'server_thermal') {
      setEquipment(prev => prev.map(eq => {
        if (eq.id === 'eq-server-sr04' || eq.code === 'SR-04') {
          return {
            ...eq,
            status: 'critical',
            temperatureC: 78.6,
            vibrationMmS: 4.8,
            aiPrediction: {
              ...eq.aiPrediction,
              healthScore: 38,
              failureProbabilityPct: 87.4,
              predictedDaysToFailure: 3.2,
              rootCauses: [
                'Primary exhaust blower fan bearing friction harmonic (120 Hz peak)',
                'Intake airflow restriction / air filter dust saturation (>80%)',
                'Thermal gradient excursion exceeding ASHRAE TC9.9 class A1'
              ],
              recommendedAction: 'Immediate Fan Replacement & Airflow Filter Overhaul (SLA: 48 hrs)'
            }
          };
        }
        return eq;
      }));

      // Focus server rack
      const target = equipment.find(e => e.id === 'eq-server-sr04');
      if (target) setSelectedEquipment(target);

      // Add Alert & Timeline Event
      const newAlert: SystemAlert = {
        id: `alt-sr04-${Date.now()}`,
        equipmentId: 'eq-server-sr04',
        equipmentCode: 'SR-04',
        buildingId: 'bld-cs',
        severity: 'critical',
        title: 'Thermal & Vibration Surge on Server Blade SR-04',
        metricType: 'temperature',
        thresholdValue: '65.0 °C',
        actualValue: '78.6 °C',
        timestamp: timestampStr,
        acknowledged: false
      };

      setAlerts(prev => [newAlert, ...prev]);
      setTimeline(prev => [
        ...prev,
        {
          id: `evt-${Date.now()}`,
          timestamp: timestampStr,
          type: 'anomaly_detected',
          title: 'Critical thermal anomaly detected on Server Blade SR-04 (78.6°C)',
          severity: 'critical',
          equipmentId: 'eq-server-sr04'
        },
        {
          id: `evt-${Date.now() + 1}`,
          timestamp: timestampStr,
          type: 'risk_updated',
          title: 'ML Health score recalculated: 38/100 (RUL: 3.2 days)',
          severity: 'critical',
          equipmentId: 'eq-server-sr04'
        }
      ]);
    } else if (scenario === 'ai_fan_wear') {
      setEquipment(prev => prev.map(eq => {
        if (eq.id === 'eq-dgx-cluster' || eq.code === 'DGX-01') {
          return {
            ...eq,
            status: 'warning',
            temperatureC: 62.1,
            vibrationMmS: 2.8,
            aiPrediction: {
              ...eq.aiPrediction,
              healthScore: 71,
              failureProbabilityPct: 34.2,
              predictedDaysToFailure: 18.5,
              rootCauses: ['Secondary GPU fan bearing wear', 'Heavy PyTorch training job thermal load'],
              recommendedAction: 'Schedule routine fan lubrication at next maintenance window.'
            }
          };
        }
        return eq;
      }));
    } else if (scenario === 'reset_nominal') {
      // Reset all to nominal values
      setEquipment(campusEquipment);
      setAlerts([]);
      setTimeline(prev => [
        ...prev,
        {
          id: `evt-${Date.now()}`,
          timestamp: timestampStr,
          type: 'maintenance_scheduled',
          title: 'Operator reset facility telemetry to nominal benchmark.',
          severity: 'normal'
        }
      ]);
    }
  };

  // On-Demand Deep Gemini Diagnostics Trigger
  const handleExplainWithGemini = async (eq: Equipment) => {
    setIsExplainingAi(true);
    try {
      const res = await fetch('/api/gemini/explain-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipment: eq })
      });
      const data = await res.json();
      setAiExplanationResult(data);
    } catch (err) {
      console.error('Gemini explanation error:', err);
    } finally {
      setIsExplainingAi(false);
    }
  };

  // Alert Handlers
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
    setTimeline(prev => [
      ...prev,
      {
        id: `evt-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'maintenance_scheduled',
        title: `Operator acknowledged alert #${alertId}`,
        severity: 'normal'
      }
    ]);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // Maintenance Ticket Handlers
  const handleCreateMaintenanceTicket = (eq: Equipment) => {
    const newTicket: MaintenanceTicket = {
      id: `wo-${Date.now()}`,
      equipmentId: eq.id,
      equipmentName: eq.name,
      title: `Predictive Maintenance: ${eq.name} (${eq.code})`,
      description: `Dispatched following ${eq.aiPrediction.healthScore}/100 health score on ${eq.roomName}.`,
      priority: eq.status === 'critical' ? 'critical' : 'high',
      status: 'pending',
      assignedTo: 'Sarah Jenkins (Lead Tech)',
      createdAt: new Date().toLocaleDateString(),
      dueDate: 'Tomorrow, 17:00',
      estimatedCostUsd: 450,
      partsRequired: ['Blower Fan Assembly', 'Thermal Paste K-4'],
      aiDiagnosisNotes: eq.aiPrediction.recommendedAction
    };
    setTickets(prev => [newTicket, ...prev]);
    setActiveTab('maintenance');
  };

  const handleUpdateTicketStatus = (ticketId: string, status: MaintenanceTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  // Sync CV Occupancy to Twin
  const handleSyncOccupancyToTwin = (roomId: string, count: number) => {
    setEquipment(prev => prev.map(eq => {
      if (eq.roomId === roomId) {
        return {
          ...eq,
          occupancy: count
        };
      }
      return eq;
    }));
    setActiveTab('command_center');
  };

  // Calculated Metrics
  const overallHealth = equipment.length > 0 
    ? Math.round(equipment.reduce((acc, e) => acc + (e.aiPrediction?.healthScore || 85), 0) / equipment.length)
    : 90;
  const totalEnergyMwh = Number((buildings.reduce((acc, b) => acc + (b.totalPowerKw || 0), 0) * 0.024).toFixed(1));
  const activeAlertsCount = alerts.filter(a => !a.acknowledged).length;
  const criticalCount = equipment.filter(e => e.status === 'critical').length;
  const atRiskCount = equipment.filter(e => e.status === 'critical' || e.status === 'warning').length;

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Application Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentEnvironment={currentEnvironment}
        onEnvironmentChange={handleEnvironmentChange}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        alerts={alerts}
        onOpenAlerts={() => setIsAlertsModalOpen(true)}
        onOpenVivaModal={() => setIsVivaModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(prev => !prev)}
      />

      {/* Main View Router */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'landing' && (
          <ErrorBoundary fallbackTitle="NEXUS 3D Landing Showcase">
            <HeroLanding
              onLaunchDemo={() => setActiveTab('command_center')}
              onOpenVivaModal={() => setIsVivaModalOpen(true)}
              onSelectEnvironment={handleEnvironmentChange}
            />
          </ErrorBoundary>
        )}

        {activeTab === 'command_center' && (
          <ErrorBoundary fallbackTitle="3D Digital Twin Command Center">
            <CommandCenter
              buildings={buildings}
              equipment={equipment}
              alerts={alerts}
              timeline={timeline}
              selectedBuilding={selectedBuilding}
              selectedEquipment={selectedEquipment}
              selectedFloorLevel={selectedFloorLevel}
              viewMode={viewMode}
              currentRole={currentRole}
              onSelectBuilding={setSelectedBuilding}
              onSelectEquipment={setSelectedEquipment}
              onSelectFloor={setSelectedFloorLevel}
              onViewModeChange={setViewMode}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onResolveAlert={handleResolveAlert}
              onCreateMaintenanceTicket={handleCreateMaintenanceTicket}
              onInjectAnomaly={handleInjectAnomaly}
              onExplainRiskWithGemini={handleExplainWithGemini}
              isExplainingAi={isExplainingAi}
              aiExplanationResult={aiExplanationResult}
            />
          </ErrorBoundary>
        )}

        {activeTab === 'analytics' && (
          <ErrorBoundary fallbackTitle="Intelligence Analytics Dashboard">
            <AnalyticsDashboard
              buildings={buildings}
              equipment={equipment}
              alerts={alerts}
              metrics={{
                overallHealth: overallHealth,
                activeAlerts: alerts.length,
                equipmentAtRisk: atRiskCount,
                totalEnergyMwh: isNaN(totalEnergyMwh) ? 24.8 : totalEnergyMwh,
                averageOccupancyPct: 68,
                predictedMaintenanceCount: 4,
                criticalEventsCount: criticalCount
              }}
              onSelectEquipment={(eq) => {
                setSelectedEquipment(eq);
                setActiveTab('command_center');
              }}
              onNavigateToCommandCenter={() => setActiveTab('command_center')}
            />
          </ErrorBoundary>
        )}

        {activeTab === 'cv_lab' && (
          <ErrorBoundary fallbackTitle="Computer Vision & CCTV Lab">
            <ComputerVisionLab
              onSyncOccupancyToTwin={handleSyncOccupancyToTwin}
            />
          </ErrorBoundary>
        )}

        {activeTab === 'maintenance' && (
          <ErrorBoundary fallbackTitle="Predictive Maintenance Hub">
            <MaintenanceHub
              tickets={tickets}
              equipment={equipment}
              onUpdateTicketStatus={handleUpdateTicketStatus}
              onCreateTicket={(newT) => {
                const ticket: MaintenanceTicket = {
                  id: `wo-${Date.now()}`,
                  equipmentId: newT.equipmentId || equipment[0]?.id || 'eq-1',
                  equipmentName: newT.equipmentName || equipment[0]?.name || 'Equipment Node',
                  title: newT.title || 'Work Order',
                  description: newT.description || '',
                  priority: newT.priority || 'medium',
                  status: 'pending',
                  assignedTo: newT.assignedTo || 'Unassigned',
                  createdAt: new Date().toLocaleDateString(),
                  dueDate: newT.dueDate || 'Soon',
                  estimatedCostUsd: newT.estimatedCostUsd || 300,
                  partsRequired: newT.partsRequired || [],
                  aiDiagnosisNotes: newT.aiDiagnosisNotes || ''
                };
                setTickets(prev => [ticket, ...prev]);
              }}
              onSelectEquipmentFromTicket={(eqId) => {
                const target = equipment.find(e => e.id === eqId);
                if (target) {
                  setSelectedEquipment(target);
                  setActiveTab('command_center');
                }
              }}
            />
          </ErrorBoundary>
        )}
      </div>

      {/* Floating AI Operations Copilot Drawer */}
      <AiCopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        buildings={buildings}
        equipment={equipment}
        alerts={alerts}
        selectedEquipment={selectedEquipment}
      />

      {/* Final-Year Project Viva Defense & Slide Deck Modal */}
      <ProjectVivaModal
        isOpen={isVivaModalOpen}
        onClose={() => setIsVivaModalOpen(false)}
      />

      {/* Monthly Facility Intelligence PDF Generator Modal */}
      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        buildings={buildings}
        equipment={equipment}
        alerts={alerts}
        environmentName={
          currentEnvironment === 'college' 
            ? 'Smart University Campus Twin' 
            : currentEnvironment === 'factory' 
            ? 'Industrial Robotics Factory Twin' 
            : 'Tier-IV Hypercloud Data Center Twin'
        }
      />

      {/* Alerts Center Modal */}
      <AlertsCenterModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        alerts={alerts}
        onAcknowledgeAlert={handleAcknowledgeAlert}
        onResolveAlert={handleResolveAlert}
        onViewAlertIn3D={(alt) => {
          if (alt.equipmentId) {
            const target = equipment.find(e => e.id === alt.equipmentId);
            if (target) setSelectedEquipment(target);
          }
          setActiveTab('command_center');
        }}
      />

    </div>
  );
}
