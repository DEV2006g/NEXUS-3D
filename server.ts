import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { explainEquipmentRisk, askAiAssistant, analyzeCCTVImage } from './server/ai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'NEXUS 3D Digital Twin Core',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.GEMINI_API_KEY ? 'Gemini 3.7 Flash Connected' : 'Local Statistical Engine Mode'
  });
});

// 2. AI Risk Diagnosis and Predictive Explanation
app.post('/api/gemini/explain-risk', async (req, res) => {
  try {
    const { equipment } = req.body;
    if (!equipment) {
      return res.status(400).json({ error: 'Equipment data required' });
    }
    const explanation = await explainEquipmentRisk(equipment);
    res.json(explanation);
  } catch (err: any) {
    console.error('Error in /api/gemini/explain-risk:', err);
    res.status(500).json({ error: err.message || 'Failed to explain risk' });
  }
});

// 3. AI Facility Copilot Chat
app.post(['/api/gemini/assistant', '/api/gemini/copilot-chat'], async (req, res) => {
  try {
    const { query, message, contextSummary, context } = req.body;
    const textQuery = message || query;
    if (!textQuery) {
      return res.status(400).json({ error: 'Query or message required' });
    }
    const summary = contextSummary || (context ? JSON.stringify(context) : 'General digital twin facility context');
    const reply = await askAiAssistant(textQuery, summary);
    res.json({ reply });
  } catch (err: any) {
    console.error('Error in AI assistant:', err);
    res.status(500).json({ error: err.message || 'Failed to process AI assistant query' });
  }
});

// 4. Computer Vision Image / Video Frame Inspection
app.post('/api/gemini/cv-analyze', async (req, res) => {
  try {
    const { imageBase64, prompt } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 data required' });
    }
    const analysis = await analyzeCCTVImage(imageBase64, prompt || 'Analyze CCTV frame');
    res.json(analysis);
  } catch (err: any) {
    console.error('Error in /api/gemini/cv-analyze:', err);
    res.status(500).json({ error: err.message || 'Failed to analyze CCTV frame' });
  }
});

// 5. Automated Intelligence Report Generation
app.post('/api/gemini/generate-report', async (req, res) => {
  try {
    const { environmentTitle, metrics, highRiskEquipment, recentIncidents } = req.body;
    
    const summary = {
      reportId: `NEXUS-REP-${Date.now().toString().slice(-6)}`,
      generatedAt: new Date().toISOString(),
      facility: environmentTitle || 'NEXUS Smart Facility',
      overallHealthScore: metrics?.overallHealth || 91,
      totalEnergyConsumptionMwh: metrics?.totalEnergyMwh || 14.6,
      criticalAnomaliesCount: metrics?.criticalEventsCount || 1,
      equipmentAtRisk: highRiskEquipment || ['SR-04 Supercomputing Blade Rack'],
      executiveSummary: `The facility operating posture remains stable at ${metrics?.overallHealth || 91}% overall health index. An urgent high-priority anomaly was mitigated in Server Room SR-04 where thermal throttling was prevented through predictive airflow rebalancing. Power efficiency index is performing at 94.2% of baseline targets.`,
      complianceRating: 'ISO-55001 Asset Management: COMPLIANT (Tier A)',
      carbonSavingsTons: 3.42,
      recommendedNextSteps: [
        'Complete scheduled bearing replacement on CRAC-01 blower fan.',
        'Apply thermal paste refresh to DGX AI Cluster node 2.',
        'Maintain transformer cooling fan operation during 12:00-15:00 peak hours.'
      ]
    };
    
    res.json(summary);
  } catch (err: any) {
    console.error('Error in report generation:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// Vite Middleware Setup for Dev & Static Serving for Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NEXUS 3D] Server actively listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
