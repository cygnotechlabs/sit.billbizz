export interface SalesQuote {
    customerId: string;
    customerName: string;
    placeOfSupply: string;
    reference: string;
    salesOrderDate: string;
    expiryDate: string;
    subject: string;
    items: {
      itemId: string;
      itemName: string;
      quantity: string;
      sellingPrice: string;
      taxGroup: string;
      cgst: string;
      sgst: string;
      igst: string;
      vat: string;
      itemTotaltax: string;
      discountType: string;
      discountAmount: string;
      amount: string;
    }[];
    note: string;
    tc: string;
    discountType: string;
    discountTransactionType: string;
    discountTransactionAmount: string;
    discountTax: string;
    subTotal: string;
    totalItem: string;
    cgst: string;
    sgst: string;
    igst: string;
    vat: string;
    totalTax: string;
    totalAmount: string;
  }
  