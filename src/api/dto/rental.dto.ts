import { GetBookDto } from './book.dto';
import { GetUserDto } from './user.dto';

export class GetRentalDto {
  loanId: number | undefined;
  book: GetBookDto | undefined;
  user: GetUserDto | undefined;
  rentalDate: Date | undefined;
  endRentalDate: Date | undefined;
  returnDate: Date | undefined;
}
export class CreateRentalDto {
  book: number | undefined;
  user: number | undefined;
  rentalDate: Date | undefined;
  endRentalDate: Date | undefined;
}
export class ReturnBookDto {
  loanId: number | undefined;
  returnDate: Date | undefined;
}
