const redis = require('redis');
const { promisify } = require('util');

module.exports = class RedisClient {
  constructor(w3Utils) {
    this.ready = false;
    this.w3Utils = w3Utils;
    this.client = this.getClient();

    this.existsAsync = promisify(this.client.exists).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.getKeysAsync = promisify(this.client.keys).bind(this.client);
    this.hgetAsync = promisify(this.client.hget).bind(this.client);
    this.lrangeAsync = promisify(this.client.lrange).bind(this.client);

    this.rpushAsync = promisify(this.client.rpush).bind(this.client);
    this.lremAsync = promisify(this.client.lrem).bind(this.client);
  }

  async setAsync(key, data) {
    const setAsync = promisify(this.client.set).bind(this.client);
    if(typeof data !== 'string')
      data = data.toString();

    return setAsync(key, data);
  }

  async hsetAsync(key, field, data) {
    const hsetAsync = promisify(this.client.hset).bind(this.client);
    if(typeof data !== 'string')
      data = data.toString();

    return hsetAsync(key, field, data);
  }

  async arrayUniquePush(key, element) {
    if ((await this.existsAsync(key)) != 0)
      await this.lremAsync(key, 0, element);

    await this.rpushAsync(key, element);
  }

  getClient() {
    const client = redis.createClient(process.environment.redisUrl);

    const _this = this;
    client.on('connect', function() {
      console.log('Connected to Redis');
      client.flushdb(); // To delete DB
      console.log('DB deleted');
      _this.ready = true;
    });

    return client;
  }

  async sub(key, value) {
    value = this.w3Utils.bn(value);

    let userBalance = await this.getAsync(key);
    userBalance = this.w3Utils.bn(userBalance);
    userBalance = userBalance.sub(value);

    if(userBalance.isNeg())
      throw new Error('The balance never must be negative');

    await this.setAsync(key, userBalance);
  }

  async add(key, value) {
    value = this.w3Utils.bn(value);

    let userBalance = await this.getAsync(key);
    userBalance = userBalance ? userBalance : 0;
    userBalance = this.w3Utils.bn(userBalance);
    userBalance = userBalance.add(value);
    await this.setAsync(key, userBalance);
  }
};
