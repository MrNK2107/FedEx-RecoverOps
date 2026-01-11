import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

//model definition
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
