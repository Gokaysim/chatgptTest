export class BadRequestError extends Error {
  public status: number;
  // eslint-disable-next-line
  public data: any;

  // eslint-disable-next-line
  constructor(data: any) {
    super('BAD_REQUEST');
    this.status = 400;
    this.data = data;
  }
}
