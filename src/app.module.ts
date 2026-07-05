import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CateogryModule } from './cateogry/cateogry.module';

@Module({
  imports: [ProductModule, CateogryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
