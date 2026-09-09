const attempts = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    return false;
  }
  return entry.count >= limit;
}

export function recordAttempt(key: string, windowMs: number) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  entry.count += 1;
}
