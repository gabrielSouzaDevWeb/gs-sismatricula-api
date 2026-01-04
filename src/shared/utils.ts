export class ServiceResponse<T> {
  constructor(
    public message: string,
    public data?: T,
    public params?: { [key: string]: any },
  ) {}
}
