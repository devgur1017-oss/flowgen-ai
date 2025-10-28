import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "YOUR_API_KEY_HERE"; // paste your Gemini key here
const MODEL = "gemini-1.5-flash";

app.post("/chat", async (req, res) => {
  const userPrompt = req.body.prompt || "Hello from my SaaS MVP!";
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: userPrompt }] }] }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () =>
  console.log("VAIzaSyCqATVDXQxWl0xob3S2ylFCRWHozSc_xxs;✅ Server running at http://localhost:3000")
);
