import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendgridModule } from './app/sendgrid/sendgrid.module';

@Module({
  imports: [SendgridModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
