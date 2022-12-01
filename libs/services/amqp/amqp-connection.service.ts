import { connect } from 'amqplib';
import { MessageIdentifier } from './types/message-identifier.type';

export class AmqpConnectionService {
  sendMessage(message: MessageIdentifier) {
    const connectionString = AmqpConnectionService.getConnectionString();

    connect(connectionString).then((conn) => {
      return conn.createChannel().then(function (ch) {
        const queue = message.queue;
        const msg = message.message;

        const ok = ch.assertQueue(queue, { durable: false });

        return ok.then(function (_qok) {
          ch.sendToQueue(queue, Buffer.from(msg));
          return ch.close();
        });
      });
    });
  }

  static getConnectionString() {
    const username = process.env.AMQP_USERNAME;
    const password = process.env.AMQP_PASSWORD;
    const host = process.env.AMQP_HOST;
    const port = process.env.AMQP_PORT;

    return `amqp://${username}:${password}@${host}:${port}`;
  }
}
