export class BusinessCard {
  constructor(
    public firstName = '',
    public lastName = '',
    public email = '',
    public phoneNumber = '',
    public extraText = '',
    public imageString = '', // base64 image string
  ) {}
}
