import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notfication.dto';

export class UpdateNotficationDto extends PartialType(CreateNotificationDto) {}
