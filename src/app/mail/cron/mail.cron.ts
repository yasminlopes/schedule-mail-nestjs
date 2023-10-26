import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../services/mail/mail.service';
import { MailStatusEnum } from '../enums/mail-status.enum';
import { SendEmailInterface } from '../../sendgrid/interfaces/send-email.interface';
import { SendgridService } from '../../sendgrid/services/sendgrid.service';

@Injectable()
export class MailCron {
  constructor(
    private readonly mailService: MailService,
    private readonly sendgridService: SendgridService,
  ) {}

  private logger = new Logger(MailCron.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async handler() {
    const mailList = await this.mailService.findAll({
      dueDateLte: new Date().toISOString(),
      status: MailStatusEnum.PENDING,
    });

    for (const mail of mailList) {
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: mail.destinationName,
                email: mail.destinationAddress,
              },
            ],
          },
        ],
        from: {
          email: 'yasmin.lopesx27@gmail.com',
          name: 'Yasmin Lopes',
        },
        reply_to: {
          email: 'suporte@pridecode.com',
          name: 'Suporte | PRIDE CODE',
        },
        subject: mail.subject,
        content: [
          {
            type: 'text/html',
            value: mail.body,
          },
        ],
      };
      await this.sendgridService.sendEmail(data);
      await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
      this.logger.log('E-mail enviado com sucesso!');
    }
  }
}
