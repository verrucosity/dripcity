import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | undefined;

export function getSql() {
  if (!client) {
    client = neon(process.env.DATABASE_URL as string);
  }
  return client;
}
