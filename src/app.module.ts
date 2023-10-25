import { Module } from '@nestjs/common';
import { SendgridModule } from './app/sendgrid/sendgrid.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [SendgridModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
