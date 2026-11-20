import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service.js';
import { BorrowingController } from './borrowing.controller.js';

@Module({
  providers: [BorrowingService],
  controllers: [BorrowingController],
})
export class BorrowingModule {}