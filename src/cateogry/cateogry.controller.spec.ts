import { Test, TestingModule } from '@nestjs/testing';
import { CateogryController } from './cateogry.controller';
import { CateogryService } from './cateogry.service';

describe('CateogryController', () => {
  let controller: CateogryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CateogryController],
      providers: [CateogryService],
    }).compile();

    controller = module.get<CateogryController>(CateogryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
