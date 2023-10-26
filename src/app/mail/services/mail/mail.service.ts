import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MailEntity } from '../../entity/mail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveMailDto } from '../../dto/save-mail.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(MailEntity)
    private readonly mailRepository: Repository<MailEntity>,
  ) {}

  public async save(data: SaveMailDto): Promise<MailEntity> {
    return this.mailRepository.save(this.mailRepository.create(data));
  }

  public async findAll(params?: Partial<FindAllMailDto>) {
    const query = this.mailRepository.createQueryBuilder('mail');

    if (params?.dueDateLte) {
      query.andWhere('mail.dueDate <= :dueDateLte', { dueDateLte: params.dueDateLte });
    }

    if (params?.status) {
      query.andWhere('mail.status = :status', { status: params.status });
    }

    return query.getMany();
  }

}
