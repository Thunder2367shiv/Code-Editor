// services/errorFixGemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a valid model like gemini-1.5-flash or gemini-1.5-pro
export const suggestFix = async (code, error) => {
  const prompt = `
You are a helpful programming assistant.
A user ran the following code and encountered an error.
Please:
1. Explain the cause of the error.
2. Suggest a fix.
3. Optionally, provide the corrected code.

Code:
\`\`\`
${code}
\`\`\`

Error:
\`\`\`
${error}
\`\`\`
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = result.response;
    const text = await response.text();

    return text.trim();
  } catch (err) {
    console.error("Gemini ErrorFix Error:", err.message || err);
    return `❌ Error: ${err.message || 'Could not generate fix.'}`;
  }
};
