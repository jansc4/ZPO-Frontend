export class CreateBookDto {
  isbn: number | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: number | undefined;
  availableCopies: number | undefined;
}
export class GetBookDto {
  id: number | undefined;
  isbn: number | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  publicationYear: number | undefined;
  isAvailable: boolean | undefined;
}
