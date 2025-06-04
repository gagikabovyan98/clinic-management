import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  staffId: number;

  @IsDateString()
  appointmentDate: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
