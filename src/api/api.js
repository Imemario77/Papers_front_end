import axios from "axios";

const apiRoute = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// authentication server routing
export const login = (formData) => apiRoute.post("/auth/login", formData);

export const logout = () => apiRoute.post("/auth/logout");

export const signup = (formData) => apiRoute.post("/auth/signup", formData);

export const registerBusiness = (formData) =>
  apiRoute.post("/business/create", formData);

export const getBusiness = () => apiRoute.get("/business/fetch");

export const getBusinessStaffs = () =>
  apiRoute.get("/business/fetch/allStaffs");

export const addNewUser = (formData) =>
  apiRoute.put("/business/add/user", formData);

export const removeUserFromBusiness = (formData) =>
  apiRoute.put("/business/remove/user", formData);

export const updateUserRole = (formData) =>
  apiRoute.put("/business/update/user/role", formData);

export const addVendor = (formData) => apiRoute.post("/vendor/add", formData);

export const editBusinessVendor = (formData) =>
  apiRoute.put("/vendor/edit", formData);

export const getAllVendor = () => apiRoute.get("/vendor/get");

export const deleteVendor = (formData) =>
  apiRoute.delete("/vendor/remove/" + formData);

export const addExpenses = (formData) =>
  apiRoute.post("/expenses/add-expenses", formData);

export const getAllExpenses = () => apiRoute.get("/expenses/get-all-expenses");

export const getExpensesChartData = (time) =>
  apiRoute.get("/expenses/getChartData/" + time);

export const getOneExpenses = (expenseId) =>
  apiRoute.get("/expenses/get-one-expenses/" + expenseId);

export const getExpensesDashBoardAmount = (time) =>
  apiRoute.get(`/expenses/getAmount/${time}`);

export const deleteExpenses = (formData) =>
  apiRoute.delete("/expenses/delete-expenses/" + formData);

export const createProduct = (formData) =>
  apiRoute.post("/product/create", formData);

export const getAllProducts = () => apiRoute.get("/product/get");

export const restockProduct = (formData) =>
  apiRoute.post("/product/restock", formData);

export const deleteOneProduct = (productCode) =>
  apiRoute.delete("/product/delete/" + productCode);

export const addCustomer = (formData) =>
  apiRoute.post("/customer/add", formData);

export const getAllCustomer = () => apiRoute.get("/customer/get");

export const editBusinessCustomer = (formData) =>
  apiRoute.put("/customer/edit", formData);

export const deleteCustomer = (formData) =>
  apiRoute.delete("/customer/remove/" + formData);

// sales route
export const createSales = (formData) =>
  apiRoute.post("/sales/create", formData);

export const getBusinessSales = () => apiRoute.get("/sales/find");

export const deleteOneSales = (id) => apiRoute.delete("/sales/delete/" + id);

export const getSalesDashBoardAmount = (time) =>
  apiRoute.get(`/sales/getAmount/${time}`);

export const getOneSales = (saleId) =>
  apiRoute.get("/sales/get-one-sale/" + saleId);

//  invoice route
export const createInvoice = (formData) =>
  apiRoute.post("/invoice/create", formData);

export const getAllInvoice = () => apiRoute.get("/invoice/get-all-invoice");

export const getOneInvoice = (invoiceId) =>
  apiRoute.get("/invoice/get-one-invoices/" + invoiceId);

export const getOverDuedInvoiceAmount = (time) =>
  apiRoute.get("/invoice/getAmount/" + time);

export const deleteInvoice = (invoiceId) =>
  apiRoute.delete("/invoice/delete-invoices/" + invoiceId);

// user profile

export const updateFirstame = (formData) =>
  apiRoute.post("/user/firstname", formData);

export const updateLastname = (formData) =>
  apiRoute.post("/user/lastname", formData);

export const updateEmail = (formData) => apiRoute.post("/user/email", formData);

export const updateNumber = (formData) =>
  apiRoute.post("/user/number", formData);

export const updatePassword = (formData) =>
  apiRoute.post("/user/password", formData);

export const resetPassword = (formData) =>
  apiRoute.post("/user/reset/password", formData);

// otp route
export const verifyOtp = (formData) => apiRoute.post("/otp/verify", formData);

export const resendOtp = (formData) => apiRoute.post("/otp/resend", formData);
export const deleteAndResetPassword = (formData) =>
  apiRoute.post("/otp/password", formData);
