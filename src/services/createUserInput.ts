import { logger } from '../utils';

export const createUserInputService = async (userInput: string): Promise<string> => {
  // this is a mock function to save user input and its details to a Db
  logger.info(`User input taken: ${userInput}`);
  return 'some id';
};
