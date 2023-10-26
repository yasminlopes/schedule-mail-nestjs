import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MailStatusEnum } from '../enums/mail-status.enum';

@Entity({ name: 'mails' })
export class MailEntity {
  constructor() {}

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'destination_name', nullable: false })
  public destinationName: string;

  @Column({ name: 'destination_address', nullable: false })
  public destinationAddress: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: false })
  public dueDate: string;

  @Column({ nullable: true })
  public subject: string;

  @Column({ type: 'text', nullable: true })
  public body: string;

  @Column({ default: MailStatusEnum.PENDING })
  public status: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: string;
}
