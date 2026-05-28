export class StrapiFetchError extends Error {
  readonly url: string;
  readonly status: number | null;

  constructor(message: string, url: string, status: number | null, cause?: unknown) {
    super(message);
    this.name = "StrapiFetchError";
    this.url = url;
    this.status = status;
    if (cause !== undefined) {
      this.cause = cause;
    }
  }
}

export function isStrapiFetchError(error: unknown): error is StrapiFetchError {
  return error instanceof StrapiFetchError;
}
