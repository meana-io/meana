export abstract class NotificationService {
  public abstract send(message: string): boolean;
}
