import { GoogleGenAI } from "@google/genai";

// Safe access to API Key to prevent runtime crashes if process is undefined
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    console.warn("API Key not found in environment.");
    return '';
  }
};

const apiKey = getApiKey();
// Initialize only if we have a key (or handle it gracefully)
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateHolidayGreeting = async (): Promise<string> => {
  if (!apiKey) {
    return "Wishing you a season of timeless beauty and golden moments.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Write a very short, luxurious, and poetic Christmas greeting. The tone should be high-fashion, elegant, and magical. Use words like 'Golden', 'Eternal', 'Signature'. Max 2 sentences.",
    });

    return response.text || "May your holidays be wrapped in gold and eternal elegance.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Wishing you a season of timeless beauty and golden moments.";
  }
};