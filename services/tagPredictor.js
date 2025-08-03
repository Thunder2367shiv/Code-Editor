import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a valid model like gemini-1.5-flash or gemini-1.5-pro
export const predictTag = async (code) => {
  const prompt = `
You are an expert DSA tutor.
Given the following code snippet, tell me what DSA topic or category it belongs to (e.g., binary search, graph, sorting, DP, recursion, backtracking, heap, trie, greedy, etc).
Only give me a single tag like: "dynamic programming" or "binary search".

Code:
\`\`\`
${code}
\`\`\`
`;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent({
    contents: [{ parts: [{ text: prompt }] }],
  });

  const response = await result.response;
  const text = response.text().trim();

  return text;
};
