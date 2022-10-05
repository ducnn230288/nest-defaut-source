import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeRequestDto } from './dto/request/create.coffee.request.dto';
import { PaginationQueryDto } from '../../common/dto/pagination.query.dto';
import { UpdateCoffeeRequestDto } from './dto/request/update.coffee.request.dto';
import { ListCoffeeResponseDto } from './dto/response/list.coffee.response.dto';
import { CoffeeResponseDto } from './dto/response/coffee.response.dto';
import { Headers, Public } from '../../decorators';
import { SerializerBody } from '../../common/pipe/serializer-body.pipe';

@Headers('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public({
    summary: 'Get List Coffees',
  })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<ListCoffeeResponseDto> {
    return {
      message: 'Get List success',
      count: 0,
      data: await this.coffeesService.findAll(paginationQuery),
    };
  }

  @Public({
    summary: 'Get Detail Coffee',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CoffeeResponseDto> {
    return {
      message: 'Update Success',
      data: await this.coffeesService.findOne(id),
    };
  }

  @Public({
    summary: 'Create Coffee',
  })
  @Post()
  async create(@Body(new SerializerBody()) createCoffeeDto: CreateCoffeeRequestDto): Promise<CoffeeResponseDto> {
    return {
      message: 'create Success',
      data: await this.coffeesService.create(createCoffeeDto),
    };
  }

  @Public({
    summary: 'Update Coffee',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SerializerBody()) updateCoffeeDto: UpdateCoffeeRequestDto,
  ): Promise<CoffeeResponseDto> {
    return {
      message: 'Update Success',
      data: await this.coffeesService.update(id, updateCoffeeDto),
    };
  }

  @Public({
    summary: 'Delete Coffee',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CoffeeResponseDto> {
    return {
      message: 'Delete Success',
      data: await this.coffeesService.remove(id),
    };
  }
}
