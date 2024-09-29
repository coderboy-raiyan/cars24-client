import { BookingConstants } from "../constant/booking.constant";
import { TCar } from "./car.type";
import { TUser } from "./user.type";

export type TBookingStatusEnum =
  (keyof typeof BookingConstants.BookingStatus)[];
export type TPaymentStatusEnum =
  (keyof typeof BookingConstants.PaymentStatus)[];

export type TBooking = {
  _id: string;
  date: string;
  user: TUser;
  car: TCar;
  status: keyof typeof BookingConstants.BookingStatus;
  startTime: string;
  endTime: string;
  totalCoast: number;
  isApproved: boolean;
  paymentStatus: keyof typeof BookingConstants.PaymentStatus;
};
