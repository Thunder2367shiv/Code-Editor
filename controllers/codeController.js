// controllers/codeController.js
import { executeCode } from '../services/executor.js';
import { predictTag } from '../services/tagPredictor.js';

export const runCode = async (req, res) => {
  const { code, language } = req.body;

  try { 
    const result = await executeCode(code, language);
    res.status(200).json({ output: result });
  } catch (err) {
    res.status(500).json({ error: 'Execution failed', details: err.message });
  }
};

export const predictDSATag = async (req, res) => {
  const { code } = req.body;

  try {
    const tag = await predictTag(code);
    res.status(200).json({ tag });
  } catch (err) {
    res.status(500).json({ error: 'Prediction failed', details: err.message });
  }
};
