export class HttpError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not found") {
    super(404, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class ValidationError extends HttpError {
  constructor(message = "Validation failed") {
    super(400, message);
  }
}

export function json<T>(data: T, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export function handle<T>(fn: () => Promise<T>): Promise<Response> {
  return fn()
    .then((d) => (d instanceof Response ? d : json(d)))
    .catch((err: unknown) => {
      if (err instanceof HttpError) {
        return json({ error: err.message }, { status: err.status });
      }
      console.error("[api] uncaught", err);
      return json({ error: "Internal error" }, { status: 500 });
    });
}
