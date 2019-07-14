const redis = require('redis');

const env = require('../environment.js');

module.exports = class RedisClient {
  constructor() {
    this.client = getClient();
  }

  async set(key, data) {
    await this.client.set(key, data, redis.print);
  }

  async hmset(commit) {
    await this.client.hmset(key, dataObject, redis.print);
  }

//client.hmset('frameworks', {
//    'javascript': 'AngularJS',
//    'css': 'Bootstrap',
//    'node': 'Express'
//});

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
