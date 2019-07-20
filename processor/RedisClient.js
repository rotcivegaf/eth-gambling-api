const redis = require('redis');
const { promisify } = require('util');

module.exports = class RedisClient {
  constructor() {
    this.client = this.getClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
  }

  async setAsync(key, data) {
    const setAsync = promisify(this.client.set).bind(this.client);
    if(typeof data !== 'string')
      data = data.toString();

    return setAsync(key, data);
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
};
