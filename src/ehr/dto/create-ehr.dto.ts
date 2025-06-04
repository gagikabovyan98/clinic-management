import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEhrDto {
  @IsInt()
  patientId: number;

  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
