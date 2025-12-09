import { Order } from "./Order";
import { Subscription } from "./Subscription";

export type Dashboard = {
  firstname: string;
  lastname: string;
  email: string;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  gender_other_label?: string | null;
  club: string;
  subscription: Subscription;
  orders: Order[];
  lastLogin?: string;
};