import { Module } from '@nestjs/common';
import { MailService } from './services/mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './entity/mail.entity';
import { MailController } from './controller/mail/mail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MailEntity])],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
