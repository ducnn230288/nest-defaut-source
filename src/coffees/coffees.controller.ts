import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create.coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update.coffee.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Coffee } from './entities/coffee.entity';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
    return await this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Coffee> {
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return await this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    return await this.coffeesService.update(id, updateCoffeeDto);
    // return { message: 'Success', result };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Coffee> {
    return await this.coffeesService.remove(id);
  }
}
