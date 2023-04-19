import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode, Res } from '@nestjs/common';

import { Response, response } from 'express'
import {ParseIntPipe} from '../common/parse-int/parse-int.pipe'

import { ProductsService  } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    //return {
    //  message: `products limit=> ${limit} products offset=> ${offset} products brand=> ${brand}`
    //};
    return this.productsService.findAll();
  }

  @Get('/filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct( @Param('productId', ParseIntPipe) productId: number) {
  //getProduct(@Res() response: Response, @Param('productId') productId: string) {
    //response.status(200).send({
    //  message: `product ${productId}`
    //});
    return this.productsService.findOne(productId)
  }

  @Post()
  create(@Body() payload: any) {
    //return {
    //  message: `Accion de crear`,
    //  payload,
    //};
    return this.productsService.create(payload)
  }

  @Put(`:id`)
  update(@Param(`id`) id: string, @Body() payload: any) {
    return this.productsService.update(Number(id), payload)
    //return {
    //  id,
    //  payload,
    //};
  }

  @Delete(`:id`)
  delete(@Param(`id`) id: number) {
    return this.productsService.remove(+id);
  }
}

