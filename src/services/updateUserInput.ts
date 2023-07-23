import { ExtractedIntent } from '../types';
import { logger } from '../utils';

export const updateUserInputService = async (
  id: string,
  extractIntent: ExtractedIntent | null,
  // eslint-disable-next-line
  errorAtExtraction?: string,
): Promise<void> => {
  // this is a mock function to update user input with its extracted intent

  logger.info(`For User Input ${id} extracted intent taken: ${JSON.stringify(extractIntent)}`);
};
