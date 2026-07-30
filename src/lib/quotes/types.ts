export type QuoteStatus = "new" | "read";

export type QuoteRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  roomType: string;
  squareFootage: string;
  message: string;
  photoKey?: string;
  photoContentType?: string;
  receivedAt: string;
  status: QuoteStatus;
};
