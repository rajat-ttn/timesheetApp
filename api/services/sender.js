'use strict';

const Promise = require('bluebird'),
  lodash = require('lodash'),
  moment = require('moment'),
  amqp = require('amqplib/callback_api'),
  //properties = require('../properties'), //properties.RabbitMqConf,

  RABBITMQ_CONF = {
  // default for local/dev
  host: 'amqp://127.0.0.1',
  queues: {
    timesheetApp: {
      sendMail: {
        name: 'sendMail', durable: true, prefetch: 1, noAck: false, persistent: true
      },
      createSpreadSheet: {
        name: 'createSpreadSheet', durable: true, prefetch: 1, noAck: false, persistent: true
      }
    }
  }
},

  msgTimeoutMs = 1500,
  sendMessage = {
    send(params) {
      const QUEUE_CONF = RABBITMQ_CONF.queues[params.entity][params.queue];

      return new Promise(function (resolve, reject) {
        if (!QUEUE_CONF) {
          console.log('Invalid queue options specified %s-%s', params && params.entity, params && params.queue);
          return reject(false);
        }

        amqp.connect(RABBITMQ_CONF.host, function (errConnect, conn) {
          if (errConnect) {
            console.log(' [x] Error connecting to RabbitMq instance -> Error:', errConnect.stack);
            return reject(errConnect);
          }

          const timeoutId = setTimeout(function () {
            console.log('sendMessage.send createChannel timeout expired');
            conn.close();
            resolve(true);
          }, msgTimeoutMs);

          conn.createChannel(function (errChannel, ch) {
            if (errChannel) {
              console.log(' [x] Error creating channel -> Error:', errChannel.stack);
              clearTimeout(timeoutId);
              conn.close();
              return reject(errChannel);
            }

            params.msg.createdAt = moment().format('MM-DD-YYYY hh:mm:ss A');
            const msg = JSON.stringify(params.msg);
            ch.assertQueue(QUEUE_CONF.name, { durable: QUEUE_CONF.durable });
            ch.sendToQueue(QUEUE_CONF.name, new Buffer(msg), { persistent: QUEUE_CONF.persistent });
            console.log(`1 item queued to ${QUEUE_CONF.name}`);

            ch.close(function () {
              clearTimeout(timeoutId);
              conn.close();
              resolve(true);
            });
          });
        });
      });
    },
    sendMany(params) {
      const QUEUE_CONF = RABBITMQ_CONF.queues[params.entity][params.queue],
        batchTimeoutMs = lodash.get(params, 'msgs.length', 0) * msgTimeoutMs || 10000000;

      return new Promise(function (resolve, reject) {
        if (!QUEUE_CONF) {
          console.log('Invalid queue options specified %s-%s', params && params.entity, params && params.queue);
          return reject(false);
        }

        amqp.connect(RABBITMQ_CONF.host, function (errConnect, conn) {
          if (errConnect) {
            console.log(' [x] Error connecting to RabbitMq instance -> Error:', errConnect.stack);
            return reject(errConnect);
          }

          const timeoutId = setTimeout(function () {
            console.log('sendMessage.sendMany createChannel timeout expired');
            conn.close();
            resolve(true);
          }, batchTimeoutMs);

          conn.createChannel(function (errChannel, ch) {
            if (errChannel) {
              console.log(' [x] Error creating channel -> Error:', errChannel.stack);
              clearTimeout(timeoutId);
              conn.close();
              return reject(errChannel);
            }

            lodash.forEach(params.msgs, function (msg) {
              msg.createdAt = moment().format('MM-DD-YYYY hh:mm:ss A');
              msg = JSON.stringify(msg);
              ch.assertQueue(QUEUE_CONF.name, { durable: QUEUE_CONF.durable });
              ch.sendToQueue(QUEUE_CONF.name, new Buffer(msg), { persistent: QUEUE_CONF.persistent });
            });
            console.log(`${params.msgs.length} items queued to ${QUEUE_CONF.name}`);

            ch.close(function () {
              clearTimeout(timeoutId);
              conn.close();
              resolve(true);
            });
          });
        });
      });
    }
  };

sendMessage.send({
  entity: 'timesheetApp',
  queue: 'sendMail',
  msg: { ISIN: 'US0378331005' }
});

module.exports = sendMessage;
