import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendgridService } from './sendgrid.service';
import { SendEmailInterface } from '../interfaces/send-email.interface';

describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with success', async () => {
      // arrange
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: 'Cliente',
                email: 'cliente@tuamaeaquelaursa.com',
              },
            ],
          },
        ],
        from: {
          email: 'thepridecode@gmail.com',
          name: 'Pride Code',
        },
        reply_to: {
          email: 'suporte@pridecode.com',
          name: 'Suporte',
        },
        subject: 'Sua fatura chegou!',
        content: [
          {
            type: 'text/html',
            value: '<p>Sua fatura chegou!</p>',
          },
        ],
      };

      const response: any = {
        status: 202,
        statusText: 'ACCEPTED',
        config: { headers: {} },
        headers: {},
        data: '',
      };

      jest.spyOn(httpService, 'post').mockReturnValueOnce(of(response));
      // act
      const result = await sendGridService.sendEmail(data);
      // assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
