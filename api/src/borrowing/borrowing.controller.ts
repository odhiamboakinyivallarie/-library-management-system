import { Controller, Post, Body, Param } from '@nestjs/common';
import { BorrowingService } from './borrowing.service.js';

@Controller('borrowing')
export class BorrowingController {
  constructor(private borrowingService: BorrowingService) {}

  @Post()
  borrowBook(
    @Body('userId') userId: string,
    @Body('bookId') bookId: string,
    @Body('dueDate') dueDate: string,
  ) {
    return this.borrowingService.borrowBook(
      userId,
      bookId,
      new Date(dueDate),
    );
  }

  @Post(':id/return')
  returnBook(@Param('id') borrowingId: string) {
    return this.borrowingService.returnBook(borrowingId);
  }
}