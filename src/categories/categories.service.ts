import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.databaseService.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return this.databaseService.category.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.category.findUnique({
      where: {
        category_id: id,
      },
    });
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.databaseService.category.update({
      where: {
        category_id: id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.category.delete({
      where: {
        category_id: id,
      },
    });
  }
}
