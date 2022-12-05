export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  email_notification: boolean;
  last_notification_at: string;
}
