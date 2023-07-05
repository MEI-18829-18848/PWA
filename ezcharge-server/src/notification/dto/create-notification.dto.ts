import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;
}

export class CreatePushTokenDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  pushToken: string;
}
