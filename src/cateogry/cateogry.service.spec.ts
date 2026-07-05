import { Test, TestingModule } from '@nestjs/testing';
import { CateogryService } from './cateogry.service';

describe('CateogryService', () => {
  let service: CateogryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CateogryService],
    }).compile();

    service = module.get<CateogryService>(CateogryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
