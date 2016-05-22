const net = require('net');
const Events = require('events');
const util = require('util');
const fs = require('fs');
const path = require('path');

const read = process.stdin;
const out = process.stdout;

var options = {
  host: 'localhost',
  port: 6379,
  password: ""
}

function RedisClient () {
  console.log('start redis client');
  // analysis the option
  getConfig(process.argv);
  read.on('readable', () => {
    var chunk = read.read();
    if (chunk === null) {
      return ;
    }
    chunk = new Buffer(chunk);
    const str = chunk.toString("utf-8");
    if (chunk !== null && str === "connect\n") {
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

   client = net.createConnection(options, () => {
     console.log('Connection Server OK!');
     // To login if has user name and user password
     if (options.password !== "") {
        redisClient.sendCommand("AUTH " + options.password + "\n");
     }
     input();
   });

   client.on('data', (chunk) => {
     console.log(chunk.toString('utf-8'));
     input();
   });
};

RedisClient.prototype.sendCommand = (commands) => {
    client.write(commands)
};

function getConfig(argv) {
  var len = argv.length;
  for (var i=0; i<len; i++) {
    // check the file flag
    if (argv[i] === '-f' && i < len-1) {
        fs.readFile(argv[i+1], (err, data) => {
          var configObj = JSON.parse(data.toString("utf-8"));
          if (configObj.host !== "") {
            options.host = configObj.host;
          }
          if (configObj.port !== "") {
            options.port = configObj.port;
          }
          if (configObj.password !== "") {
            options.password = configObj.password;
          }
        });
    }
  }
  input();
}

/**
  To input info
 */
function input() {
  if (options.host !== "") {

    process.stdout.write(options.host + ':> ');
  }
}

var redisClient = new RedisClient();

module.exports = redisClient;
