import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailEntity } from '../../entity/mail.entity';
import { Repository } from 'typeorm';
import { SaveMailDto } from '../../dto/save-mail.dto';
import { FindAllMailDto } from '../../dto/find-all-mail.dto';
import { MailStatusEnum } from '../../enums/mail-status.enum';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;

  const getMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            andWhere: jest.fn(),
            getMany,
            update: jest.fn(),
            findOneOrFail: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });

  afterEach(() => {
    getMany.mockRestore();
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

  describe('findAll', () => {
    test('should return a mail list with dueDate', async () => {
      const mailEntityMockList = [{ id: '1', dueDate: '2023-10-26T12:00:00Z' }];

      getMany.mockResolvedValueOnce(mailEntityMockList);

      const result = await mailService.findAll();
      expect(result).toHaveLength(1);
    });

    test('should return a filtered mail list with PENDING status', async () => {
      const mailEntityMockList = [{ id: '1', dueDate: '2023-10-26T12:00:00Z' }];
      const params: Partial<FindAllMailDto> = { status: MailStatusEnum.PENDING };

      getMany.mockResolvedValueOnce(mailEntityMockList);

      const result = await mailService.findAll(params);
      expect(result).toHaveLength(1);
    });
  });

  describe('updateStatus', () => {
    test('should update mail status with success', async () => {
      const id = '1';

      const result = await mailService.updateStatus(id, MailStatusEnum.SENT);
      expect(result).toBeUndefined();
    });
  });
});
