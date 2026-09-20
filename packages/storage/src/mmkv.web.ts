const memory = new Map<string, string>();

function read(key: string): string | undefined {
  try {
    if (typeof localStorage === 'undefined') {
      return memory.get(key);
    }
    return localStorage.getItem(key) ?? undefined;
  } catch {
    return memory.get(key);
  }
}

function write(key: string, value: string) {
  memory.set(key, value);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // private mode / SSR
  }
}

function remove(key: string) {
  memory.delete(key);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch {
    // private mode / SSR
  }
}

/** Web stand-in for MMKV. Same getString / set / remove surface. */
export const storage = {
  getString: read,
  set: write,
  remove,
};
