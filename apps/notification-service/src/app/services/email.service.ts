import { NotificationService } from './notification.service';
import * as sgMail from '@sendgrid/mail';

export class EmailService extends NotificationService {
  public send(message: string): boolean {
    const dto = JSON.parse(message);
    let sent = false;

    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
      to: dto.to,
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
