import React, { createContext, useState, ReactNode } from "react";

interface CashResponseContextType {
  cashResponse: any;
  setCashResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface BankResponseContextType {
  bankResponse: any;
  setBankResponse: React.Dispatch<React.SetStateAction<any>>;
}
interface GstResponseContextType {
  gstResponse: any;
  setGstResponse: React.Dispatch<React.SetStateAction<any>>;
}
interface VatResponseContextType {
  vatResponse: any;
  setVatResponse: React.Dispatch<React.SetStateAction<any>>;
}



export const cashResponseContext = createContext<
  CashResponseContextType | undefined
>(undefined);
export const BankResponseContext = createContext<
  BankResponseContextType | undefined
>(undefined);
export const GstResponseContext = createContext<
GstResponseContextType | undefined
>(undefined);
export const VatResponseContext = createContext<
VatResponseContextType | undefined
>(undefined);

interface ContextShareProps {
  children: ReactNode;
}

const ContextShare: React.FC<ContextShareProps> = ({ children }) => {
  const [cashResponse, setCashResponse] = useState<any>({});
  const [bankResponse, setBankResponse] = useState<any>({});
  const [gstResponse,setGstResponse]=useState<any>({});
  const [vatResponse,setVatResponse]=useState<any>({});

  return (
    <cashResponseContext.Provider value={{ cashResponse, setCashResponse }}>
      <BankResponseContext.Provider value={{ bankResponse, setBankResponse }}>
        <GstResponseContext.Provider value={{gstResponse,setGstResponse}}>
          <VatResponseContext.Provider value={{vatResponse,setVatResponse}}>
          {children}
          </VatResponseContext.Provider>
        </GstResponseContext.Provider>
      </BankResponseContext.Provider>
    </cashResponseContext.Provider>
  );
};

export default ContextShare;
