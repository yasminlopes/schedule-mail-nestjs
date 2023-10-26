import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from '../../services/mail/mail.service';
import { SaveMailDto } from '../../dto/save-mail.dto';
import { MailEntity } from '../../entity/mail.entity';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailController).toBeDefined();
    expect(mailService).toBeDefined();
  });

  describe('save', () => {
    test('should save a new mail on success', async () => {
      const body: SaveMailDto = {
        destinationName: 'Cliente',
        destinationAddress: 'cliente@tuamaeaquelaursa.com',
        dueDate: '2023-10-26T12:00:00.000Z',
        subject: 'Teste',
        body: '<h1>Teste</h1>',
      };

      const mailEntityMock = {
        destinationName: 'Cliente',
        destinationAddress: 'cliente@tuamaeaquelaursa.com',
        dueDate: '2023-10-26T12:00:00.000Z',
        subject: 'Teste',
        body: '<h1>Teste</h1>',
      } as MailEntity;

      jest.spyOn(mailService, 'save').mockResolvedValueOnce(mailEntityMock);

      const result = await mailController.save(body);

      expect(result).toBeDefined();
      expect(mailService.save).toBeCalledTimes(1);
    });
  });
});
