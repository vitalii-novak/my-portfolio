/**
 * In-memory rate limiter for Next.js API routes.
 *
 * Trade-offs vs Redis-based (e.g. Upstash):
 *  ✓ Zero extra dependencies, zero cost
 *  ✓ Good enough for a portfolio with low traffic
 *  ✗ Resets on every server restart / new deployment
 *  ✗ Does not share state across multiple server instances (serverless)
 *
 * Upgrade path: replace this file with @upstash/ratelimit when traffic grows.
 */

interface RateLimitBucket {
  timestamps: number[];
  lastSeen:   number;
}

// Module-level store — persists for the lifetime of the server process
const ipStore = new Map<string, RateLimitBucket>();

const WINDOW_DURATION_MS  = 60 * 60 * 1000; // 1 hour sliding window
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // purge stale entries every 10 min

// ── Per-endpoint limits ───────────────────────────────────────────────────────

export const LIMITS = {
  contact: 5, // max 5 contact submissions per IP per hour
  notify:  3, // max 3 notify signups per IP per hour
} as const;

type Endpoint = keyof typeof LIMITS;

// ── Stale-entry cleanup ───────────────────────────────────────────────────────
// Prevents the Map from growing unboundedly when many unique IPs hit the server.

let lastCleanup = Date.now();

function maybeCleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, bucket] of ipStore) {
    // Remove the entry entirely if it hasn't been active within the window
    if (now - bucket.lastSeen > WINDOW_DURATION_MS) {
      ipStore.delete(key);
    }
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns `true` if the request is allowed, `false` if rate-limited.
 * Automatically removes stale timestamps within a bucket and
 * periodically purges inactive buckets to prevent memory growth.
 */
export function isAllowed(ip: string, endpoint: Endpoint): boolean {
  const storeKey   = `${endpoint}:${ip}`;
  const now        = Date.now();
  const maxRequests = LIMITS[endpoint];

  maybeCleanup(now);

  const bucket = ipStore.get(storeKey) ?? { timestamps: [], lastSeen: now };

  // Remove timestamps outside the sliding window
  bucket.timestamps = bucket.timestamps.filter(
    (timestamp) => now - timestamp < WINDOW_DURATION_MS,
  );
  bucket.lastSeen = now;

  if (bucket.timestamps.length >= maxRequests) {
    ipStore.set(storeKey, bucket);
    return false; // rate limited
  }

  bucket.timestamps.push(now);
  ipStore.set(storeKey, bucket);
  return true;
}

/**
 * Extracts the real client IP from a Next.js request.
 * Checks forwarded headers first (for reverse proxies / Vercel / Cloudflare).
 *
 * Note: x-forwarded-for can be spoofed if you don't have a trusted
 * reverse proxy. On Vercel/Cloudflare the header is injected by the
 * infrastructure and the client cannot override it.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}
