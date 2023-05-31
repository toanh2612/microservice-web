import { ClassroomResponseType } from "../classroom/ClassroomResponse";

export type PaymentDetail = {
  id: string;
  classroom: ClassroomResponseType;
};
export type PaymentResponse = {
  id: string;
  amount: string;
  status: string;
  paymentDetails: PaymentDetail[];
};
