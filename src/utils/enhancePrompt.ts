import Cerebras from '@cerebras/cerebras_cloud_sdk';

const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;

const client = new Cerebras({
  apiKey: apiKey,
  maxRetries: 2,
  timeout: 60 * 1000,
});

interface EnhancedPromptResponse {
  enhancePrompt: string;
  thingsImprovedInPrompt: string[];
}

export async function enhancePrompt(prompt: string, options: string[]): Promise<EnhancedPromptResponse> {
  try {
    const params: Cerebras.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: 'system',
          content: `
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

Respond with the following JSON SCHEMA:
{{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Prompt Enhancer System",
  "description": "A system for enhancing and tracking improvements in user prompts.",
  "type": "object",
  "properties": {{
    "enhancePrompt": {{
      "description": "The original prompt to be enhanced.",
      "type": "string"
        }},
    "thingsImprovedInPrompt": {{
      "description": "A list of improvements made to the original prompt.",
      "type": "array",
      "items": {{
        "type": "string"
        }}
        }}
        }},
  "required": ["enhancePrompt", "thingsImprovedInPrompt"]
        }}
`
        },
        { role: 'user', content: `Enhance the prompt ensuring it is ${options.join(', ')}` },
      ],
      model: 'llama-3.3-70b',
      response_format: { "type": "json_object" },
      stream: false,
    };

    const chatCompletion: Cerebras.Chat.ChatCompletion = await client.chat.completions.create(params);
    const choices = chatCompletion.choices as Cerebras.Chat.ChatCompletion.ChatCompletionResponse.Choice[];
    const content = choices[0].message.content;

    if (!content) {
      throw new Error('No response content returned');
    }

    const parsedResponse = JSON.parse(content) as EnhancedPromptResponse;

    // Validate the response has the required properties
    if (!parsedResponse.enhancePrompt || !Array.isArray(parsedResponse.thingsImprovedInPrompt)) {
      throw new Error('Invalid response format');
    }

    return parsedResponse;

  } catch (err) {
    if (err instanceof Cerebras.APIError) {
      console.log(`Error: ${err.name} - ${err.message}`);
      if (err.status === 400) {
        // Return a properly formatted response even for errors
        return {
          enhancePrompt: prompt.trim(),
          thingsImprovedInPrompt: ['No improvements made due to invalid prompt']
        };
      }
      throw err;
    }
    throw err;
  }
}

export type { EnhancedPromptResponse };
export default enhancePrompt;