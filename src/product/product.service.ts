import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  private products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ]

  create(createProductDto: CreateProductDto) {
    this.products.push({
      ...createProductDto,
      id: this.products.length + 1
    });
    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new HttpException(`Product with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new HttpException(`Product with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    product.name = updateProductDto.name || product.name;
    product.price = updateProductDto.price || product.price;

    return product;
  }

  remove(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new HttpException(`Product with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.products.filter((product) => product.id !== id);
  }
}
