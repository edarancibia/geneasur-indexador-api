import { IsNotEmpty, IsDateString, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGravestoneDto {
  @ApiProperty({ description: 'ID of the cemetery associated with the gravestone' })
  @IsNotEmpty()
  @IsUUID()
  cemeteryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Date of death associated with the gravestone', example: '10-30-2024' })
  @IsNotEmpty()
  @IsDateString()
  dateOfDeath: string;
}
