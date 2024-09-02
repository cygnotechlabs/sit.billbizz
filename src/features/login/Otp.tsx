import React, { useState, useRef } from 'react';
import Button from "../../Components/Button";
import bgImage from "../../assets/Images/Group 2506.png";

type Props = {}

function Otp({}: Props) {
  // State to hold OTP values
  const [otp, setOtp] = useState(['', '', '','','','']);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // Allow only single digit
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next input if not the last
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (value === '') {
      // If input is cleared, update state
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle key down events for backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs[index - 1].current?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle pasting OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {  // Adjusted to handle 6 digits
      const pasteOtp = pasteData.split('');
      setOtp(pasteOtp);
      pasteOtp.forEach((digit, index) => {
        if (inputRefs[index].current) {
          inputRefs[index].current!.value = digit;
        }
      });
      // Move focus to the last input
      inputRefs[5].current?.focus();
    }
    e.preventDefault();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
  };

  return (
    <div className="h-[100vh] flex">
      {/* Left Side */}
      <div className="w-[50%] flex justify-center items-center bg-white">
        <div className="w-[60%] ">
          <p className="text-textColor font-bold text-4xl">Get Started now</p>
          <p className="text-dropdownText mt-2 text-sm font-normal">Enter your OTP to access your account</p>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* OTP Input Section */}
            <div className="mt-4 space-y-2">
              <label htmlFor="otp" className="text-dropdownText text-sm block">
                Enter OTP
              </label>
              <div className="flex justify-between w-full ">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`otp${index}`}
                    id={`otp${index}`}
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    ref={inputRefs[index]}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                  className="text-sm w-[60px]  rounded-md text-center mt-1.5 bg-white border border-inputBorder h-[47px]  focus:outline-none focus:bg-white focus:border-darkRed"
                  />
                ))}
              </div>
              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" className="px-[45%] mt-7">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side with Background Image */}
      <div className="w-[50%] flex justify-center items-center bg-[#CACCBE]">
        <div className="flex flex-col items-start justify-center w-[82%] h-full p-8">
            <div className='ms-[14%]'>
          <h2 className="text-textColor font-semibold text-3xl leading-tight mt-6">Transform Your Financial <br /> Management</h2>
          <p className="text-textColor mt-3 text-sm">Unlock powerful tools to keep your finances on track</p>
            </div>
          <img src={bgImage} alt="Dashboard preview" className=" w-full"/>
        </div>
      </div>
    </div>
  )
}

export default Otp;
