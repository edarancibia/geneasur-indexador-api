import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;

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
