import express from 'express';
import validate from './validate';
import { createUserInputService, extractIntentService, updateUserInputService } from '../../services';
import { getTimezoneOfUser } from '../../utils';

export const createUserInputController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const body = validate(req.body);
    const id = await createUserInputService(body.userInput);

    const extractedIntent = await extractIntentService(body.userInput, getTimezoneOfUser(req));

    await updateUserInputService(id, extractedIntent);

    res.json(
      extractedIntent
        ? {
            status: true,
            message: 'Your input is processed',
          }
        : {
            status: false,
            message: "Your input couldn't be processed. Please provide clear instructions",
          },
    );
  } catch (e) {
    next(e);
  }
};
