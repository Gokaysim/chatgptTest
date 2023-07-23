export enum ExtractedIntentTypeEnum {
  NEW_APPOINTMENT = 'new_appointment',
  OTHER = 'other',
}
export interface ExtractedIntent {
  intent: ExtractedIntentTypeEnum;
  datetimeStr: string;
}
