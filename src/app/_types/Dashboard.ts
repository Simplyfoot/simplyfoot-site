import { Order } from "./Order";
import { Subscription } from "./Subscription";

export type Dashboard = {
  firstname: string;
  lastname: string;
  email: string;
  club: string;
  subscription: Subscription;
  orders: Order[];
  lastLogin?: string;
};