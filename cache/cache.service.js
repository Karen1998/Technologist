class CacheService {
    cacheMaxNumber = 0;
    caches = {};

    constructor(cacheMaxNumber) {
        this.cacheMaxNumber = cacheMaxNumber;
    }

    get(key) {
        // Could return "positive" if by code below
        /*
        if (this.caches[key]) {
            return 'positive';
        }

        return -1;
        */
        return this.caches[key] || -1;
    }

    set(key, payload) {
        if (this.caches[key]) {
            return "key already exists";
        }

        const cacheKeys = Object.keys(this.caches);

        if (cacheKeys.length > this.cacheMaxNumber) {
            const firstKey = cacheKeys[0];
            delete this.caches[firstKey];
        }

        this.caches = {
            ...this.caches,
            [key]: payload,
        };
    }
}

const cacheService = new CacheService(2);
cacheService.set("John", { name: "John" });
cacheService.set("Adrian", { name: "Adrian" });
cacheService.set("David", { name: "David" });
// Uncomment if log must return -1
// cacheService.set("Angelina", { name: "Angelina" });

console.log(cacheService.get("John"));
