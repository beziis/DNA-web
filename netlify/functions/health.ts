import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  const apiKey = process.env.GEMINI_API_KEY;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      apiConfigured:
        !!apiKey &&
        apiKey !== "MY_GEMINI_API_KEY" &&
        apiKey.trim() !== "",
    }),
  };
};