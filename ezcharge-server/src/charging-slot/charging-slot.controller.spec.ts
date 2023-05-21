import { Test, TestingModule } from '@nestjs/testing';
import { ChargingSlotController } from './charging-slot.controller';
import { ChargingSlotService } from './charging-slot.service';

describe('ChargingSlotController', () => {
  let controller: ChargingSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargingSlotController],
      providers: [ChargingSlotService],
    }).compile();

    controller = module.get<ChargingSlotController>(ChargingSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
