import { Test, TestingModule } from '@nestjs/testing';
import { ChargingSlotService } from './charging-slot.service';

describe('ChargingSlotService', () => {
  let service: ChargingSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargingSlotService],
    }).compile();

    service = module.get<ChargingSlotService>(ChargingSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
