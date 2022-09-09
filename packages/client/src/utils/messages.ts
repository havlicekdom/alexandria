import { ErrorResponse, Message } from 'types/messages';

export const createSuccessMessage = (text: string): Message => ({
  type: 'success',
  text,
});

export const createInfoMessage = (text: string): Message => ({
  type: 'info',
  text,
});

export const createErrorMessage = (text: string): Message => ({
  type: 'error',
  text,
});

export const parseErrorToMessage = (error: ErrorResponse): Message => createErrorMessage(`${error.statusCode}: ${error.message}`);
