export default function handler(_req: any, res: any) {
  // Removed Gemini dependency — endpoint now returns basic health info only.
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}