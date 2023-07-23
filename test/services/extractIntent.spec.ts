import dotenv from 'dotenv';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import weekday from 'dayjs/plugin/weekday';
const { extractIntentService } = require('../../src/services');
const { ExtractedIntentTypeEnum } = require('../../src/types');

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(weekday);

dotenv.config();

// it is already set in package json but still it is needed for runs from IDE
jest.setTimeout(60000);
describe('extractIntent', () => {
  test('with simple valid user inputs', async () => {
    const response1 = await extractIntentService("Yarin öglen 2'de musait misiniz?", 'europe/istanbul');
    expect(response1).not.toBeNull();
    expect(response1?.intent).toBe(ExtractedIntentTypeEnum.NEW_APPOINTMENT);
    expect(dayjs(response1?.datetimeStr).toISOString()).toBe(
      dayjs.tz(new Date(), 'europe/istanbul').hour(14).minute(0).second(0).millisecond(0).toISOString(),
    );

    const response2 = await extractIntentService(
      "21 temmuz öğleden sonra 5'e randevu alabilir miyim?",
      'europe/istanbul',
    );
    expect(response2).not.toBeNull();
    expect(response2?.intent).toBe(ExtractedIntentTypeEnum.NEW_APPOINTMENT);
    expect(dayjs(response2?.datetimeStr).toISOString()).toBe(
      dayjs
        .tz(new Date(), 'europe/istanbul')
        .hour(17)
        .minute(0)
        .second(0)
        .millisecond(0)
        .month(6)
        .date(21)
        .toISOString(),
    );

    const response3 = await extractIntentService("Salı günü 17'e randevu alabilir miyim?", 'europe/istanbul');
    expect(response3).not.toBeNull();
    expect(response3?.intent).toBe(ExtractedIntentTypeEnum.NEW_APPOINTMENT);
    expect(dayjs(response3?.datetimeStr).toISOString()).toBe(
      dayjs.tz(new Date(), 'europe/istanbul').weekday(2).hour(17).minute(0).second(0).millisecond(0).toISOString(),
    );
  });

  test('creating intent with type other', async () => {
    const response1 = await extractIntentService(
      'haftaya sali olan randevumu iptal etmek istiyorum',
      'europe/istanbul',
    );
    expect(response1).not.toBeNull();
    expect(response1?.intent).toBe(ExtractedIntentTypeEnum.OTHER);
    expect(response1?.datetimeStr).toBeNull();
    console.log(response1);
  });
});
