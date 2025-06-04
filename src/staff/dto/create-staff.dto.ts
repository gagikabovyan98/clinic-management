import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateStaffDto {
  name: string;
  role: string;
  phone: string;

  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  
  specialization: string;
}
