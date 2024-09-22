import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCemeteryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly cityId: string;
  }
