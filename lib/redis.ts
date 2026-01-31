import Redis from 'ioredis'

// Redis client singleton
let redis: Redis | null = null

export function getRedisClient(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    })

    redis.on('error', (err) => {
      console.error('Redis connection error:', err)
    })

    redis.on('connect', () => {
      console.log('Connected to Redis')
    })
  }

  return redis
}

// Helper functions for common operations
export async function getFromRedis<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient()
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Redis get error:', error)
    return null
  }
}

export async function setInRedis<T>(
  key: string,
  value: T,
  expirationSeconds?: number
): Promise<boolean> {
  try {
    const client = getRedisClient()
    const stringValue = JSON.stringify(value)

    if (expirationSeconds) {
      await client.setex(key, expirationSeconds, stringValue)
    } else {
      await client.set(key, stringValue)
    }

    return true
  } catch (error) {
    console.error('Redis set error:', error)
    return false
  }
}

export async function deleteFromRedis(key: string): Promise<boolean> {
  try {
    const client = getRedisClient()
    await client.del(key)
    return true
  } catch (error) {
    console.error('Redis delete error:', error)
    return false
  }
}

export async function getListFromRedis<T>(key: string): Promise<T[]> {
  try {
    const client = getRedisClient()
    const data = await client.lrange(key, 0, -1)
    return data.map((item) => JSON.parse(item))
  } catch (error) {
    console.error('Redis list get error:', error)
    return []
  }
}

export async function addToRedisList<T>(key: string, value: T): Promise<boolean> {
  try {
    const client = getRedisClient()
    await client.rpush(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Redis list add error:', error)
    return false
  }
}

// Disconnect function for cleanup
export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit()
    redis = null
  }
}

// Check if Redis is available (for graceful degradation)
export async function isRedisAvailable(): Promise<boolean> {
  try {
    const client = getRedisClient()
    await client.ping()
    return true
  } catch {
    return false
  }
}
