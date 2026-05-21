import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface ApiErrors {
  field: string;
  message: string;
}

export interface ApiErrorResponse extends AxiosError {
  errors: ApiErrors[] | undefined;
}