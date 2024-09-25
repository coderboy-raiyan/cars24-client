import { UserConstants } from "../constant/user.constant";

export type TUserRole = keyof typeof UserConstants.UserRoles;

export type TUser = {
  email: string;
  role: TUserRole;
  isVerified: boolean;
  isDeleted: boolean;
};
export type TRider = {
  name: string;
  email: string;
  user: TUser;
  contactNo: string;
  address: string;
  profileImg?: string;
  nidNo: string;
  passportNo: string;
  drivingLicense: string;
};
export type TAdmin = {
  name: string;
  email: string;
  contactNo: string;
  user: TUser;
  profileImg?: string;
  address: string;
};
