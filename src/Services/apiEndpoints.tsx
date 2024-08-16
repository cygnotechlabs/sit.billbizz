export const endponits = {
  // Settings
  GET_ADDITIONAL_DATA: `get-additional-data`,
  CREATE_ORGANIZATION: `setup-organization`,
  GET_ONE_ORGANIZATION: `get-one-organization`,
  GET_COUNTRY_DATA:`get-countries-data`,
  GET_CURRENCY_LIST:`get-currency`,
  // Organisation Invoices
  ADD_INVOICE_SETTINGS:'add-invoice-settings',
  GET_INVOICE_SETTINGS:'get-settings',
  ADD_PAYMENT_TERMS:`add-payment-terms`,
  EDIT_PAYMENT_TERMS:`edit-payment-terms/:id`,
  DELETE_PAYMENT_TERMS:`delete-payment-terms`,
  GET_PAYMENT_TERMS:`get-all-payment-terms`,

  // Accountant
  Get_ALL_Acounts: "get-all-account",
  Get_LAST_Journel_Prefix: "get-last-journal-prefix",
  Add_NEW_Journel: "add-journal-entry",
  GET_ALL_JOURNALS: "get-all-journal",
  Add_NEW_ACCOUNT: "add-account",

  // Customer
  GET_ALL_CUSTOMER: "get-all-customer",
  ADD_CUSTOMER: "add-customer",

  // Supplier
  GET_ALL_SUPPLIER: "",

  // Settings/Taxes
  // Gst
  GET_ALL_TAX: "get-tax",
  ADD_NEW_TAX: "add-tax",
  UPDATE_TAX_VAT: `edit-tax`,

  
  // Inventory
  // Brand
  GET_ALL_BRAND: "getAllBrands",
  GET_BRAND: (id: string) => `getBrand/${id}`,
  UPDATE_BRAND: (id: string) => `updateBrand/${id}`,
  DELETE_BRAND: (id: string) => `deleteBrand/${id}`,
  ADD_BRAND: "addBrand",

  // Category
  GET_ALL_CATEGORIES: "getAllCategories",
  ADD_CATEGORY: "addCategory",
  DELETE_CATEGORY: (id: string) => `deleteCategory/${id}`,
  UPDATE_CATEGORY: (id: string) => `updateCategory/${id}`,

  // Manufacturer
  GET_ALL_MANUFACTURER: "getAllManufacturer",
  ADD_MANUFACTURER: "addManufacturer",
  DELETE_MANUFACTURER: (id: string) => `deleteManufacturer/${id}`,
  UPDATE_MANUFACTURER: (id: string) => `updateManufacturer/${id}`,

  // Rack
  GET_ALL_RACK: "get-all-rack",
  GET_RACK: (id: string) => `get-one-rack/${id}`,
  ADD_RACK: "add-rack",
  UPDATE_RACK: "update-rack",
  DELETE_RACK: (id: string) => `delete-rack/${id}`,
};
