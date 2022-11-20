class ErrorMock extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default ErrorMock;