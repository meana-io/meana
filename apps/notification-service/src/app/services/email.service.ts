import { NotificationService } from './notification.service';
import * as sgMail from '@sendgrid/mail';
import { DateTime } from 'luxon';

export class EmailService extends NotificationService {
  public send(message: string): boolean {
    const dto = JSON.parse(message) as {
      to: { email: string; lastNotifiedAt: string }[];
      nodeName: string;
      property: string;
      actual: string;
    };
    let sent = false;
    const apiKey = process.env.SENDGRID_APIKEY;

    if (!apiKey) {
      return null;
    }

    sgMail.setApiKey(process.env.SENDGRID_APIKEY);

    const users = dto.to.filter(
      (user) =>
        DateTime.fromISO(user.lastNotifiedAt).plus({ minute: 5 }) <
        DateTime.now()
    );

    const msg = {
      to: users,
      from: 'noreply@meana.ovh',
      subject: 'MEANA - status of exceeding the allowed thresholds',
      text: `Node: ${dto.nodeName} \r\n Exceed ${dto.property} with value ${dto.actual}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        sent = true;
      })
      .catch((error) => {
        console.error(error);
      });

    return sent;
  }
}
