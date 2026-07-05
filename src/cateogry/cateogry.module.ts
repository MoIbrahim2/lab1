import { Module } from '@nestjs/common';
import { CateogryService } from './cateogry.service';
import { CateogryController } from './cateogry.controller';

@Module({
  controllers: [CateogryController],
  providers: [CateogryService],
})
export class CateogryModule {}
