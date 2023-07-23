import { Configuration, OpenAIApi } from 'openai';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import { ExtractedIntent } from '../types';
import { logger } from '../utils';

dayjs.extend(utc);
dayjs.extend(tz);

const query = `
#USER_INPUT 
Current Date is  "2023-07-23T13:15:25.546Z" and user is at UTC#UTC_OFFSET. From above user input create only json without explanation. Json will contains below fields:  
intent: it can take to values "new_appointment" or "other". It will be filled based on user input. If user want to make a new appointment set "new_appointment" for others use "other"
datetimeStr: It is a ISO datetime value extract date from user input. If date is not provided set it to null. Date will be based on users local timezone
`;
export const extractIntentService = async (
  userInput: string,
  userTimezone: string,
): Promise<ExtractedIntent | null> => {
  logger.debug('promissed');
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // converting to hours.
  // Note that the offset is not always multitudes of 60.
  // it may get values like 150. It is not handled for simplicity
  const offset = dayjs.tz(new Date(), userTimezone).utcOffset() / 60;
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: query.replace('#USER_INPUT', userInput).replace(
          '#UTC_OFFSET',
          // check case when offset is zero.
          offset > 0 ? `+${offset.toString()}` : offset.toString(),
        ),
      },
    ],
    temperature: 0,
  });
  const object = JSON.parse(chatCompletion.data.choices[0].message!.content || '{}');
  return object;
};
