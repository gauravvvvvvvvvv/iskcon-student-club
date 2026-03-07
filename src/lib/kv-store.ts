// Local in-memory store fallback when Vercel KV is unavailable
// This is used automatically in development when KV env vars are not set
import { kv } from '@vercel/kv';

// Use globalThis to persist across hot reloads in Next.js dev mode
const globalStore = globalThis as any;
if (!globalStore.__quizMemoryStore) {
  globalStore.__quizMemoryStore = new Map<string, any>();
}
const memoryStore: Map<string, any> = globalStore.__quizMemoryStore;

// Check if KV is configured
function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function kvGet(key: string): Promise<any> {
  if (isKvConfigured()) {
    try {
      return await kv.get(key);
    } catch (e) {
      console.error(`KV get error for "${key}":`, e);
      return null;
    }
  }
  // Fallback to memory store
  return memoryStore.get(key) ?? null;
}

export async function kvSet(key: string, value: any): Promise<void> {
  if (isKvConfigured()) {
    try {
      await kv.set(key, value);
      return;
    } catch (e) {
      console.error(`KV set error for "${key}":`, e);
    }
  }
  // Fallback to memory store
  memoryStore.set(key, value);
}

export async function kvDel(key: string): Promise<void> {
  if (isKvConfigured()) {
    try {
      await kv.del(key);
      return;
    } catch (e) {
      console.error(`KV del error for "${key}":`, e);
    }
  }
  // Fallback to memory store
  memoryStore.delete(key);
}
