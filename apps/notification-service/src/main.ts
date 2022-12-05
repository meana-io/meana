import { connect } from 'amqplib';
import { AmqpConnectionService } from '../../../libs/services/amqp/amqp-connection.service';
import { EmailService } from './app/services/email.service';

const connectionString = AmqpConnectionService.getConnectionString();
const emailService = new EmailService();
connect(connectionString)
  .then(function (conn) {
    process.once('SIGINT', function () {
      conn.close();
    });
    return conn.createChannel().then(function (ch) {
      let ok = ch.assertQueue('meana_messages', { durable: false });

      ok = ok.then(function (_qok) {
        return ch.consume(
          'meana_messages',
          function (msg) {
            emailService.send(msg.content.toString());
          },
          { noAck: true }
        );
      });

      return ok;
    });
  })
  .catch(console.warn);
