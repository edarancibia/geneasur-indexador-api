import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Lastname is required' })
    lastname: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Role is required' })
    role: string;
}
