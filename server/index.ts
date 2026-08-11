import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const distPath = path.resolve(process.cwd(), "dist");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/analyze-data", (req, res) => {
  const { dataSummary } = req.body ?? {};

  if (typeof dataSummary !== "string" || !dataSummary.trim()) {
    return res.status(400).json({
      error: "Invalid request",
      message: "dataSummary is required and must be a non-empty string.",
    });
  }

  return res.status(501).json({
    error: "AI analysis unavailable",
    message:
      "The analyze-data endpoint requires an external AI service, which has been removed from this deployment.",
  });
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend is running on port ${PORT}`);
});
