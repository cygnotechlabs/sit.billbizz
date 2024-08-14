import React, { createContext, useState, ReactNode } from "react";

interface CashResponseContextType {
  cashResponse: any;
  setCashResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface BankResponseContextType {
  bankResponse: any;
  setBankResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface CurrencyResponseContextType {
  currencyResponse: any;
  setCurrencyResponse: React.Dispatch<React.SetStateAction<any>>;
}


export const cashResponseContext = createContext<
  CashResponseContextType | undefined
>(undefined);
export const BankResponseContext = createContext<
  BankResponseContextType | undefined
>(undefined);

export const CurrencyResponseContext= createContext<
 CurrencyResponseContextType | undefined
>(undefined);


interface ContextShareProps {
  children: ReactNode;
}


const ContextShare: React.FC<ContextShareProps> = ({ children }) => {
  const [cashResponse, setCashResponse] = useState<any>({});
  const [bankResponse, setBankResponse] = useState<any>({});
  const [currencyResponse,setCurrencyResponse]=useState<any>({});

  return (
    <cashResponseContext.Provider value={{ cashResponse, setCashResponse }}>
      <BankResponseContext.Provider value={{ bankResponse, setBankResponse }}>
      <CurrencyResponseContext.Provider value={{ currencyResponse, setCurrencyResponse }}>
          {children}
          </CurrencyResponseContext.Provider>
      </BankResponseContext.Provider>
    </cashResponseContext.Provider>

  );
};

export default ContextShare;
