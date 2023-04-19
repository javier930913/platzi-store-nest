import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
    private counterId = 1
    private products: Product[] = [{
        id: 1,
        name: "Product 1",
        description: "Bla Bla",
        price: 122,
        image: '',
        stock: 12,
    }];

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    create(payload: any) {
        this.counterId = this.counterId + 1
        const newProduct = {
            id: this.counterId,
            ...payload
        }
        this.products.push(newProduct);
        return newProduct
    }

    update(id: number, payload: any) {
        const product = this.findOne(id);
        if (product) {
          const index = this.products.findIndex((item) => item.id === id);
          this.products[index] = {
            ...product,
            ...payload,
          };
          return this.products[index];
        }
        return null;
      }

    update1(payload: any, id: number) {
        const product = this.findOne(id)

        for (let key in payload) {
            if (key !== 'id') {
                product[key] = payload[key]
            }
        }

        return product
    }

    update2(id: number, payload: any) {
        const found = this.products.findIndex((item) => item.id === id);
    
        if (found === -1) throw new Error('Product not found');
        this.products[found] = {
          id: id,
          ...payload,
        };
        return {
          Message: 'Product updated',
          Updated: this.products[found],
        };
      }

      remove(id: number){
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1){
            throw new NotFoundException(`Product #${id} not found`);
        }
        this.products.splice(index, 1);
        return true;
      }

      delete1(id: number) {
        const productFound = this.products.findIndex((item) => item.id === id);
        let message = '';
        if (productFound > 0) {
          this.products.splice(productFound, 1);
          message = 'product deleted';
        } else {
          message = 'product not found';
        }
        return message;
      }

      delete2(id: number) {
        const product = this.findOne(id)
        const productIndex = this.products.indexOf(product)
        this.products.splice(productIndex, 1)

        return product
    }
}
