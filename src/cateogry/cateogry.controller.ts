import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CateogryService } from './cateogry.service';
import { CreateCateogryDto } from './dto/create-cateogry.dto';
import { UpdateCateogryDto } from './dto/update-cateogry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CateogryController {
  constructor(private readonly cateogryService: CateogryService) { }

  @Post()
  create(@Body() createCateogryDto: CreateCateogryDto) {
    return this.cateogryService.create(createCateogryDto);
  }

  @Get()
  findAll() {
    return this.cateogryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cateogryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCateogryDto: UpdateCateogryDto) {
    return this.cateogryService.update(+id, updateCateogryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.cateogryService.remove(+id);
  }
}
