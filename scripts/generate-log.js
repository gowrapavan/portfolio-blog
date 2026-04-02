// scripts/generate-log.js

async function generateDevLog() {
  // 1. Grab the environment variables passed by GitHub Actions
  const diff = process.env.GIT_DIFF;
  const apiKey = process.env.GEMINI_API_KEY; // Or OPENAI_API_KEY if you prefer

  if (!diff || diff.trim() === '') {
    console.log("No significant code changes found. Skipping dev log generation.");
    return;
  }

  if (!apiKey) {
    console.error("API Key is missing!");
    process.exit(1);
  }

  console.log("Analyzing Git Diff...");

  // 2. The Prompt Engineering
  const systemPrompt = `You are an expert technical writer. I am going to provide you with a raw git diff. 
  Your job is to translate this code change into a professional, 1-2 sentence developer log entry. 
  Focus on the 'why' and 'what' (e.g., "Optimized React performance by memoizing Navbar components"). 
  Do not mention specific line numbers. Keep it punchy and professional.`;

  try {
    // 3. Make the API Call (Example using Google's Gemini API endpoint via standard fetch)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
    const generatedLog = data.candidates[0].content.parts[0].text;

    // 4. Output the result
    console.log("=======================================");
    console.log("🚀 GENERATED DEV LOG:");
    console.log(generatedLog.trim());
    console.log("=======================================");
    
    // In Phase 2, we will replace console.log with a Supabase database insert!

  } catch (error) {
    console.error("Error generating dev log:", error);
    process.exit(1);
  }
}

generateDevLog();