import { PartialType } from '@nestjs/mapped-types';
import { CreateCateogryDto } from './create-cateogry.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateCateogryDto extends PartialType(CreateCateogryDto) {
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    @IsNotEmpty()
    name: string;
}
