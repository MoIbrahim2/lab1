import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCateogryDto {
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @IsNotEmpty()
    name: string;
}
