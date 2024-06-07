import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { CreateBookDto, GetBookDto } from './dto/book.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};
export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
    });
  }
  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/api/auth/login',
        data,
      );
      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async addBook(
    data: CreateBookDto,
  ): Promise<ClientResponse<CreateBookDto | null>> {
    try {
      const response: AxiosResponse<CreateBookDto> = await this.client.post(
        '/api/books',
        data,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(id: number): Promise<ClientResponse<boolean>> {
    try {
      const response: AxiosResponse<boolean> = await this.client.delete(
        `/api/books/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
      return {
        success: false,
        data: false,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllBooks(): Promise<ClientResponse<GetBookDto[] | null>> {
    try {
      const response: AxiosResponse<GetBookDto[]> =
        await this.client.get(`/api/books`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError: AxiosError<Error, any> = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
