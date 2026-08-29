import { groqAiService, ImagePayload } from './groqAiService';
import { PatternScanAnalysis, ScanChatMessage } from '../types';

export type { ImagePayload };

/**
 * AI & Vision Service proxy backed by Groq AI
 */
export const geminiVisionService = {
  async scanPattern(
    images: ImagePayload[],
    userPrompt?: string,
    mode: 'single' | 'compare' = 'single'
  ): Promise<PatternScanAnalysis> {
    return groqAiService.scanPattern(images, userPrompt, mode);
  },

  async askImage(
    images: ImagePayload[],
    question: string,
    previousAnalysis: PatternScanAnalysis,
    conversationHistory: ScanChatMessage[] = []
  ): Promise<{ answer: string; visualEvidence?: string[]; alternativeHypothesis?: string }> {
    return groqAiService.askImage(images, question, previousAnalysis, conversationHistory);
  }
};
