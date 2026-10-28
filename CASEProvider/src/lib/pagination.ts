import { Request } from "express";

// CASE v1p1 REST binding, section 3.1 Pagination
export const DEFAULT_LIMIT = 100;
export const DEFAULT_OFFSET = 0;

export type Pagination = { limit: number; offset: number };
export type PaginationError = { field: "limit" | "offset"; message: string };

/**
 * Parses and validates the `limit` (positive integer) and `offset`
 * (non-negative integer) query parameters.
 */
export function parsePagination(
  params: Record<string, unknown>,
): Pagination | PaginationError {
  const limit =
    params.limit === undefined ? DEFAULT_LIMIT : Number(params.limit);
  if (!Number.isInteger(limit) || limit < 1) {
    return { field: "limit", message: "limit must be a positive integer" };
  }

  const offset =
    params.offset === undefined ? DEFAULT_OFFSET : Number(params.offset);
  if (!Number.isInteger(offset) || offset < 0) {
    return {
      field: "offset",
      message: "offset must be a non-negative integer",
    };
  }

  return { limit, offset };
}

export function isPaginationError(
  result: Pagination | PaginationError,
): result is PaginationError {
  return "field" in result;
}

function baseUrl(req: Request): string {
  // baseUrl is the router mount point (BASE_PATH), path is the rest.
  const path = `${req.baseUrl}${req.path}`;
  const host = req.get("x-forwarded-host");
  const scheme = req.get("x-forwarded-scheme");
  if (host && scheme) {
    return `${scheme}://${host}${path}`;
  }
  return `${req.protocol}://${req.get("host")}${path}`;
}

/**
 * Builds the `X-Total-Count` and `Link` (next, prev, first, last) response
 * headers. Query parameters other than limit/offset are preserved.
 */
export function buildPaginationHeaders(
  req: Request,
  { limit, offset }: Pagination,
  total: number,
): Map<string, string> {
  const base = baseUrl(req);
  const link = (newOffset: number, rel: string) => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(req.query)) {
      if (key === "limit" || key === "offset") continue;
      for (const v of Array.isArray(value) ? value : [value]) {
        if (typeof v === "string") query.append(key, v);
      }
    }
    query.set("limit", String(limit));
    query.set("offset", String(newOffset));
    return `<${base}?${query.toString()}>; rel="${rel}"`;
  };

  const links: string[] = [];
  if (offset + limit < total) {
    links.push(link(offset + limit, "next"));
  }
  if (offset > 0) {
    links.push(link(Math.max(offset - limit, 0), "prev"));
  }
  links.push(link(0, "first"));
  links.push(link(Math.max(total - limit, 0), "last"));

  return new Map([
    ["X-Total-Count", String(total)],
    ["Link", links.join(", ")],
  ]);
}
