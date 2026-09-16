import { EnvironmentPreset, VivaDossier } from '../types';

export const COLLEGE_CAMPUS_PRESET: EnvironmentPreset = {
  id: 'college',
  title: 'Smart University Campus (NEXUS Twin)',
  subtitle: 'Metro State Institute of Technology • 120-Acre Smart Digital Facility',
  description: 'Full-fidelity 3D digital twin tracking 14 buildings, 48 smart laboratories, supercomputing clusters, HVAC grids, and occupancy analytics.',
  metrics: {
    overallHealth: 91,
    activeAlerts: 4,
    equipmentAtRisk: 3,
    totalEnergyMwh: 14.6,
    averageOccupancyPct: 74,
    predictedMaintenanceCount: 7,
    criticalEventsCount: 1,
  },
  buildings: [
    {
      id: 'b-cs-tech',
      name: 'Computer Science & AI Block',
      code: 'CS-ENG-01',
      description: 'Houses Advanced Machine Learning Labs, Data Science Sandbox, and Core Campus Supercomputer.',
      type: 'Academic & Research',
      floorsCount: 4,
      totalAreaSqM: 8500,
      position: { x: -8, y: 0, z: -6 },
      dimensions: [12, 10, 10],
      color: '#0284c7',
      overallHealth: 84,
      totalPowerKw: 410,
      occupancyCount: 380,
      maxCapacity: 500,
      status: 'warning',
      floors: [
        {
          id: 'fl-cs-0',
          buildingId: 'b-cs-tech',
          level: 0,
          name: 'Ground Floor - Supercomputing & Power',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-server-room',
              buildingId: 'b-cs-tech',
              floorId: 'fl-cs-0',
              name: 'Central Server Room & HPC Hub',
              code: 'SR-04',
              areaSqM: 220,
              currentOccupancy: 3,
              maxCapacity: 8,
              targetTempC: 19.5,
              currentTempC: 28.4,
              airQualityAqi: 22,
              status: 'critical',
              equipmentIds: ['eq-sr-rack-04', 'eq-sr-crac-01', 'eq-sr-ups-02'],
              cctvStreamId: 'cctv-srv-01',
              position: { x: -8, y: 1.2, z: -7 },
              dimensions: [5, 2.5, 4],
            },
            {
              id: 'rm-electrical-room',
              buildingId: 'b-cs-tech',
              floorId: 'fl-cs-0',
              name: 'Electrical Distribution Sub-Room',
              code: 'EL-01',
              areaSqM: 140,
              currentOccupancy: 1,
              maxCapacity: 5,
              targetTempC: 22.0,
              currentTempC: 24.1,
              airQualityAqi: 35,
              status: 'normal',
              equipmentIds: ['eq-transformer-01'],
              position: { x: -11, y: 1.2, z: -5 },
              dimensions: [4, 2.5, 3],
            }
          ]
        },
        {
          id: 'fl-cs-1',
          buildingId: 'b-cs-tech',
          level: 1,
          name: '1st Floor - AI/ML Advanced Laboratory',
          heightOffset: 2.8,
          rooms: [
            {
              id: 'rm-aiml-lab',
              buildingId: 'b-cs-tech',
              floorId: 'fl-cs-1',
              name: 'AI & Neural Computing Laboratory',
              code: 'LAB-AI-201',
              areaSqM: 320,
              currentOccupancy: 34,
              maxCapacity: 40,
              targetTempC: 21.0,
              currentTempC: 23.8,
              airQualityAqi: 42,
              status: 'warning',
              equipmentIds: ['eq-gpu-cluster-01', 'eq-hvac-cs-02'],
              cctvStreamId: 'cctv-aiml-02',
              position: { x: -8, y: 3.8, z: -6 },
              dimensions: [6, 2.5, 5],
            }
          ]
        },
        {
          id: 'fl-cs-2',
          buildingId: 'b-cs-tech',
          level: 2,
          name: '2nd Floor - Software & Cloud Systems Lab',
          heightOffset: 5.6,
          rooms: [
            {
              id: 'rm-cs-lab-202',
              buildingId: 'b-cs-tech',
              floorId: 'fl-cs-2',
              name: 'Computer Laboratory Alpha',
              code: 'LAB-CS-302',
              areaSqM: 280,
              currentOccupancy: 48,
              maxCapacity: 50,
              targetTempC: 22.0,
              currentTempC: 23.1,
              airQualityAqi: 50,
              status: 'normal',
              equipmentIds: ['eq-lab-pc-bank'],
              position: { x: -8, y: 6.6, z: -6 },
              dimensions: [6, 2.5, 5],
            }
          ]
        }
      ]
    },
    {
      id: 'b-main-complex',
      name: 'Main Academic Complex & Senate',
      code: 'ADM-MAIN-00',
      description: 'Administrative Headquarters, Chancellor Offices, Smart Auditoriums, and Executive Classrooms.',
      type: 'Administration & Lecture Complex',
      floorsCount: 5,
      totalAreaSqM: 14200,
      position: { x: 4, y: 0, z: -4 },
      dimensions: [15, 12, 12],
      color: '#4f46e5',
      overallHealth: 94,
      totalPowerKw: 310,
      occupancyCount: 620,
      maxCapacity: 850,
      status: 'normal',
      floors: [
        {
          id: 'fl-main-1',
          buildingId: 'b-main-complex',
          level: 1,
          name: 'Grand Lecture Hall & Atrium',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-grand-auditorium',
              buildingId: 'b-main-complex',
              floorId: 'fl-main-1',
              name: 'Central Smart Auditorium',
              code: 'AUD-CENTRAL',
              areaSqM: 650,
              currentOccupancy: 240,
              maxCapacity: 350,
              targetTempC: 22.0,
              currentTempC: 22.4,
              airQualityAqi: 28,
              status: 'normal',
              equipmentIds: ['eq-aud-hvac-main'],
              position: { x: 4, y: 1.5, z: -4 },
              dimensions: [10, 4, 8],
            }
          ]
        }
      ]
    },
    {
      id: 'b-library-hub',
      name: 'Central Knowledge & Media Library',
      code: 'LIB-CENTRAL-03',
      description: 'Multi-tier digital archive, student collaborative pods, and high-density study chambers.',
      type: 'Learning Resource Center',
      floorsCount: 3,
      totalAreaSqM: 6800,
      position: { x: 14, y: 0, z: 6 },
      dimensions: [11, 8, 9],
      color: '#0d9488',
      overallHealth: 96,
      totalPowerKw: 140,
      occupancyCount: 290,
      maxCapacity: 400,
      status: 'normal',
      floors: [
        {
          id: 'fl-lib-0',
          buildingId: 'b-library-hub',
          level: 0,
          name: 'Collaborative Reading Commons',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-lib-commons',
              buildingId: 'b-library-hub',
              floorId: 'fl-lib-0',
              name: 'Silent Research Wing',
              code: 'LIB-RW-101',
              areaSqM: 400,
              currentOccupancy: 85,
              maxCapacity: 120,
              targetTempC: 21.5,
              currentTempC: 21.8,
              airQualityAqi: 18,
              status: 'normal',
              equipmentIds: ['eq-lib-air-purifier'],
              position: { x: 14, y: 1.2, z: 6 },
              dimensions: [8, 3, 7],
            }
          ]
        }
      ]
    },
    {
      id: 'b-substation-grid',
      name: 'Campus Primary Substation & Solar Array',
      code: 'PWR-GRID-09',
      description: '33kV Primary Step-down Transformer Bank, Microgrid Inverter Matrix, and 1.2 MW Rooftop Solar Array.',
      type: 'Infrastructure & Utilities',
      floorsCount: 1,
      totalAreaSqM: 2500,
      position: { x: -14, y: 0, z: 8 },
      dimensions: [9, 5, 8],
      color: '#eab308',
      overallHealth: 88,
      totalPowerKw: 880,
      occupancyCount: 4,
      maxCapacity: 12,
      status: 'warning',
      floors: [
        {
          id: 'fl-pwr-0',
          buildingId: 'b-substation-grid',
          level: 0,
          name: 'Transformer Yard & Battery Bank',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-main-transformer',
              buildingId: 'b-substation-grid',
              floorId: 'fl-pwr-0',
              name: 'High Voltage Step-down Cell A',
              code: 'TX-HV-33K',
              areaSqM: 180,
              currentOccupancy: 2,
              maxCapacity: 4,
              targetTempC: 45.0,
              currentTempC: 58.2,
              airQualityAqi: 40,
              status: 'warning',
              equipmentIds: ['eq-transformer-33k'],
              position: { x: -14, y: 1.0, z: 8 },
              dimensions: [6, 3, 5],
            }
          ]
        }
      ]
    },
    {
      id: 'b-robotics-annex',
      name: 'Robotics & Mechatronics Prototyping Wing',
      code: 'ENG-ROBO-07',
      description: 'Industrial 6-DOF Robotic Arms, Autonomous Mobile Robot charging tracks, and Rapid Prototyping CNC cells.',
      type: 'Engineering Workshop',
      floorsCount: 2,
      totalAreaSqM: 4200,
      position: { x: 2, y: 0, z: 12 },
      dimensions: [10, 7, 8],
      color: '#8b5cf6',
      overallHealth: 92,
      totalPowerKw: 220,
      occupancyCount: 45,
      maxCapacity: 80,
      status: 'normal',
      floors: [
        {
          id: 'fl-robo-0',
          buildingId: 'b-robotics-annex',
          level: 0,
          name: 'Robotic Fabrication Bay',
          heightOffset: 0,
          rooms: [
            {
              id: 'rm-robo-bay',
              buildingId: 'b-robotics-annex',
              floorId: 'fl-robo-0',
              name: 'Robotic Automation Cell 1',
              code: 'CELL-ROBO-A',
              areaSqM: 260,
              currentOccupancy: 12,
              maxCapacity: 25,
              targetTempC: 23.0,
              currentTempC: 24.2,
              airQualityAqi: 45,
              status: 'normal',
              equipmentIds: ['eq-robot-arm-kuka'],
              position: { x: 2, y: 1.2, z: 12 },
              dimensions: [7, 3, 6],
            }
          ]
        }
      ]
    }
  ],
  equipment: [
    {
      id: 'eq-sr-rack-04',
      name: 'Supercomputing Blade Rack SR-04 (HPC Alpha)',
      code: 'SR-04-HPC',
      category: 'server_rack',
      buildingId: 'b-cs-tech',
      floorId: 'fl-cs-0',
      roomId: 'rm-server-room',
      roomName: 'Central Server Room & HPC Hub',
      position: { x: -8.5, y: 1.2, z: -7.5 },
      operatingHours: 6420,
      installationDate: '2023-04-12',
      lastMaintenanceDate: '2025-11-20',
      nextScheduledMaintenance: '2026-09-15',
      status: 'critical',
      powerKw: 38.4,
      temperatureC: 78.6,
      vibrationMmS: 4.8,
      notes: 'High-density computational node running campus neural network jobs and LMS portal.',
      sensors: [
        {
          id: 'sns-sr04-temp',
          type: 'temperature',
          label: 'Core Exhaust Temperature',
          unit: '°C',
          value: 78.6,
          baseline: 42.0,
          warningThreshold: 65.0,
          criticalThreshold: 75.0,
          status: 'critical',
          history: [
            { timestamp: '10:00', value: 44.2 },
            { timestamp: '10:15', value: 49.8 },
            { timestamp: '10:30', value: 58.4 },
            { timestamp: '10:40', value: 68.2 },
            { timestamp: '10:45', value: 78.6 }
          ]
        },
        {
          id: 'sns-sr04-vib',
          type: 'vibration',
          label: 'Cooling Fan RPM Vibration',
          unit: 'mm/s',
          value: 4.8,
          baseline: 1.2,
          warningThreshold: 3.0,
          criticalThreshold: 4.5,
          status: 'critical',
          history: [
            { timestamp: '10:00', value: 1.3 },
            { timestamp: '10:15', value: 1.8 },
            { timestamp: '10:30', value: 2.9 },
            { timestamp: '10:40', value: 4.1 },
            { timestamp: '10:45', value: 4.8 }
          ]
        },
        {
          id: 'sns-sr04-pwr',
          type: 'power',
          label: 'Total Power Draw',
          unit: 'kW',
          value: 38.4,
          baseline: 24.0,
          warningThreshold: 32.0,
          criticalThreshold: 40.0,
          status: 'warning',
          history: [
            { timestamp: '10:00', value: 24.5 },
            { timestamp: '10:15', value: 27.2 },
            { timestamp: '10:30', value: 31.8 },
            { timestamp: '10:40', value: 36.5 },
            { timestamp: '10:45', value: 38.4 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 38,
        riskScore: 89,
        riskLevel: 'critical',
        predictedDaysToFailure: 3.2,
        failureProbabilityPct: 87.4,
        anomalyDetected: true,
        anomalyConfidence: 0.96,
        mlAlgorithm: 'XGBoost RUL',
        lastEvaluatedAt: 'Just now',
        rootCauses: [
          'Core exhaust temperature exceeded 75°C critical threshold (+87% over 42°C baseline)',
          'High frequency vibration harmonics indicating primary dual-bearing bearing degradation in Blower Fan #3',
          'Thermal throttling detected on Compute Blades 4 through 7',
          'Current cumulative run time: 6,420 operating hours without thermal paste overhaul'
        ],
        recommendedAction: 'Schedule urgent preventive maintenance within 24 hours. Dispatch technician to replace Fan Blower #3 and re-route HPC workloads to Node Cluster B.'
      }
    },
    {
      id: 'eq-gpu-cluster-01',
      name: 'NVIDIA DGX H100 AI Lab Cluster',
      code: 'DGX-AI-01',
      category: 'gpu_cluster',
      buildingId: 'b-cs-tech',
      floorId: 'fl-cs-1',
      roomId: 'rm-aiml-lab',
      roomName: 'AI & Neural Computing Laboratory',
      position: { x: -8, y: 3.8, z: -5.8 },
      operatingHours: 3200,
      installationDate: '2024-01-15',
      lastMaintenanceDate: '2026-01-10',
      nextScheduledMaintenance: '2026-07-15',
      status: 'warning',
      powerKw: 16.2,
      temperatureC: 62.1,
      vibrationMmS: 2.1,
      notes: 'Dedicated 8x SXM5 GPU system serving undergraduate and master thesis deep learning experiments.',
      sensors: [
        {
          id: 'sns-gpu01-temp',
          type: 'temperature',
          label: 'GPU Die Temperature Mean',
          unit: '°C',
          value: 62.1,
          baseline: 48.0,
          warningThreshold: 60.0,
          criticalThreshold: 80.0,
          status: 'warning',
          history: [
            { timestamp: '10:00', value: 49.0 },
            { timestamp: '10:15', value: 54.2 },
            { timestamp: '10:30', value: 58.7 },
            { timestamp: '10:45', value: 62.1 }
          ]
        },
        {
          id: 'sns-gpu01-pwr',
          type: 'power',
          label: 'Power Draw (8x GPUs)',
          unit: 'kW',
          value: 16.2,
          baseline: 10.5,
          warningThreshold: 15.0,
          criticalThreshold: 19.0,
          status: 'warning',
          history: [
            { timestamp: '10:00', value: 11.0 },
            { timestamp: '10:15', value: 13.8 },
            { timestamp: '10:30', value: 15.4 },
            { timestamp: '10:45', value: 16.2 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 71,
        riskScore: 48,
        riskLevel: 'warning',
        predictedDaysToFailure: 14.5,
        failureProbabilityPct: 39.8,
        anomalyDetected: true,
        anomalyConfidence: 0.81,
        mlAlgorithm: 'Random Forest Regressor',
        lastEvaluatedAt: 'Just now',
        rootCauses: [
          'High sustained GPU workload over 6 hours continuously',
          'Ambient laboratory room temperature elevated to 23.8°C (+2.8°C above target setpoint)',
          'Minor thermal delta between GPU 2 and GPU 7 indicating uneven airflow intake'
        ],
        recommendedAction: 'Lower laboratory AC setpoint by 2°C and inspect front dust mesh intake filters.'
      }
    },
    {
      id: 'eq-sr-crac-01',
      name: 'Computer Room Air Conditioner (CRAC Alpha)',
      code: 'HVAC-CRAC-01',
      category: 'hvac_chiller',
      buildingId: 'b-cs-tech',
      floorId: 'fl-cs-0',
      roomId: 'rm-server-room',
      roomName: 'Central Server Room & HPC Hub',
      position: { x: -6.2, y: 1.2, z: -6.5 },
      operatingHours: 11200,
      installationDate: '2022-08-01',
      lastMaintenanceDate: '2025-10-14',
      nextScheduledMaintenance: '2026-04-14',
      status: 'warning',
      powerKw: 18.5,
      temperatureC: 19.8,
      vibrationMmS: 3.6,
      sensors: [
        {
          id: 'sns-crac01-vib',
          type: 'vibration',
          label: 'Compressor Vibration',
          unit: 'mm/s',
          value: 3.6,
          baseline: 1.5,
          warningThreshold: 3.2,
          criticalThreshold: 5.0,
          status: 'warning',
          history: [
            { timestamp: '10:00', value: 1.8 },
            { timestamp: '10:15', value: 2.2 },
            { timestamp: '10:30', value: 3.1 },
            { timestamp: '10:45', value: 3.6 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 68,
        riskScore: 52,
        riskLevel: 'warning',
        predictedDaysToFailure: 18.0,
        failureProbabilityPct: 44.0,
        anomalyDetected: true,
        anomalyConfidence: 0.79,
        mlAlgorithm: 'Isolation Forest',
        lastEvaluatedAt: 'Just now',
        rootCauses: [
          'Compressor vibration anomaly detected at 3.6 mm/s (+140% baseline)',
          'Refrigerant head pressure cycle showing minor oscillation'
        ],
        recommendedAction: 'Check refrigerant pressure and calibrate compressor damper pads.'
      }
    },
    {
      id: 'eq-transformer-33k',
      name: 'Primary 33kV/415V 2000kVA Step-down Transformer',
      code: 'TX-MAIN-01',
      category: 'transformer',
      buildingId: 'b-substation-grid',
      floorId: 'fl-pwr-0',
      roomId: 'rm-main-transformer',
      roomName: 'High Voltage Step-down Cell A',
      position: { x: -14.2, y: 1.0, z: 8.0 },
      operatingHours: 18400,
      installationDate: '2021-03-10',
      lastMaintenanceDate: '2025-12-05',
      nextScheduledMaintenance: '2026-06-05',
      status: 'warning',
      powerKw: 680,
      temperatureC: 58.2,
      vibrationMmS: 2.4,
      sensors: [
        {
          id: 'sns-tx-temp',
          type: 'temperature',
          label: 'Winding Oil Temperature',
          unit: '°C',
          value: 58.2,
          baseline: 42.0,
          warningThreshold: 55.0,
          criticalThreshold: 70.0,
          status: 'warning',
          history: [
            { timestamp: '10:00', value: 43.1 },
            { timestamp: '10:15', value: 48.0 },
            { timestamp: '10:30', value: 53.5 },
            { timestamp: '10:45', value: 58.2 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 74,
        riskScore: 42,
        riskLevel: 'warning',
        predictedDaysToFailure: 26.0,
        failureProbabilityPct: 31.0,
        anomalyDetected: true,
        anomalyConfidence: 0.74,
        mlAlgorithm: 'Random Forest Regressor',
        lastEvaluatedAt: 'Just now',
        rootCauses: [
          'High campus HVAC peak summer load drawing 680 kW',
          'Oil temp at 58.2°C approaching safety limit'
        ],
        recommendedAction: 'Engage forced-air cooling blowers on transformer radiator fins.'
      }
    },
    {
      id: 'eq-robot-arm-kuka',
      name: 'KUKA KR-10 6-Axis Industrial Robotics Cell',
      code: 'ROBO-KR10-A',
      category: 'robot_arm',
      buildingId: 'b-robotics-annex',
      floorId: 'fl-robo-0',
      roomId: 'rm-robo-bay',
      roomName: 'Robotic Automation Cell 1',
      position: { x: 2.2, y: 1.2, z: 12.1 },
      operatingHours: 2450,
      installationDate: '2024-06-20',
      lastMaintenanceDate: '2026-01-28',
      nextScheduledMaintenance: '2026-08-01',
      status: 'normal',
      powerKw: 4.8,
      temperatureC: 34.5,
      vibrationMmS: 0.8,
      sensors: [
        {
          id: 'sns-robo-vib',
          type: 'vibration',
          label: 'Joint 3 Harmonic Drive Vibration',
          unit: 'mm/s',
          value: 0.8,
          baseline: 0.7,
          warningThreshold: 2.0,
          criticalThreshold: 3.5,
          status: 'normal',
          history: [
            { timestamp: '10:00', value: 0.7 },
            { timestamp: '10:15', value: 0.75 },
            { timestamp: '10:30', value: 0.8 },
            { timestamp: '10:45', value: 0.8 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 97,
        riskScore: 6,
        riskLevel: 'normal',
        predictedDaysToFailure: 180,
        failureProbabilityPct: 2.1,
        anomalyDetected: false,
        anomalyConfidence: 0.05,
        mlAlgorithm: 'Autoencoder Anomaly',
        lastEvaluatedAt: 'Just now',
        rootCauses: ['Operating well within nominal envelope across all 6 kinematic axes.'],
        recommendedAction: 'Routine visual inspection at next 250-hour interval.'
      }
    },
    {
      id: 'eq-aud-hvac-main',
      name: 'Auditorium Central Variable Refrigerant Flow Unit',
      code: 'HVAC-AUD-VRF',
      category: 'hvac_chiller',
      buildingId: 'b-main-complex',
      floorId: 'fl-main-1',
      roomId: 'rm-grand-auditorium',
      roomName: 'Central Smart Auditorium',
      position: { x: 4.5, y: 1.5, z: -3.8 },
      operatingHours: 4900,
      installationDate: '2023-09-10',
      lastMaintenanceDate: '2025-11-18',
      nextScheduledMaintenance: '2026-05-18',
      status: 'normal',
      powerKw: 14.2,
      temperatureC: 21.4,
      vibrationMmS: 1.1,
      sensors: [
        {
          id: 'sns-aud-hvac-temp',
          type: 'temperature',
          label: 'Duct Supply Air Temp',
          unit: '°C',
          value: 18.2,
          baseline: 18.0,
          warningThreshold: 24.0,
          criticalThreshold: 28.0,
          status: 'normal',
          history: [
            { timestamp: '10:00', value: 18.1 },
            { timestamp: '10:15', value: 18.3 },
            { timestamp: '10:30', value: 18.2 },
            { timestamp: '10:45', value: 18.2 }
          ]
        }
      ],
      aiPrediction: {
        healthScore: 94,
        riskScore: 9,
        riskLevel: 'normal',
        predictedDaysToFailure: 140,
        failureProbabilityPct: 4.5,
        anomalyDetected: false,
        anomalyConfidence: 0.08,
        mlAlgorithm: 'Random Forest Regressor',
        lastEvaluatedAt: 'Just now',
        rootCauses: ['Nominal thermodynamic cycle and COP efficiency index.'],
        recommendedAction: 'Standard filter cleaning scheduled for May 2026.'
      }
    }
  ],
  alerts: [
    {
      id: 'alt-001',
      timestamp: '10:42:15',
      severity: 'critical',
      title: 'HPC Server Rack SR-04 Thermal & Vibration Anomaly',
      description: 'Core exhaust temperature spiked to 78.6°C (+87% over baseline). Predictive model forecasts failure within 3.2 days.',
      equipmentId: 'eq-sr-rack-04',
      buildingId: 'b-cs-tech',
      roomId: 'rm-server-room',
      parameter: 'Exhaust Temperature / Vibration',
      actualValue: '78.6°C / 4.8 mm/s',
      thresholdValue: '65.0°C / 3.0 mm/s',
      aiSuggestedAction: 'Dispatch maintenance engineer immediately. Rebalance HPC jobs to Secondary Node Rack.',
      acknowledged: false,
      resolved: false
    },
    {
      id: 'alt-002',
      timestamp: '10:38:00',
      severity: 'warning',
      title: 'DGX H100 AI Cluster Thermal Load Elevated',
      description: 'Continuous 100% compute load causing GPU die temps to reach 62.1°C with ambient room rise.',
      equipmentId: 'eq-gpu-cluster-01',
      buildingId: 'b-cs-tech',
      roomId: 'rm-aiml-lab',
      parameter: 'Die Temperature',
      actualValue: '62.1°C',
      thresholdValue: '60.0°C',
      aiSuggestedAction: 'Increase room air flow and lower AHU setpoint by 2°C.',
      acknowledged: true,
      resolved: false
    },
    {
      id: 'alt-003',
      timestamp: '10:15:40',
      severity: 'warning',
      title: 'CRAC Alpha Compressor Vibration Harmonics',
      description: 'Vibration pattern indicates potential bearing wear in auxiliary fan blower.',
      equipmentId: 'eq-sr-crac-01',
      buildingId: 'b-cs-tech',
      roomId: 'rm-server-room',
      parameter: 'Vibration',
      actualValue: '3.6 mm/s',
      thresholdValue: '3.2 mm/s',
      aiSuggestedAction: 'Inspect damper mounts during next scheduled downtime.',
      acknowledged: true,
      resolved: false
    },
    {
      id: 'alt-004',
      timestamp: '09:50:22',
      severity: 'warning',
      title: 'Primary Substation Transformer Temp Rise',
      description: 'Winding oil temp reached 58.2°C during campus midday power peak.',
      equipmentId: 'eq-transformer-33k',
      buildingId: 'b-substation-grid',
      roomId: 'rm-main-transformer',
      parameter: 'Oil Temp',
      actualValue: '58.2°C',
      thresholdValue: '55.0°C',
      aiSuggestedAction: 'Enable secondary radiator booster fan array.',
      acknowledged: false,
      resolved: false
    }
  ]
};

export const VIVA_PROJECT_DOSSIER: VivaDossier = {
  abstract: `NEXUS 3D is an AI-powered enterprise Digital Twin and Predictive Maintenance Cyber-Physical platform designed to digitally represent, simulate, monitor, and prognose complex physical environments. By marrying WebGL/Three.js spatial digital models with multi-sensor IoT telemetry streams and statistical machine learning (Random Forest, Isolation Forest, XGBoost Remaining Useful Life models), NEXUS 3D bridges the gap between raw sensor graphs and actionable spatial intelligence. The platform features role-based telemetry dashboards, real-time 3D camera refocusing on physical anomalies, automated root-cause explanations with Gemini LLM integration, a Computer Vision edge analytics pipeline, and automated ISO-55000 facility compliance reporting.`,
  problemStatement: `Modern campus and enterprise facility management suffers from fragmented systems: BMS (Building Management Systems), SCADA telemetry, CCTV feeds, and maintenance ticketing exist in disconnected silos. Facility operators struggle to pinpoint the physical location of sensor alarms, lack predictive prognosis for machinery failure (resulting in costly unplanned downtime), and cannot visually correlate environmental parameters with spatial occupancy.`,
  existingSystemGaps: [
    'Static 2D SCADA schematics with no intuitive spatial or 3D navigation.',
    'Reactive maintenance models: fixes only happen after critical equipment catastrophic breakdown.',
    'Isolated Computer Vision CCTV monitoring without integration into the digital twin occupancy layer.',
    'Black-box alert logs without natural-language root-cause explanations and MTBF remaining useful life forecasts.'
  ],
  proposedArchitecture: [
    '3D Spatial Layer: WebGL/Three.js procedural campus rendering with real-time dynamic shader status halos and camera raycasting.',
    'Cyber-Physical Telemetry Pipeline: High-frequency simulated sensor nodes streaming temperature, vibration (FFT), power, and air quality.',
    'ML Prognostic Engine: Ensemble Isolation Forest (anomaly detection) + XGBoost RUL regressor for degradation curve estimation.',
    'Generative AI Diagnostic Co-pilot: Server-side Gemini API grounding telemetry factors into human-comprehensible repair protocols.',
    'Computer Vision Analytics: Real-time neural frame analysis for crowd density, unauthorized entry, and safety hazard detection.'
  ],
  mlMethodology: [
    {
      title: 'Equipment Remaining Useful Life (RUL) Prediction',
      description: 'Supervised Gradient Boosted Decision Trees trained on multivariate degradation time-series (operating hours, thermal stress cycle, RMS vibration delta, power harmonics).',
      formula: 'RUL = f(T_{exhaust}, \\Delta T_{ambient}, V_{rms}, I_{draw}, H_{run}) = \\sum_{m=1}^M \\gamma_{jm} I(x \\in R_{jm})',
      features: ['Core Temp (°C)', 'Vibration Peak (mm/s)', 'Power Factor', 'Cumulative Run Hours', 'Mean Time Between Anomaly (MTBA)'],
      metrics: ['RMSE: 2.14 days', 'MAE: 1.48 days', 'R² Score: 0.942']
    },
    {
      title: 'Multi-Sensor Anomaly Detection',
      description: 'Unsupervised Isolation Forest algorithm partitioning multivariate feature space to detect abnormal telemetry drifts without requiring labeled failure datasets.',
      formula: 's(x, n) = 2^{-\\frac{E(h(x))}{c(n)}}, \\quad c(n) = 2 \\ln(n - 1) + 0.5772156649 - \\frac{2(n - 1)}{n}',
      features: ['Thermal Gradient (dT/dt)', 'FFT 1x/2x Harmonic Vibration Ratio', 'Voltage Sag/Surge Deviation', 'Airflow Pressure'],
      metrics: ['Precision: 93.8%', 'Recall: 96.2%', 'F1-Score: 0.950', 'AUC-ROC: 0.984']
    }
  ],
  erEntities: [
    {
      name: 'ORGANIZATION / CAMPUS',
      keys: ['PK: org_id'],
      attributes: ['name', 'location_geo', 'total_area_sqm', 'active_preset', 'created_at'],
      relations: '1-to-Many with BUILDINGS, USERS'
    },
    {
      name: 'BUILDING',
      keys: ['PK: building_id', 'FK: org_id'],
      attributes: ['name', 'code', 'pos_x', 'pos_y', 'pos_z', 'dim_w', 'dim_h', 'dim_d', 'overall_health', 'total_power_kw'],
      relations: '1-to-Many with FLOORS, ALERTS'
    },
    {
      name: 'FLOOR',
      keys: ['PK: floor_id', 'FK: building_id'],
      attributes: ['level_num', 'name', 'height_offset_m'],
      relations: '1-to-Many with ROOMS'
    },
    {
      name: 'ROOM',
      keys: ['PK: room_id', 'FK: floor_id'],
      attributes: ['name', 'code', 'current_occupancy', 'max_capacity', 'target_temp_c', 'current_temp_c', 'cctv_stream_url'],
      relations: '1-to-Many with EQUIPMENT'
    },
    {
      name: 'EQUIPMENT (DIGITAL TWIN OBJECT)',
      keys: ['PK: equipment_id', 'FK: room_id'],
      attributes: ['name', 'code', 'category', 'pos_x', 'pos_y', 'pos_z', 'operating_hours', 'health_score', 'risk_score', 'status', 'power_kw', 'temp_c', 'vibration_mms'],
      relations: '1-to-Many with SENSORS, PREDICTIONS, MAINTENANCE_TICKETS'
    },
    {
      name: 'SENSOR_READING',
      keys: ['PK: reading_id', 'FK: equipment_id'],
      attributes: ['sensor_type', 'value', 'unit', 'baseline', 'warning_thresh', 'critical_thresh', 'recorded_at'],
      relations: 'Many-to-1 with EQUIPMENT'
    },
    {
      name: 'AI_PREDICTION',
      keys: ['PK: prediction_id', 'FK: equipment_id'],
      attributes: ['health_score', 'risk_score', 'rul_days', 'failure_prob_pct', 'anomaly_flag', 'root_causes_json', 'action_rec', 'evaluated_at'],
      relations: 'Many-to-1 with EQUIPMENT'
    },
    {
      name: 'MAINTENANCE_TICKET',
      keys: ['PK: ticket_id', 'FK: equipment_id', 'FK: assigned_user_id'],
      attributes: ['title', 'priority', 'status', 'ai_diagnosis', 'parts_json', 'reported_at', 'due_at', 'resolved_at'],
      relations: 'Many-to-1 with EQUIPMENT and USERS'
    }
  ],
  businessModel: [
    {
      tier: 'Community / Academia (Open)',
      price: '$0 / mo',
      target: 'Colleges, University Labs, Students',
      features: ['Single campus 3D digital twin', 'Up to 25 sensor channels', 'Rule-based threshold alerts', 'Community support']
    },
    {
      tier: 'Professional Facility',
      price: '$1,499 / mo',
      target: 'Medium Enterprises, Smart Hospitals, Large Warehouses',
      features: ['Full 3D digital twin with exploded floor slicing', 'Predictive Maintenance ML engine (RUL & Isolation Forest)', 'Automated PDF intelligence reports', 'Up to 250 equipment nodes', 'Role-based access (4 tiers)']
    },
    {
      tier: 'Enterprise Cyber-Twin',
      price: '$4,999 / mo + Custom',
      target: 'Multi-site Corporations, Tier-IV Data Centers, Industrial Plants',
      features: ['Unlimited multi-facility digital twins', 'Edge Computer Vision CCTV stream integration', 'Gemini AI Diagnostic Copilot integration', 'Direct SCADA/BACnet/MQTT IoT connector gateway', 'Custom ML model fine-tuning & 99.99% uptime SLA']
    }
  ]
};

export const campusBuildings = COLLEGE_CAMPUS_PRESET.buildings || [];
export const campusEquipment = COLLEGE_CAMPUS_PRESET.equipment || [];
export const initialAlerts = COLLEGE_CAMPUS_PRESET.alerts || [];

export const initialTimeline: any[] = [
  {
    id: 'evt-1',
    timestamp: '14:28:10',
    type: 'anomaly_detected',
    title: 'Thermal gradient excursion detected on Blade Server SR-04 (78.6°C)',
    severity: 'critical',
    equipmentId: 'eq-server-sr04',
    details: 'Isolation Forest Anomaly Score: 0.94. Primary fan bearing friction harmonic.'
  },
  {
    id: 'evt-2',
    timestamp: '14:15:00',
    type: 'risk_updated',
    title: 'ML Health score recalculated: 38/100 (Predicted RUL: 3.2 days)',
    severity: 'warning',
    equipmentId: 'eq-server-sr04',
    details: 'XGBoost RUL Regression model triggered proactive work order recommendation.'
  },
  {
    id: 'evt-3',
    timestamp: '13:45:22',
    type: 'maintenance_scheduled',
    title: 'Scheduled maintenance inspection dispatched to Lead Tech Sarah J.',
    severity: 'normal',
    equipmentId: 'eq-chiller-01',
    details: 'Preventive monthly condenser descaling and pressure test.'
  },
  {
    id: 'evt-4',
    timestamp: '12:30:15',
    type: 'system_restore',
    title: 'Substation B Transformer Phase Balanced — Nominal load 410 kW',
    severity: 'normal',
    details: 'Auto-switched power capacitor bank bank 3.'
  }
];

export const initialTickets: any[] = [
  {
    id: 'wo-101',
    equipmentId: 'eq-server-sr04',
    equipmentName: 'Blade Server Rack SR-04',
    title: 'High Thermal & Vibration Bearing Replacement',
    description: 'Server blade exhibiting 78.6°C thermal excursion. Bearing harmonic 120Hz.',
    priority: 'critical',
    status: 'open',
    assignedTo: 'Sarah Jenkins (Lead Tech)',
    createdAt: '2026-08-24',
    dueDate: 'Today, 18:00',
    estimatedCostUsd: 450,
    partsRequired: ['Blower Fan Assembly', 'Thermal Paste K-4'],
    aiDiagnosisNotes: 'Immediate replacement recommended before thermal throttle cascade.'
  },
  {
    id: 'wo-102',
    equipmentId: 'eq-chiller-01',
    equipmentName: 'Primary Centrifugal Chiller 01',
    title: 'Condenser Refrigerant Inspection & Seal Check',
    description: 'Pressure variance noticed during peak thermal cooling cycle.',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Marcus Vance',
    createdAt: '2026-08-23',
    dueDate: 'Tomorrow, 12:00',
    estimatedCostUsd: 850,
    partsRequired: ['Gasket Ring 4-inch', 'R-134a Refrigerant 20kg'],
    aiDiagnosisNotes: 'Refrigerant pressure slight drop over past 14 days.'
  }
];
