import { IsNotEmpty, IsString } from "class-validator";

export default class ApproveUserDto {
    @IsNotEmpty()
    @IsString()
    penddingUserId: string;

    @IsNotEmpty()
    @IsString()
    approverUserId: string;
}