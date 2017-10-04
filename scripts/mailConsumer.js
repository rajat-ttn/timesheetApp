'use strict';

const amqp = require('amqplib/callback_api'),
  ENTITY_TYPE = 'timesheetApp',
  QUEUE_NAME = 'sendMail',
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
  QUEUE_CONF = RABBITMQ_CONF.queues[ENTITY_TYPE][QUEUE_NAME],
  logger = console,
  Promise = require('bluebird');

amqp.connect(RABBITMQ_CONF.host, function (err, conn) {
  if (err) {
    logger.info('Error connecting to RabbitMq instance -> Error: %s ', JSON.stringify(err));
    process.exit(1);
  }
  conn.createChannel(function (err, ch) {
    if (err) {
      logger.info('Error creating channel -> Error: %s ', JSON.stringify(err));
      process.exit(1);
    }
    ch.assertQueue(QUEUE_CONF.name, { durable: QUEUE_CONF.durable });
    ch.prefetch(QUEUE_CONF.prefetch);
    logger.info(' [*] Waiting for messages in %s. To exit press CTRL+C', QUEUE_CONF.name);
    ch.consume(QUEUE_CONF.name, function (msg) {
      const params = JSON.parse(msg.content.toString());
      logger.info(' [*] Received %s', params.ISIN);
      processMsg(params)
        .then(function(data){
        })
        .catch(function(err){
          console.log('error ocurred' + err);
        })
        .finally(function(){
          ch.ack(msg);
        })
    }, { noAck: QUEUE_CONF.noAck });
  });
});

function processMsg(params){
//TODO write logic to actually send mails.
return Promise.resolve(true);
}
