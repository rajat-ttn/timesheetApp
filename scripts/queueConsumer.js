'use strict';

const amqp = require('amqplib/callback_api'),
  ENTITY_TYPE = 'timesheetApp',
  MAIL_QUEUE_NAME = 'sendMail',
  SPREADSHEET_QUEUE_NAME = 'createSpreadSheet',
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
  MAIL_QUEUE_CONF = RABBITMQ_CONF.queues[ENTITY_TYPE][MAIL_QUEUE_NAME],
  SPREADSHEET_QUEUE_CONF = RABBITMQ_CONF.queues[ENTITY_TYPE][SPREADSHEET_QUEUE_NAME],
  logger = console,
  Promise = require('bluebird'),
  sails = require('sails');


Promise.promisifyAll(sails);

sails.loadAsync({
  hooks: {
    blueprints: false,
    controllers: false,
    cors: false,
    csrf: false,
    grunt: false,
    http: false,
    i18n: false,
    logger: false,
    // orm: leave default hook
    policies: false,
    pubsub: false,
    request: false,
    responses: false,
    // services: leave default hook,
    session: false,
    sockets: false,
    views: false,
  },
}).then(function(app){
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
      ch.assertQueue(MAIL_QUEUE_CONF.name, { durable: MAIL_QUEUE_CONF.durable });
      ch.prefetch(MAIL_QUEUE_CONF.prefetch);
      logger.info(' [*] Waiting for messages in %s. To exit press CTRL+C', MAIL_QUEUE_CONF.name);
      ch.consume(MAIL_QUEUE_CONF.name, function (msg) {
        const params = JSON.parse(msg.content.toString());
        logger.info(' [*] Received %s', params.ISIN);
        processMailQueueMsg(params)
          .then(function(data){
          })
          .catch(function(err){
            console.log('error ocurred' + err);
          })
          .finally(function(){
            ch.ack(msg);
          })
      }, { noAck: MAIL_QUEUE_CONF.noAck });
      ch.consume(SPREADSHEET_QUEUE_CONF.name, function (msg) {
        const params = JSON.parse(msg.content.toString());
        logger.info(' [*] Received %s', params.ISIN);
        processSpreadsheetQueueMsg(params)
          .then(function(data){
          })
          .catch(function(err){
            console.log('error ocurred' + err);
          })
          .finally(function(){
            ch.ack(msg);
          })
      }, { noAck: MAIL_QUEUE_CONF.noAck });
    });
  });
})
.catch(function (err) {
  console.log('error ocurred' + err);
  process.exit();
})

function processMailQueueMsg(params){
  //TODO verify below logic:-
  const payload = params.payload;
  EmailService.sendEmail(payload);
  return Promise.resolve(true);
}

function processSpreadsheetQueueMsg(params){
  //TODO verify below logic:-
  const projectInfo = params.projectInfo;
  const dateRange = params.dateRange;

  const workbook = ExcelService.createWorkbook(projectInfo, dateRange);
  return createExcelFile(`./excelSheets/${projectInfo.projectName}.xlsx`,workbook)
    .then(function(){
      console.log('excel file successfully generated');
    })
    .catch(function(err){
      console.log('error ocurred while creating excel file!' + err);
    })
}
