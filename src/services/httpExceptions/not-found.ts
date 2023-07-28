import { HttpException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const notFound = new HttpException(
  ReasonPhrases.NOT_FOUND,
  StatusCodes.NOT_FOUND,
);
