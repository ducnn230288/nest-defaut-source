import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeRequestDto } from './dto/create.coffee.request.dto';
import { PaginationQueryDto } from '../common/dto/pagination.query.dto';
import { UpdateCoffeeRequestDto } from './dto/update.coffee.request.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { ListCoffeeResponsesDto } from './dto/list.coffee.responses.dto';
import { CoffeeResponsesDto } from './dto/coffee.responses.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<ListCoffeeResponsesDto> {
    return {
      message: 'Get List success',
      count: 0,
      data: await this.coffeesService.findAll(paginationQuery),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CoffeeResponsesDto> {
    return {
      message: 'Update Success',
      data: await this.coffeesService.findOne(id),
    };
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeRequestDto): Promise<CoffeeResponsesDto> {
    return {
      message: 'create Success',
      data: await this.coffeesService.create(createCoffeeDto),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeRequestDto,
  ): Promise<CoffeeResponsesDto> {
    return {
      message: 'Update Success',
      data: await this.coffeesService.update(id, updateCoffeeDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CoffeeResponsesDto> {
    return {
      message: 'Delete Success',
      data: await this.coffeesService.remove(id),
    };
  }
}
