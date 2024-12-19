import Cerebras from '@cerebras/cerebras_cloud_sdk';


const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;

const client = new Cerebras({
  apiKey: apiKey,
  maxRetries: 2,
  timeout: 60 * 1000,
});

// const systemPrompt =stripIndents;

export async function enhancePrompt(prompt: string, options: string[]): Promise<string> {
  try {
    const params: Cerebras.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: 'system', content: `
You are a professional prompt engineer specializing in crafting precise, effective prompts.
Your task is to enhance prompts by making them more specific, actionable, and effective.

I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

For valid prompts:
- Make instructions explicit and unambiguous
- Add relevant context and constraints
- Remove redundant information
- Maintain the core intent
- Ensure the prompt is self-contained
- Use professional language

For invalid or unclear prompts:
- Respond with a clear, professional guidance message
- Keep responses concise and actionable
- Maintain a helpful, constructive tone
- Focus on what the user should provide
- Use a standard template for consistency

IMPORTANT: Your response must ONLY contain the enhanced prompt text.
Do not include any explanations, metadata, or wrapper tags.

<original_prompt>
${prompt}
</original_prompt>
`},
        { role: 'user', content: `Enhance the prompt ensuring it is ${options.join(' ,')}` },],
      model: 'llama3.1-8b',
    };
    const chatCompletion: Cerebras.Chat.ChatCompletion = await client.chat.completions.create(params);
    const choices = chatCompletion.choices as Cerebras.Chat.ChatCompletion.ChatCompletionResponse.Choice[];
    return choices[0].message.content ?? 'No response returned';
  } catch (err) {
    if (err instanceof Cerebras.APIError) {
      console.log(`Error: ${err.name} - ${err.message}`);
      if (err.status === 400) {
        return prompt.trim(); // Return the original prompt if it's invalid
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  }
}

export default enhancePrompt;