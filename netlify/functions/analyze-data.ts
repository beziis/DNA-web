import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;

  if (
    !apiKey ||
    apiKey === "MY_GEMINI_API_KEY" ||
    apiKey.trim() === ""
  ) {
    return null;
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  return aiClient;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const { dataSummary, targetSector, focusQuestion } = body;

    if (!dataSummary) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing dataSummary in request body",
        }),
      };
    }

    const sectorStr = targetSector
      ? `Target Sector: ${targetSector}`
      : "General Multi-Sector";

    const questionStr = focusQuestion
      ? `Strategic Question: ${focusQuestion}`
      : "Identify main opportunities and threats";

    const prompt = `You are the Chief AI Data Scientist at DNA TECH (Data Neutral Analysis Technology) in Addis Ababa, Ethiopia.

Your mission is to perform a highly professional, empirical statistical and business analysis of the following primary research dataset or context.

Do not sound like a generic chatbot. Sound like an elite consulting analyst.

### DATASET OR CONTEXT SUMMARY:

${dataSummary}

### STRATEGIC FOCUS:

- ${sectorStr}
- ${questionStr}

Provide your response in a structured JSON format containing:

1. executiveSummary (string, high-level strategic overview, approximately 3 sentences)
2. keyStatisticalFindings (array of strings)
3. swotAnalysis (object with strengths, weaknesses, opportunities, threats arrays)
4. strategicActionPlan (array of objects with goal, action, timeline, keyImpactMetric)
5. dataReliabilityIndex (number between 0 and 100)

Return ONLY the raw JSON string matching the schema.`;

    const ai = getAiClient();

    // Demo fallback when Gemini is not configured
    if (!ai) {
      const sectorTag = targetSector || "Retail & SMEs";

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDemoMode: true,
          executiveSummary: `[DEMO INTELLIGENCE REPORT] The provided dataset for ${sectorTag} shows clear demand clusters. However, operations are currently constrained by transport logistics and administrative overhead, which represents a key challenge for local scaling.`,
          keyStatisticalFindings: [
            "Primary concern: approximately 72% of surveyed participants cited transport logistics as their major margin-squeezing bottleneck.",
            "Secondary concern: capital accessibility shows a negative correlation (-0.68) with business age, indicating early-stage startups suffer disproportionately.",
            "Demographic density: survey completion rates were highest (79.8%) within low-income sub-cities.",
          ],
          swotAnalysis: {
            strengths: [
              "Ethical primary data collection methods",
              "Local community trust and high focus-group engagement",
              "Multilingual enumerator network",
            ],
            weaknesses: [
              "High geographical transport cost overheads",
              "Limited statistical literacy among early-stage SME owners",
              "Fragmented local logistics infrastructure",
            ],
            opportunities: [
              "Fostering communal shipping hubs",
              "Delivering real-time pricing alerts through simple digital channels",
              "Aligning development non-profit funds with geocoded community audits",
            ],
            threats: [
              "Regulatory policy shifts in retail pricing",
              "Market saturation from foreign industrial distributors",
              "Fluctuating regional transit corridors",
            ],
          },
          strategicActionPlan: [
            {
              goal: "Establish Communal Logistics Hubs",
              action: "Pool transport resources with local marketing cooperatives",
              timeline: "Short-term (1-3 months)",
              keyImpactMetric: "Reduce raw logistics overhead by 15-20%",
            },
            {
              goal: "Deploy Interactive SMS Price Alerts",
              action: "Broadcast daily demand indices to cooperative farmers and local small traders",
              timeline: "Medium-term (3-6 months)",
              keyImpactMetric: "Increase trader margin retention by up to 12%",
            },
          ],
          dataReliabilityIndex: 88,
        }),
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text?.trim() || "{}";

    let jsonResult;

    try {
      jsonResult = JSON.parse(responseText);
    } catch {
      const cleanJsonStr = responseText
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      jsonResult = JSON.parse(cleanJsonStr);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDemoMode: false,
        ...jsonResult,
      }),
    };
  } catch (error: any) {
    console.error("Gemini API call failed:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Error processing intelligence report.",
        details: error?.message || String(error),
      }),
    };
  }
};