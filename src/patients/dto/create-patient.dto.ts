import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreatePatientDto {
  name: string;
  date_of_birth: string;
  gender: string;
  address: string;
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}