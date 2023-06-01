export const LocalStorage = {
  get<T>(key: string): T | undefined {
    try {
      const serialItem = localStorage.getItem(key);

      return serialItem ? (JSON.parse(serialItem) as T) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
  set<T>(key: string, value: T) {
    try {
      const serialItem = JSON.stringify(value);
      localStorage.setItem(key, serialItem);
    } catch (e) {
      console.error(e);
    }
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
