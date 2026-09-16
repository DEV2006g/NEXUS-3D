import { EnvironmentPreset } from '../types';

export const FACTORY_PRESET: EnvironmentPreset = {
  id: 'factory',
  title: 'Apex Robotics Industrial Manufacturing Plant',
  subtitle: 'Sector 7 Advanced Automated Production & CNC Fabrication Facility',
  description: 'Industrial digital twin monitoring 6-axis robotic cells, high-temperature heat treat ovens, and hydraulic press lines.',
  metrics: {
    overallHealth: 86,
    activeAlerts: 3,
    equipmentAtRisk: 2,
    totalEnergyMwh: 48.2,
    averageOccupancyPct: 62,
    predictedMaintenanceCount: 5,
    criticalEventsCount: 1,
  },
  buildings: [
    {
      id: 'b-factory-main',
      name: 'Main Assembly & Stamping Hall',
      code: 'PLANT-A-01',
      description: 'Continuous automotive chassis assembly line with automated welding cells.',
      type: 'Industrial Manufacturing',
      floorsCount: 2,
      totalAreaSqM: 18000,
      position: { x: 0, y: 0, z: 0 },
      dimensions: [22, 9, 14],
      color: '#ea580c',
      overallHealth: 86,
      totalPowerKw: 1420,
      occupancyCount: 85,
      maxCapacity: 150,
      status: 'warning',
      floors: [
        {
          id: 'fl-fac-0',
          buildingId: 'b-factory-main',
          level: 0,
          name: 'Heavy Robotics & Stamping Bay',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-cnc-bay',
              buildingId: 'b-factory-main',
              floorId: 'fl-fac-0',
              name: 'Precision 5-Axis CNC Milling Bay',
              code: 'CNC-BAY-01',
              areaSqM: 600,
              currentOccupancy: 12,
              maxCapacity: 20,
              targetTempC: 22.0,
              currentTempC: 26.5,
              airQualityAqi: 68,
              status: 'warning',
              equipmentIds: ['eq-cnc-spindle-01'],
              position: { x: -4, y: 1.5, z: -2 },
              dimensions: [8, 4, 6]
            }
          ]
        }
      ]
    }
  ],
  equipment: [
    {
      id: 'eq-cnc-spindle-01',
      name: 'DMG Mori 5-Axis CNC Spindle Motor (M-01)',
      code: 'CNC-DMG-01',
      category: 'conveyor_motor',
      buildingId: 'b-factory-main',
      floorId: 'fl-fac-0',
      roomId: 'rm-cnc-bay',
      roomName: 'Precision 5-Axis CNC Milling Bay',
      position: { x: -4.2, y: 1.5, z: -2.0 },
      operatingHours: 7800,
      installationDate: '2022-11-05',
      lastMaintenanceDate: '2025-08-14',
      nextScheduledMaintenance: '2026-05-10',
      status: 'warning',
      powerKw: 42.0,
      temperatureC: 68.4,
      vibrationMmS: 5.2,
      sensors: [
        {
          id: 'sns-cnc-vib',
          type: 'vibration',
          label: 'Spindle Radial Vibration',
          unit: 'mm/s',
          value: 5.2,
          baseline: 1.8,
          warningThreshold: 4.0,
          criticalThreshold: 6.0,
          status: 'warning',
          history: [
            { timestamp: '10:00', value: 2.1 },
            { timestamp: '10:15', value: 3.4 },
            { timestamp: '10:30', value: 4.8 },
            { timestamp: '10:45', value: 5.2 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 61,
        riskScore: 64,
        riskLevel: 'warning',
        predictedDaysToFailure: 8.5,
        failureProbabilityPct: 62.0,
        anomalyDetected: true,
        anomalyConfidence: 0.88,
        mlAlgorithm: 'XGBoost RUL',
        lastEvaluatedAt: 'Just now',
        rootCauses: ['High radial vibration harmonic (5.2 mm/s) on Main Spindle ceramic bearing'],
        recommendedAction: 'Order spindle bearing cartridge replacement and throttle RPM to 80% safe ceiling.'
      }
    }
  ],
  alerts: [
    {
      id: 'alt-fac-01',
      timestamp: '10:30:11',
      severity: 'warning',
      title: 'CNC Spindle M-01 Bearing Harmonic Anomaly',
      description: 'Radial vibration reached 5.2 mm/s. Predicted failure in 8.5 days.',
      equipmentId: 'eq-cnc-spindle-01',
      buildingId: 'b-factory-main',
      roomId: 'rm-cnc-bay',
      parameter: 'Radial Vibration',
      actualValue: '5.2 mm/s',
      thresholdValue: '4.0 mm/s',
      aiSuggestedAction: 'Limit spindle RPM to 12,000 max and schedule replacement.',
      acknowledged: false,
      resolved: false
    }
  ]
};

export const DATACENTER_PRESET: EnvironmentPreset = {
  id: 'datacenter',
  title: 'QuantumScale Tier-IV Hypercloud Data Center',
  subtitle: 'Zone Alpha • 24MW High Density AI & Cloud Compute Infrastructure',
  description: 'Mission-critical digital twin monitoring redundant N+2 UPS banks, liquid-to-air cooling CDU units, and ultra-dense server aisles.',
  metrics: {
    overallHealth: 95,
    activeAlerts: 2,
    equipmentAtRisk: 1,
    totalEnergyMwh: 182.4,
    averageOccupancyPct: 15,
    predictedMaintenanceCount: 3,
    criticalEventsCount: 0,
  },
  buildings: [
    {
      id: 'b-dc-hall-1',
      name: 'Compute Pod Hall 01 (Liquid Cooled)',
      code: 'DC-POD-01',
      description: 'Hyperscale server pod containing 64 high-density compute racks.',
      type: 'Data Center Facility',
      floorsCount: 2,
      totalAreaSqM: 12000,
      position: { x: 0, y: 0, z: 0 },
      dimensions: [20, 8, 16],
      color: '#2563eb',
      overallHealth: 95,
      totalPowerKw: 4800,
      occupancyCount: 6,
      maxCapacity: 25,
      status: 'normal',
      floors: [
        {
          id: 'fl-dc-0',
          buildingId: 'b-dc-hall-1',
          level: 0,
          name: 'Server Vault & Coolant Distribution Unit',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-dc-vault',
              buildingId: 'b-dc-hall-1',
              floorId: 'fl-dc-0',
              name: 'Cold Aisle Containment Row 3',
              code: 'ROW-03-NV',
              areaSqM: 450,
              currentOccupancy: 2,
              maxCapacity: 6,
              targetTempC: 18.0,
              currentTempC: 18.4,
              airQualityAqi: 12,
              status: 'normal',
              equipmentIds: ['eq-dc-cdu-01'],
              position: { x: 0, y: 1.5, z: 0 },
              dimensions: [10, 3.5, 8]
            }
          ]
        }
      ]
    }
  ],
  equipment: [
    {
      id: 'eq-dc-cdu-01',
      name: 'Liquid Coolant Distribution Unit CDU-03',
      code: 'CDU-POD-03',
      category: 'hvac_chiller',
      buildingId: 'b-dc-hall-1',
      floorId: 'fl-dc-0',
      roomId: 'rm-dc-vault',
      roomName: 'Cold Aisle Containment Row 3',
      position: { x: 0, y: 1.5, z: 0 },
      operatingHours: 9400,
      installationDate: '2023-01-20',
      lastMaintenanceDate: '2025-11-30',
      nextScheduledMaintenance: '2026-05-30',
      status: 'normal',
      powerKw: 24.0,
      temperatureC: 18.4,
      vibrationMmS: 0.9,
      sensors: [
        {
          id: 'sns-cdu-flow',
          type: 'temperature',
          label: 'Supply Loop Temp',
          unit: '°C',
          value: 18.4,
          baseline: 18.0,
          warningThreshold: 23.0,
          criticalThreshold: 27.0,
          status: 'normal',
          history: [
            { timestamp: '10:00', value: 18.2 },
            { timestamp: '10:15', value: 18.3 },
            { timestamp: '10:30', value: 18.4 },
            { timestamp: '10:45', value: 18.4 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 96,
        riskScore: 7,
        riskLevel: 'normal',
        predictedDaysToFailure: 210,
        failureProbabilityPct: 1.8,
        anomalyDetected: false,
        anomalyConfidence: 0.04,
        mlAlgorithm: 'Isolation Forest',
        lastEvaluatedAt: 'Just now',
        rootCauses: ['Nominal coolant pressure differential and flow velocity.'],
        recommendedAction: 'Continue nominal closed-loop monitoring.'
      }
    }
  ],
  alerts: [
    {
      id: 'alt-dc-01',
      timestamp: '09:12:00',
      severity: 'normal',
      title: 'UPS Bank Battery Automatic Self-Test Completed',
      description: 'Internal cell impedance within 99.8% optimal tolerance rating.',
      equipmentId: 'eq-dc-cdu-01',
      buildingId: 'b-dc-hall-1',
      roomId: 'rm-dc-vault',
      parameter: 'Impedance',
      actualValue: '1.02 mOhm',
      thresholdValue: '1.50 mOhm',
      aiSuggestedAction: 'No action required.',
      acknowledged: true,
      resolved: true
    }
  ]
};

export const factoryBuildings = FACTORY_PRESET.buildings;
export const factoryEquipment = FACTORY_PRESET.equipment;
export const dataCenterBuildings = DATACENTER_PRESET.buildings;
export const dataCenterEquipment = DATACENTER_PRESET.equipment;
