const redis = require('redis');

const env = require('../environment.js');

module.exports = class RedisClient {
  constructor() {
    this.client = getClient();
  }

  async set(commit) {
    await this.client.set(commit.key, commit.data, redis.print);
  }

  async get(commit) {
    await this.client.get('my test key', function (error, result) {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log('GET result ->' + result);
    });
  }
};

function getClient() {
  const client = require('redis').createClient(process.env.REDISCLOUD_URL);
  
  client.on('connect', function() {
    console.log('Connected to Redis');
    client.flushdb(); // To delete DB
  });

  return client;
}
