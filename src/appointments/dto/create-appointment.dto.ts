import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  staffId: number;

  @IsDateString()
  @IsNotEmpty()
  appointmentDate: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsInt()
  roomId: number;
}
