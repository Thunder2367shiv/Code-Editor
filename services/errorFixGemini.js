// services/errorFixGemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const suggestFix = async (code, error) => {
  const prompt = `
You are a programming assistant.
The user ran the following code and got an error.
Please explain the reason for the error and suggest a fix.
 
Code:
\`\`\`
${code}
\`\`\`

Error Message:
${error}

Respond with a detailed explanation and a corrected version of the code if possible.
`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};
