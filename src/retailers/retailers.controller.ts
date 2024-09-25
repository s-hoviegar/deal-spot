import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { CreateRetailerDto } from './dto/create-retailer.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { RETAILER_IMAGES } from './retailers-images';

@Controller('retailers')
export class RetailersController {
  constructor(private readonly retailersService: RetailersService) {}

  // RETAILERS RATINGS crud functionalities
  @Post('ratings')
  createRating(
    @Body() createRetailerRatingDto: Prisma.RetailerRatingCreateInput,
  ) {
    return this.retailersService.createRating(createRetailerRatingDto);
  }

  @Get('ratings')
  findAllRating() {
    return this.retailersService.findAllRating();
  }

  @Get(':id/images')
  findAllImages(@Param('id') id: string) {
    return this.retailersService.findAllImages(+id);
  }

  @Get('ratings/:id')
  findOneRating(@Param('id') id: string) {
    return this.retailersService.findOneRating(+id);
  }

  @Get(':id/ratings')
  findOneRetailerRatings(@Param('id') id: string) {
    return this.retailersService.findOneRetailerRatings(+id);
  }

  @Patch('ratings/:id')
  updateRating(
    @Param('id') id: string,
    @Body() updateRetailerRatingDto: Prisma.RetailerRatingUpdateInput,
  ) {
    return this.retailersService.updateRating(+id, updateRetailerRatingDto);
  }

  @Delete('ratings/:id')
  removeRating(@Param('id') id: string) {
    return this.retailersService.removeRating(+id);
  }

  // RETAILER
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createRetailerDto: CreateRetailerDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.retailersService.create(createRetailerDto, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: TokenPayload) {
    return this.retailersService.findAll(user.userId);
  }

  @Post(':retailerId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: RETAILER_IMAGES,
        filename: (req, file, callback) => {
          callback(
            null,
            `${uuid()}_${req.params.retailerId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadRetailerImage(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Param('retailerId') id: string,
  ) {
    console.log(files);
    return this.retailersService.uploadImage(files, +id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @CurrentUser() user: TokenPayload) {
    return this.retailersService.findOne(+id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRetailerDto: Prisma.RetailerCreateInput,
  ) {
    return this.retailersService.update(+id, updateRetailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retailersService.remove(+id);
  }
}
