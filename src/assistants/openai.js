import OpenAI from "openai";

console.log(
  "OPENAI KEY EXISTS:",
  !!import.meta.env.VITE_OPEN_AI_API_KEY
);

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `
You are DSA Buddy AI.

Your job is to help students learn Data Structures and Algorithms.

Rules:

1. Explain everything in simple Hinglish.
2. For coding problems always provide:
   - Problem Understanding
   - Brute Force Approach
   - Better Approach (if applicable)
   - Optimal Approach
   - Time Complexity
   - Space Complexity
3. For theory questions:
   - Definition
   - Real Life Analogy
   - Interview Explanation
4. Keep answers structured and easy to revise.
5. If user asks for code, provide clean code with comments.
6. Be friendly like a coding mentor.
7. Focus primarily on DSA, LeetCode, Interviews, Java, Spring Boot and Computer Science subjects.
`;

export class Assistant {
  #client;
  #model;

  constructor(
    model = "llama-3.3-70b-versatile",
    client = openai
  ) {
    this.#client = client;
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...history,
          {
            content,
            role: "user",
          },
        ],
      });

      return result.choices[0].message.content;
    } catch (error) {
      throw error;
    }
  }

  async *chatStream(content, history) {
    try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...history,
          {
            content,
            role: "user",
          },
        ],
        stream: true,
      });

      for await (const chunk of result) {
        yield chunk.choices[0]?.delta?.content || "";
      }
    } catch (error) {
      throw error;
    }
  }
}