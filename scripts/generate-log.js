// scripts/generate-log.js

async function generateDevLog() {
  const diff = process.env.GIT_DIFF;
  const apiKey = process.env.GEMINI_API_KEY; 

  if (!diff || diff.trim() === '') {
    console.log("No significant code changes found. Skipping dev log generation.");
    return;
  }

  if (!apiKey) {
    console.error("API Key is missing!");
    process.exit(1);
  }

  console.log("Analyzing Git Diff...");

  const systemPrompt = `You are an expert technical writer. I am going to provide you with a raw git diff. 
  Your job is to translate this code change into a professional, 1-2 sentence developer log entry. 
  Focus on the 'why' and 'what' (e.g., "Optimized React performance by memoizing Navbar components"). 
  Do not mention specific line numbers. Keep it punchy and professional.`;

  try {
    // 🛑 FIXED: Changed gemini-1.5-flash to gemini-2.0-flash below 🛑
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: systemPrompt },
            { text: `\n\nHere is the git diff:\n${diff}` }
          ]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("🚨 Google API Error:", JSON.stringify(data.error, null, 2));
      process.exit(1);
    }

    if (!data.candidates || data.candidates.length === 0) {
      console.error("🚨 No candidates returned. Full response:", JSON.stringify(data, null, 2));
      process.exit(1);
    }

    const generatedLog = data.candidates[0].content.parts[0].text;

    console.log("=======================================");
    console.log("🚀 GENERATED DEV LOG:");
    console.log(generatedLog.trim());
    console.log("=======================================");

  } catch (error) {
    console.error("Error generating dev log:", error);
    process.exit(1);
  }
}

generateDevLog();