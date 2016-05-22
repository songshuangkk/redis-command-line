const net = require('net');
const Events = require('events');
const util = require('util');

const read = process.stdin;
const out = process.stdout;

function RedisClient () {
  console.log('start redis client');
  read.on('readable', () => {
    var chunk = new Buffer(read.read());
    const str = chunk.toString("utf-8");
    if (chunk !== null && str === "redis\n") {
        // analysis the option
        if (!(redisClient instanceof RedisClient)) {
          redisClient = new RedisClient();
        }
        // connection redis server
        redisClient.connect();
    } else {
      redisClient.sendCommand(str);
    }
  });
}

var client = {};


RedisClient.prototype.connect = () => {
  /**
   * create connect server
   */
   const options = {
     host: '120.26.42.12',
     port: 6379
   }

   client = net.createConnection(options, () => {
     console.log('Connection Server OK!');
   });

   client.on('data', (chunk) => {
     console.log(chunk.toString('utf-8'));
   });
};

RedisClient.prototype.sendCommand = (commands) => {
   client.write(commands)
};

var redisClient = new RedisClient();

module.exports = redisClient;
