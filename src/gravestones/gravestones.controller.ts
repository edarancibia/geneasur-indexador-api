import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GravestonesService } from './gravestones.service';
import { CreateGravestoneDto } from './dtos/createGravestone.dto';
import { Gravestone } from './gravestone.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../common/cloudinary.service';

@Controller('gravestones')
export class GravestonesController {
  constructor(
    private readonly gravestonesService: GravestonesService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/campaigns',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
          cb(
            new BadRequestException('Only jpeg, jpg and png images are allowed'),
            false,
          );
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGravestoneDto: CreateGravestoneDto,
  ): Promise<Gravestone> {
    const filePath = file.path;
    const uploadedImage = await this.cloudinaryService.uploadImage(filePath);
    const secureUrl = uploadedImage.secure_url;

    return this.gravestonesService.create(createGravestoneDto, secureUrl);
  }

  @Get('/find/:id')
  async findById(@Param('id') id: string): Promise<Gravestone> {
    const gravestone = await this.gravestonesService.findGravestoneById(id);
    if (!gravestone) {
      throw new NotFoundException(`Gravestone with ID ${id} not found`);
    }
    return gravestone;
  }

  @Get('/search')
  async findByCemeteryAndLastname(
    @Query('name') name: string,
    @Query('lastname') lastname: string,
    @Query('cemeteryId') cemeteryId: string,
  ): Promise<Gravestone[]> {
    const gravestones =
      await this.gravestonesService.findGravestonesByCemeteryAndLastname(
        cemeteryId,
        name,
        lastname,
      );

    if (gravestones.length === 0) {
      throw new NotFoundException(
        `No gravestones found for cemeteryId ${cemeteryId} and lastname ${lastname}`,
      );
    }
    return gravestones;
  }
}
