import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  HttpCode,
  Body,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IsDefined, IsUUID } from 'class-validator';

class DTO {
  @IsDefined()
  name: string;
}

class UUID {
  @IsUUID()
  id: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(StatusCodes.OK)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  // @HttpCode(StatusCodes.OK)
  test() {
    // return '<h1>Test</h1>';
    throw new HttpException(ReasonPhrases.FORBIDDEN, StatusCodes.FORBIDDEN);
  }

  @Get('test/:id')
  @HttpCode(StatusCodes.CREATED)
  withParams(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Body() data: any,
  ) {
    console.log(data);
    return `<h1>params: id -> <strong>${id}</strong></h1>`;
  }

  @Post()
  create(@Body() data: DTO) {
    console.log(data);
  }
}
