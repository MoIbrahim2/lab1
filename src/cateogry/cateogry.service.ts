import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCateogryDto } from './dto/create-cateogry.dto';
import { UpdateCateogryDto } from './dto/update-cateogry.dto';

@Injectable()
export class CateogryService {

  private categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ]

  create(createCateogryDto: CreateCateogryDto) {
    this.categories.push({
      ...createCateogryDto,
      id: this.categories.length + 1
    });
    return this.categories;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new HttpException(`Category with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return category;
  }

  update(id: number, updateCateogryDto: UpdateCateogryDto) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new HttpException(`Category with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    category.name = updateCateogryDto.name || category.name;
    return category;
  }

  remove(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new HttpException(`Category with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.categories.filter((category) => category.id !== id);
  }
}
