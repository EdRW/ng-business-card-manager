export class BusinessCard {
  constructor(
    public firstName: string,
    public lastName: string,
    public email?: string,
    public phoneNumber?: string,
    public extraText?: string,
    public imageString?: string, // base64 image string
  ) {}
}
