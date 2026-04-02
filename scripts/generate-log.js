// scripts/generate-log.js
const { createClient } = require('@supabase/supabase-js');

async function generateDevLog() {
  // 1. Grab all Environment Variables
  const diff = process.env.GIT_DIFF;
  const groqKey = process.env.GROQ_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!diff || diff.trim() === '') {
    console.log("No significant code changes found. Skipping dev log generation.");
    return;
  }

  if (!groqKey || !supabaseUrl || !supabaseKey) {
    console.error("🚨 Missing API Keys! Check your GitHub Secrets for GROQ, SUPABASE_URL, and SUPABASE_KEY.");
    process.exit(1);
  }

  // 2. Initialize Supabase Client
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Analyzing Git Diff with Groq (Llama 3.1)...");

  const systemPrompt = `You are an expert technical writer. I am going to provide you with a raw git diff. 
  Your job is to translate this code change into a professional, 1-2 sentence developer log entry. 
  Focus on the 'why' and 'what' (e.g., "Optimized React performance by memoizing Navbar components"). 
  Do not mention specific line numbers. Keep it punchy and professional.`;

  try {
    // 3. Generate the AI Log Text
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', 
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Here is the git diff:\n${diff}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("🚨 Groq API Error:", JSON.stringify(data.error, null, 2));
      process.exit(1);
    }

    const generatedLog = data.choices[0].message.content.trim();

    console.log("=======================================");
    console.log("🚀 GENERATED DEV LOG:");
    console.log(generatedLog);
    console.log("=======================================");

    // 4. Insert into Supabase 'dev_logs' table
    console.log("📤 Saving to Supabase...");
    
    const { error } = await supabase
      .from('dev_logs')
      .insert([
        { 
          content: generatedLog, 
          git_diff: diff 
        }
      ]);

    if (error) {
      console.error("🚨 Supabase Insert Error:", error.message);
      process.exit(1);
    }

    console.log("✅ Successfully saved to database!");

  } catch (error) {
    console.error("🚨 Pipeline Error:", error);
    process.exit(1);
  }
}

generateDevLog();