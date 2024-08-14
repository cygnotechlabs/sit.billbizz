export const endponits = {
  GET_ADDITIONAL_DATA: `get-additional-data`,
  CREATE_ORGANIZATION: `setup-organization`,
  GET_ONE_ORGANIZATION: `get-one-organization`,
  GET_COUNTRY_DATA: `get-countries-data`,
  GET_CURRENCY_LIST: `get-currency`,

  // Accountant
  Get_ALL_Acounts: "get-all-account",
  Get_LAST_Journel_Prefix: "get-last-journal-prefix",
  Add_NEW_Journel: "add-journal-entry",
  GET_ALL_JOURNALS: "get-all-journal",
  Add_NEW_ACCOUNT: "add-account",

  //customer
  GET_ALL_CUSTOMER: "get-all-customer",
  ADD_CUSTOMER: "add-customer",

  // Supplier
  GET_ALL_SUPPLIER: "",

  //Currency 
  GET_CURRENCIES:"get-currency",
  ADD_CURRENCIES:"add-currency",
DELETE_CURRENCIES:(id:string)=>`delete-currency/${id}`,
EDIT_CURRENCIES:`edit-currency`,



  // Inventory

  // Brand
  GET_ALL_BRAND: "getAllBrands",
  GET_BRAND: (id: string) => `getBrand/${id}`,
  UPDATE_BRAND: (id: string) => `updateBrand/${id}`,
  DELETE_BRAND: (id: string) => `deleteBrand/${id}`,
  ADD_BRAND: "addBrand",
};
