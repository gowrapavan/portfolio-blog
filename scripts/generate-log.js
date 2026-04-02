// scripts/generate-log.js

async function generateDevLog() {
  const diff = process.env.GIT_DIFF;
  const apiKey = process.env.GROQ_API_KEY; 

  if (!diff || diff.trim() === '') {
    console.log("No significant code changes found. Skipping dev log generation.");
    return;
  }

  if (!apiKey) {
    console.error("🚨 Groq API Key is missing! Check your GitHub Secrets.");
    process.exit(1);
  }

  console.log("Analyzing Git Diff with Groq (Llama 3)...");

  const systemPrompt = `You are an expert technical writer. I am going to provide you with a raw git diff. 
  Your job is to translate this code change into a professional, 1-2 sentence developer log entry. 
  Focus on the 'why' and 'what' (e.g., "Optimized React performance by memoizing Navbar components"). 
  Do not mention specific line numbers. Keep it punchy and professional.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Super fast, free open-source model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Here is the git diff:\n${diff}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("🚨 API Error:", JSON.stringify(data.error, null, 2));
      process.exit(1);
    }

    const generatedLog = data.choices[0].message.content;

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