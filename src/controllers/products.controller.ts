import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {

    @Get()
      getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
      return {
        message: `products limit=> ${limit} products offset=> ${offset} products brand=> ${brand}`
      };
    }

    @Get('/filter')
      getProductFilter() {
      return {
        message: `Yo soy un filter`
      };
    }

    @Get('/:productId')
      getProduct(@Param('productId') productId: string) {
      return {
        message: `product ${productId}`
      };
    }

    @Post()
    create(@Body() payload: any){
      return{
        message: `Accion de crear`,
        payload,
      };
    }

    @Put(`:id`)
    update(@Param(`id`) id: number, @Body() payload: any){
       return {
          id,
          payload,
       }; 
    }

    @Delete(`:id`)
    delete(@Param(`id`) id: number){
      return id;
    }
}

