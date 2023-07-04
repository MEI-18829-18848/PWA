export class CreateNotificationDto {
  readonly title: string;
  readonly body: string;
}

export class CreatePushTokenDto {
  readonly userId: number;
  readonly pushToken: string;
}
