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
        messages: [...history, { content, role: "user" }],
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
        messages: [...history, { content, role: "user" }],
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