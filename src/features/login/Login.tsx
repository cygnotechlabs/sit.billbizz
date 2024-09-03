import { useState } from 'react';
import Button from "../../Components/Button";
import Eye from '../../assets/icons/Eye';
import EyeOffIcon from '../../assets/icons/EyeOffIcon';
import bgImage from "../../assets/Images/Group 2506.png";
import { Link } from 'react-router-dom';

type Props = {}

function Login({}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-[100vh] flex">
      <div className="w-[50%] flex justify-center items-center bg-white">
        <div className="w-[60%] ">
          <p className="text-textColor font-bold text-4xl">Get Started now</p>
          <p className="text-dropdownText mt-2 text-sm font-normal">Enter your credentials to access your account</p>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="text-dropdownText text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-3 text-sm w-[100%]  rounded-md text-start mt-1.5 bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-dropdownText text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="pl-3 text-sm w-[100%] rounded-md text-start mt-1.5 bg-white border border-inputBorder h-[39px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="focus:outline-none mt-1"
                    >
                      {showPassword ? (
                       <Eye color='#4B5C79'/>
                      ) : (
                       <EyeOffIcon color='#4B5C79'/>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link to={"/otp"} className='w-[100%]'>
              <Button className="px-[45%] mt-7">Login</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* Right side with the bgImage */}
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

export default Login;
