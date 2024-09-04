import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  const { sourceText, selectedLanguage } = await request.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama3-8b-8192', // Ensure this is the model you want to use
      messages: [
        {
          role: 'user',
          content: `You will be provided with a sentence. This sentence: 
          ${sourceText}. Your tasks are to:
          - Detect what language the sentence is in
          - Translate the sentence into ${selectedLanguage}
          Do not return anything other than the translated sentence.`,
        },
      ],
    });

    const data = chatCompletion.choices[0]?.message?.content || "";
    return new Response(JSON.stringify({ translatedText: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error translating text:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
