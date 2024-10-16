export interface PurchaseOrder {
    organizationId: string;
    supplierId: string;
    taxMode: string;
    sourceOfSupply: string;
    destinationOfSupply: string;
    deliveryAddress:string;
    customerId: string;
    reference: string;
    purchaseOrder: string;
    shipmentPreference: string;
    purchaseOrderDate: string;
    expectedShipmentDate: string;
    paymentTerms: string;
    paymentMode: string;
    discountType: string;
    taxType: string;
  
    itemTable: Array<{
      itemId: string;
      itemQuantity: string;
      itemSellingPrice: string;
      itemDiscount: string;
      itemDiscountType: string;
      itemAmount: string;
      itemSgst: string;
      itemCgst: string;
      itemIgst: string;
      itemVat: string;
      itemName:string;
    }>;
  
    totalItemDiscount:string;
    otherExpense: string;
    otherExpenseReason: string;
    freight: string;
    vehicleNo: string;
    addNotes: string;
    termsAndConditions: string;
    attachFiles: string;
  
    subTotal: string;
    totalItem: string;
    sgst: string;
    cgst: string;
    igst: string;
    vat: string;
    totalDiscount:string;
    transactionDiscount:string;
    transactionDiscountType: string;
    transactionDiscountAmount:string;
    totalTaxAmount: string;
    afterTaxDiscountAmount:string;
    beforeTaxDiscountAmount:string;
    roundOff: string;
    grandTotal: string;
  }