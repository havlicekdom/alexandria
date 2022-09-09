export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type Message = {
  type: 'error' | 'success' | 'info';
  text: string;
};
