import { IsNotEmpty, IsDateString, IsMongoId, IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGravestoneDto {
  // @ApiProperty({ description: 'Inscription on the gravestone' })
  // @IsString()
  // @IsOptional()
  // inscription?: string;

  @ApiProperty({ description: 'ID of the cemetery associated with the gravestone' })
  @IsNotEmpty()
  @IsUUID()
  cemetery: string;

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
