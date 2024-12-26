// utils/cache.js
class CacheManager {
    constructor(prefix = 'app_cache_') {
      this.prefix = prefix;
      this.defaultTTL = 3600; // 1 hour in seconds
    }
  
    generateKey(key) {
      return `${this.prefix}${key}`;
    }
  
    async set(key, data, ttl = this.defaultTTL) {
      const item = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + (ttl * 1000)
      };
  
      try {
        localStorage.setItem(
          this.generateKey(key),
          JSON.stringify(item)
        );
        return true;
      } catch (error) {
        console.error('Cache set failed:', error);
        return false;
      }
    }
  
    get(key) {
      try {
        const item = JSON.parse(
          localStorage.getItem(this.generateKey(key))
        );
  
        if (!item) return null;
  
        if (Date.now() > item.expiry) {
          this.remove(key);
          return null;
        }
  
        return item.data;
      } catch (error) {
        console.error('Cache get failed:', error);
        return null;
      }
    }
  
    remove(key) {
      localStorage.removeItem(this.generateKey(key));
    }
  
    clear() {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key));
    }
  
    cleanup() {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => {
          try {
            const item = JSON.parse(localStorage.getItem(key));
            if (Date.now() > item.expiry) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            // Invalid cache item, remove it
            localStorage.removeItem(key);
          }
        });
    }
  }
  
  export const cacheManager = new CacheManager();
  
  