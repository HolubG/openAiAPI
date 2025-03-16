import { MAX_RESPONSE_LENGHT } from "./helpers.mjs";

export const createAPIResponse = async (client, userPrompt) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    max_tokens: MAX_RESPONSE_LENGHT,
  });

  return response;
};
