// controllers/errorSuggestController.js
import { suggestFix } from '../services/errorFixGemini.js';

export const suggestErrorFix = async (req, res) => {
  const { code, error } = req.body;

  try { 
    const fix = await suggestFix(code, error);
    res.status(200).json({ fix });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get suggestion', details: err.message });
  }
};
