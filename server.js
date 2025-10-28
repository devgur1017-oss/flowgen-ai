import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve the frontend
app.use(express.static("./"));

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response.";
    res.json({ response: text });
  } catch (error) {
    console.error("Error from Gemini API:", error);
    res.status(500).json({ response: "❌ Server Error: " + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
