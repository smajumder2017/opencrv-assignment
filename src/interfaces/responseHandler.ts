import { Response } from 'express';

export interface EnhancedResponse extends Response {
  success: (data: any, statusCode?: number, message?: string) => void;
  error: (message: string, statusCode?: number, reason?: string[]) => void;
}
