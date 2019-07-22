const redis = require('redis');
const { promisify } = require('util');

module.exports = class RedisClient {
  constructor(w3Utils) {
    this.w3Utils = w3Utils;
    this.client = this.getClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
  }

  async setAsync(key, data) {
    const setAsync = promisify(this.client.set).bind(this.client);
    if(typeof data !== 'string')
      data = data.toString();

    return setAsync(key, data);
  }

  async arrayRemove(key, element) {
    let userTokens = await this.getAsync(key);
    userTokens = userTokens.split(',');

    const index = userTokens.indexOf(element);
    if (index !== -1)
      userTokens.splice(index, 1);
    else
      throw new Error('The token not exists in the userTokens');

    await this.setAsync(key, userTokens);
  }

  async arrayPush(key, element) {
    let userTokens = await this.getAsync(key);
    userTokens = userTokens === null ?  [] : userTokens.split(',');
    userTokens.push(element);

    await this.setAsync(key, userTokens);
  }

  getClient() {
    // const client = require('redis').createClient(process.env.REDISCLOUD_URL);
    const client = redis.createClient('redis://rediscloud:e4dlo6FFSloasERWprVLWZBydeeqvkH0u@redis-18522.c16.us-east-1-2.ec2.cloud.redislabs.com:18522');

    client.on('connect', function() {
      console.log('Connected to Redis');
      client.flushdb(); // To delete DB
      console.log('DB deleted');
    });

    return client;
  }

  async sub(key, value) {
    value = this.w3Utils.toBN(value);

    let userBalance = await this.getAsync(key);
    userBalance = this.w3Utils.toBN(value);
    userBalance = userBalance.sub(value);

    if(userBalance.isNeg())
      throw new Error('The balance never must be negative');

    await this.setAsync(key, userBalance);
  }

  async add(key, value) {
    value = this.w3Utils.toBN(value);

    let userBalance = await this.getAsync(key);
    userBalance = this.w3Utils.toBN(value);
    userBalance = userBalance.add(value);

    await this.setAsync(key, userBalance);
  }
};
