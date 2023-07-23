import Joi from 'joi';
import { BadRequestError } from '../../utils';

export interface CreateUserIntentBody {
  userInput: string;
}

// eslint-disable-next-line
export default (input?: any): CreateUserIntentBody => {
  const { value, error } = Joi.object({
    userInput: Joi.string().required(),
  }).validate(input);
  if (error) {
    throw new BadRequestError(error);
  }
  return value;
};
