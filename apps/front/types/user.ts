export default interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  email_notifications: boolean;
  push_notifications: boolean;
  last_notification_at: string;
  createdAt: string;
  updatedAt: string;
}
