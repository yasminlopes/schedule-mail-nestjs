import { IsEmail, IsISO8601, IsNotEmpty } from 'class-validator';

export class SaveMailDto {
  constructor() {}

  @IsNotEmpty()
  public destinationName: string;

  @IsNotEmpty()
  @IsEmail()
  public destinationAddress: string;

  @IsNotEmpty()
  @IsISO8601()
  public dueDate: string;

  @IsNotEmpty()
  public subject: string;

  @IsNotEmpty()
  public body: string;
}
