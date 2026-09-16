export type EnvironmentType = 'college' | 'factory' | 'warehouse' | 'datacenter';

export type UserRole = 'admin' | 'facility_manager' | 'analyst' | 'viewer';

export type HealthStatus = 'normal' | 'warning' | 'critical';

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SensorReading {
  id: string;
  type: 'temperature' | 'vibration' | 'power' | 'humidity' | 'noise' | 'occupancy' | 'voltage' | 'aqi';
  label: string;
  unit: string;
  value: number;
  baseline: number;
  warningThreshold: number;
  criticalThreshold: number;
  status: HealthStatus;
  history: { timestamp: string; value: number }[];
}

export interface EquipmentAiPrediction {
  healthScore: number; // 0 - 100
  riskScore: number; // 0 - 100
  riskLevel: HealthStatus;
  predictedDaysToFailure: number;
  failureProbabilityPct: number;
  anomalyDetected: boolean;
  anomalyConfidence: number;
  rootCauses: string[];
  recommendedAction: string;
  mlAlgorithm: 'Random Forest Regressor' | 'Isolation Forest' | 'XGBoost RUL' | 'Autoencoder Anomaly';
  lastEvaluatedAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  code: string;
  category: 'server_rack' | 'hvac_chiller' | 'lab_instrument' | 'transformer' | 'ups_battery' | 'gpu_cluster' | 'robot_arm' | 'conveyor_motor' | 'ventilation';
  buildingId: string;
  floorId: string;
  roomId: string;
  roomName: string;
  position: Position3D;
  scale?: [number, number, number];
  operatingHours: number;
  installationDate: string;
  lastMaintenanceDate: string;
  nextScheduledMaintenance: string;
  sensors: SensorReading[];
  aiPrediction: EquipmentAiPrediction;
  status: HealthStatus;
  powerKw: number;
  temperatureC: number;
  vibrationMmS: number;
  notes?: string;
}

export interface Room {
  id: string;
  buildingId: string;
  floorId: string;
  name: string;
  code: string;
  areaSqM: number;
  currentOccupancy: number;
  maxCapacity: number;
  targetTempC: number;
  currentTempC: number;
  airQualityAqi: number;
  status: HealthStatus;
  equipmentIds: string[];
  cctvStreamId?: string;
  position: Position3D;
  dimensions: [number, number, number]; // width, height, depth
}

export interface Floor {
  id: string;
  buildingId: string;
  level: number;
  name: string;
  heightOffset: number;
  rooms: Room[];
}

export interface Building {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  floorsCount: number;
  totalAreaSqM: number;
  position: Position3D;
  dimensions: [number, number, number];
  color: string;
  floors: Floor[];
  overallHealth: number;
  totalPowerKw: number;
  occupancyCount: number;
  maxCapacity: number;
  status: HealthStatus;
}

export interface SystemAlert {
  id: string;
  timestamp: string;
  severity: HealthStatus;
  title: string;
  description?: string;
  equipmentId?: string;
  equipmentCode?: string;
  buildingId?: string;
  roomId?: string;
  parameter?: string;
  metricType?: string;
  actualValue: string;
  thresholdValue: string;
  aiSuggestedAction?: string;
  acknowledged: boolean;
  resolved?: boolean;
  actionTaken?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'anomaly' | 'ml_update' | 'risk_elevation' | 'maintenance_rec' | 'operator_action' | 'system_restore' | 'anomaly_detected' | 'risk_updated' | 'maintenance_scheduled';
  title: string;
  details?: string;
  equipmentId?: string;
  equipmentName?: string;
  severity: HealthStatus;
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  equipmentId: string;
  equipmentName: string;
  buildingName?: string;
  roomName?: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  reportedAt?: string;
  createdAt?: string;
  dueAt?: string;
  dueDate?: string;
  assignedTo: string;
  aiDiagnosis?: string;
  aiDiagnosisNotes?: string;
  partsRequired: string[];
  estimatedCostUsd: number;
}

export interface CVDetectionResult {
  peopleCount: number;
  occupancyPct: number;
  crowdDensity: 'Low' | 'Moderate' | 'High' | 'Overcrowded';
  safetyViolations: string[];
  fireSmokeDetected: boolean;
  fireSmokeConfidence: number;
  unauthorizedAccess: boolean;
  detectedObjects: {
    label: string;
    confidence: number;
    box: [number, number, number, number]; // x, y, width, height normalized
  }[];
  timestamp: string;
  summary: string;
}

export interface EnvironmentPreset {
  id: EnvironmentType;
  title: string;
  subtitle: string;
  description: string;
  buildings: Building[];
  equipment: Equipment[];
  alerts: SystemAlert[];
  timeline?: TimelineEvent[];
  maintenanceTickets?: MaintenanceTicket[];
  metrics: {
    overallHealth: number;
    activeAlerts: number;
    equipmentAtRisk: number;
    totalEnergyMwh: number;
    averageOccupancyPct: number;
    predictedMaintenanceCount: number;
    criticalEventsCount: number;
  };
}

export interface VivaDossier {
  abstract: string;
  problemStatement: string;
  existingSystemGaps: string[];
  proposedArchitecture: string[];
  mlMethodology: {
    title: string;
    description: string;
    formula: string;
    features: string[];
    metrics: string[];
  }[];
  erEntities: {
    name: string;
    keys: string[];
    attributes: string[];
    relations: string;
  }[];
  businessModel: {
    tier: string;
    price: string;
    target: string;
    features: string[];
  }[];
}
