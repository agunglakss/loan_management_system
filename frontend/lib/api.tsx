const BASE = (process.env.API_URL || "http://127.0.0.1") + ":" + (process.env.PORT || "4000");

async function jsonFetch(path: string, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e: any = new Error(err.error || err.errors?.join(", ") || "API error");
    e.status = res.status;
    e.body = err;
    throw e;
  }
  return res.json().catch(() => null);
}

export const api = {
  getBooks: () => jsonFetch("/api/v1/books"),
  createBook: (payload: any) =>
    jsonFetch("/api/v1/books", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  
  getLoans: () => jsonFetch("/api/v1/loans"),
  reserve: (payload = {}) =>
    jsonFetch("/api/v1/loans", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  pickup: (id: number) => jsonFetch(`/api/v1/loans/${id}/pickup`, { method: "POST" }),
  return: (id: number, payload = {}) =>
    jsonFetch(`/api/v1/loans/${id}/return`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  
  getPublishers: () => jsonFetch("/api/v1/publishers"),
  createPublisher: (payload: any) =>
    jsonFetch("/api/v1/publishers", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  
  getAuthors: () => jsonFetch("/api/v1/authors"),
  createAuthor: (payload: any) =>
    jsonFetch("/api/v1/authors", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  
  getBorrowers: () => jsonFetch("/api/v1/borrowers"),
};
