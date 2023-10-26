import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailEntity } from '../../entity/mail.entity';
import { Repository } from 'typeorm';
import { SaveMailDto } from '../../dto/save-mail.dto';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });

  describe('save', () => {
    test('should save a new mail on success', async () => {
      const data: SaveMailDto = {
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

      jest.spyOn(mailRepository, 'create').mockReturnValueOnce(mailEntityMock);
      jest.spyOn(mailRepository, 'save').mockResolvedValueOnce(mailEntityMock);

      const result = await mailService.save(data);

      expect(result).toBeDefined();
      expect(mailRepository.create).toBeCalledTimes(1);
      expect(mailRepository.save).toBeCalledTimes(1);
    });
  });
});
