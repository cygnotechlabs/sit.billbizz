import { RouteObject } from "react-router-dom";
import ExpenseHome from "../features/expense/ExpenseHome/ExpenseHome";
import ExpenseView from "../features/expense/ExpenseHome/ExpenseView";
import Expense from "../pages/Expense";

const ExpenseRoutes: RouteObject[] = [
  { path: "/expense", element: <Expense /> },
  { path: "/expense/home", element: <ExpenseHome /> },
  { path: "/expense/view", element: <ExpenseView /> },
];

export default ExpenseRoutes;
