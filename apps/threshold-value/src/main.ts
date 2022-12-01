import { connect } from 'amqplib';
import { AmqpConnectionService } from '../../../libs/services/amqp/amqp-connection.service';
import { ThresholdsService } from './app/services/thresholds.service';

const connectionString = AmqpConnectionService.getConnectionString();
const thresholdService = new ThresholdsService();

const amqp = new AmqpConnectionService();

function sendToMessage(messageToSend) {
  const message = {
    message: JSON.stringify(messageToSend),
    queue: 'meana_messages',
  };
  amqp.sendMessage(message);
}

connect(connectionString)
  .then(function (conn) {
    process.once('SIGINT', function () {
      conn.close();
    });
    return conn.createChannel().then(function (ch) {
      let ok = ch.assertQueue('meana_agent', { durable: false });

      ok = ok.then(function (_qok) {
        return ch.consume(
          'meana_agent',
          function (msg) {
            thresholdService
              .checkThreshold(msg.content.toString())
              .then((response) =>
                response.map((_response) => sendToMessage(_response))
              );
          },
          { noAck: true }
        );
      });

      return ok;
    });
  })
  .catch(console.warn);
