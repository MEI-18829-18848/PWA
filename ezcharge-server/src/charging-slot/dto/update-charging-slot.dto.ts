import { PartialType } from '@nestjs/mapped-types';
import { CreateChargingSlotDto } from './create-charging-slot.dto';

export class UpdateChargingSlotDto extends PartialType(CreateChargingSlotDto) {}
