

const Table = () => {
  const journalData = [
    { date: '2024-01-01', particulars: 'By Bank A/C', voucherType: 'Contra', voucherNumber: '1', debitBalance: '1000', creditBalance: '' },
    { date: '', particulars: 'To Cash A/C', voucherType: '', voucherNumber: '', debitBalance: '', creditBalance: '1000' },
    { date: '2024-03-01', particulars: 'By Sundry Debtors', voucherType: 'Sales', voucherNumber: '2', debitBalance: '5000', creditBalance: '' },
    { date: '', particulars: 'To Sales', voucherType: '', voucherNumber: '', debitBalance: '', creditBalance: '5000' },
    { date: '2024-03-01', particulars: 'By Purchase A/C', voucherType: 'Purchase', voucherNumber: '3', debitBalance: '4000', creditBalance: '' },
    { date: '', particulars: 'To Sundry Creditors', voucherType: '', voucherNumber: '', debitBalance: '', creditBalance: '4000' },
    { date: '2024-03-01', particulars: 'By Cash A/C', voucherType: 'Receipt', voucherNumber: '4', debitBalance: '2000', creditBalance: '' },
    { date: '', particulars: 'To Sundry Debtors', voucherType: '', voucherNumber: '', debitBalance: '', creditBalance: '2000' },
    { date: '2024-03-01', particulars: 'To Sundry Creditoes', voucherType: 'Payment', voucherNumber: '5', debitBalance: '7000', creditBalance: '' },
    { date: '', particulars: 'To Bank', voucherType: '', voucherNumber: '', debitBalance: '', creditBalance: '7000' },
  ];

  // const [trialBalance, setTrialBalance] = useState<TrialBalance[]>([]);


  // const calculateTotal = () => {
  //   const totalCredit = trialBalance.reduce((sum, item) => sum + item.creditAmount, 0);
  //   const totalDebit = trialBalance.reduce((sum, item) => sum + item.debitAmount, 0);
  //   return totalCredit - totalDebit;
  // };

  return (
    <div className="overflow-x-auto my-4">
  <table className="min-w-full bg-white border border-gray-200" style={{ borderColor: '#EAECF0' }}>
  <thead className="bg-[#FDF8F0]">
    <tr>
      <th className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize: '12px' }}>Date</th>
      <th className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize: '12px' }}>Particulars</th>
      <th className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize: '12px' }}>Voucher Type</th>
      <th className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize: '12px' }}>Voucher Number</th>
      <th className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize: '12px' }}>Debit Balance</th>
      <th className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize: '12px' }}>Credit Balance</th>
    </tr>
  </thead>
  <tbody>
    {journalData.map((entry, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
        <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0', fontSize:'14px'}}>{entry.date}</td>
        <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' ,fontSize:'14px'}}>{entry.particulars}</td>
        <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' ,fontSize:'14px'}}>{entry.voucherType}</td>
        <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' ,fontSize:'14px'}}>{entry.voucherNumber}</td>
        <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' ,fontSize:'14px'}}>{entry.debitBalance}</td>
        <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' ,fontSize:'14px'}}>{entry.creditBalance}</td>
      </tr>
    ))}
    <tr className="font-semibold">
      <td className="py-2 px-4 border border-gray-300 text-center text-[#495160]" colSpan={4} style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' , fontSize:'14px' }}>     Total :</td>
      <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0' , fontSize:'14px' }}>28000</td>
      <td className="py-2 px-4 border border-gray-300 text-[#495160] text-center" style={{ borderWidth: '0px 1px 1px 0px', borderColor: '#EAECF0'  , fontSize:'14px'}}>28000</td>
    </tr>
  </tbody>
</table>



    </div>
  );
};

export default Table;
