
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BorrowingService {
  constructor(private prisma: PrismaService) {}

  // Borrow a book
  async borrowBook(userId: string, bookId: string, dueDate: Date) {
    return this.prisma.$transaction(async (tx) => {
      const book = await tx.book.findUnique({
        where: { id: bookId },
      });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      if (!book.isAvailable) {
        throw new BadRequestException('Book is already borrowed');
      }

      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updatedBook = await tx.book.updateMany({
        where: {
          id: bookId,
          isAvailable: true,
        },
        data: {
          isAvailable: false,
        },
      });

      if (updatedBook.count === 0) {
        throw new BadRequestException('Book is no longer available');
      }

      return tx.borrowing.create({
        data: {
          userId,
          bookId,
          dueDate,
        },
      });
    });
  }

  // Return a book
  async returnBook(borrowingId: string) {
    return this.prisma.$transaction(async (tx) => {
      const borrowing = await tx.borrowing.findUnique({
        where: { id: borrowingId },
      });

      if (!borrowing) {
        throw new NotFoundException('Borrowing record not found');
      }

      if (borrowing.returnedAt) {
        throw new BadRequestException('This book has already been returned');
      }

      const updated = await tx.borrowing.updateMany({
        where: {
          id: borrowingId,
          returnedAt: null,
        },
        data: {
          returnedAt: new Date(),
        },
      });

      if (updated.count === 0) {
        throw new BadRequestException('This book has already been returned');
      }

      await tx.book.update({
        where: { id: borrowing.bookId },
        data: { isAvailable: true },
      });

      return tx.borrowing.findUnique({
        where: { id: borrowingId },
      });
    });
  }
}

