import ArrowRight from '../../assets/icons/ArrowRight'
import ArrowrightUp from '../../assets/icons/ArrowrightUp'
import Globe from '../../assets/icons/Globe'
import Home from '../../assets/icons/home'
import LightBulb from '../../assets/icons/LightBulb'
import PlusCircle from '../../assets/icons/PlusCircle'
import RecieptIndianRupee from '../../assets/icons/RecieptIndianRupee'
import SearchIcon from '../../assets/icons/SearchIcon'
import Vegan from '../../assets/icons/Vegan'
import LandingHeader from '../LandingPage/LandingHeader'
import group from '../../assets/Images/Group.png'
import sleep from '../../assets/Images/sleep_3430674 1.png'
import mechineLearning from '../../assets/Images/machine-learning_13063295 1.png'
import passport from '../../assets/Images/passport_5219226 1.png'
import droidBilly from '../../assets/Images/droidBilly.png'
import Mic from '../../assets/icons/Mic'
import CygnozLogo from '../../assets/Images/CygnozLogo.png'
type Props = {}

function Chatboat({}: Props) {
  return (
    <>
    <div className={`bg-[#1A2023] text-white min-h-screen p-10`}>
    <LandingHeader/>
    <div className='grid grid-cols-12'>
    <div className='col-span-3 p-2 flex flex-col space-y-4'>
  <div className='flex gap-2'>
    <div className='bg-[#262D30] rounded-full flex justify-center items-center w-12 h-11'>
      <Home color='#FFFEFB' size={20} />
    </div>
    <div className='bg-[#262D30] w-full h-11 rounded-[30px] py-3 px-4 flex justify-between items-center'>
      <p>New Chat</p>
      <PlusCircle size={17} />
    </div>
  </div>
  <div className='bg-[#404B52] h-11 w-full relative rounded-full flex items-center px-4'>
    <div className='absolute -left-1 top-[13px]'><SearchIcon  /></div>
    <input
      type='text'
      className='bg-transparent ms-2 w-full h-full text-white px-2 focus:outline-none'
      placeholder='Search'
    />
  </div>
  {/* Recent Search  */}
  <div className='flex flex-col space-y-4'>
  <p className='text-[16px] font-medium'>Recent Search</p>
  <div className='bg-[#262D30] h-[58px] w-full relative rounded-full flex justify-between items-center p-3'>
    <div className='bg-[#D0EDFF] rounded-full w-[38px] h-[38px] flex justify-center items-center'>
        <Vegan/>
    </div>
    <p className='text-[14px]'>Tips for a balanced diet on a...</p>
    <ArrowRight color='white' size={20} stroke={2}/>
  </div>
  <div className='bg-[#262D30] h-[58px] w-full relative rounded-full flex justify-between items-center p-3'>
    <div className='bg-[#D0EDFF] rounded-full w-[38px] h-[38px] flex justify-center items-center'>
        <Globe size={20} color='#303F58'/>
    </div>
    <p className='text-[14px]'>Tips for optimizing website s...</p>
    <ArrowRight color='white' size={20} stroke={2}/>
  </div>
  <div className='bg-[#262D30] h-[58px] w-full relative rounded-full flex justify-between items-center p-3'>
    <div className='bg-[#D0EDFF] rounded-full w-[38px] h-[38px] flex justify-center items-center'>
    <LightBulb color='#303F58' size={20}/>
    </div>
    <p className='text-[14px]'>How to prepare for a tech int...</p>
    <ArrowRight color='white' size={20} stroke={2}/>
  </div>
  <div className='bg-[#262D30] h-[58px] w-full relative rounded-full flex justify-between items-center p-3'>
    <div className='bg-[#D0EDFF] rounded-full w-[38px] h-[38px] flex justify-center items-center'>
        <RecieptIndianRupee  color='#303F58' size={20}/>
    </div>
    <p className='text-[14px]'>Beginner-friendly investment..</p>
    <ArrowRight color='white' size={20} stroke={2}/>
  </div>
  <div className='bg-[#262D30] h-[58px] w-full relative rounded-full flex justify-between items-center p-3'>
    <div className='bg-[#D0EDFF] rounded-full w-[38px] h-[38px] flex justify-center items-center'>
        <ArrowrightUp color='#303F58' size={20}/>
    </div>
    <p className='text-[14px]'>Ways to develop a growth m...</p>
    <ArrowRight color='white' size={20} stroke={2}/>
  </div>
  </div>
</div>
        <div className='col-span-6  ps-5 '>
            <div className='space-y-2 relative'>
              <img src={droidBilly} className="absolute w-[115px] right-24 -top-5 -rotate-12" alt="" />
              <img src={CygnozLogo} className='w-[45px]' alt="" />
              <h2 className="text-[32px] font-bold w-[500px] bg-gradient-to-r from-[#85C3FF]  to-[#FFFFFF] bg-clip-text text-transparent">
  Hi there, John <br />
  What would you like to know?
</h2>
              <p className='text-[16px]'>Use one of the most common prompts <br />
              below or use your own to begin</p>
            </div>

           
      <div className="bg-gray-800 text-white mt-10 rounded-lg  w-full space-y-4">
        <div className="flex space-x-2 items-start">
          <div className="bg-[#59BEFD] text-sm text-white px-4 py-2 rounded-2xl rounded-br-lg max-w-xs">
            Billie, what can I do to make my business grow and make more money
          </div>
        </div>
        <div className="space-y-2 bg-[#262D30] max-w-[555px]  rounded-2xl rounded-br-lg">
          
          <div className="bg-gray-700 p-4 rounded-lg text-sm">
          <p className='mb-5'>Billie:</p>
            <p>"To make your business grow and earn more money, try these five tips:</p>
            <ol className="list-decimal ml-5">
              <li>Listen to Your Customers: Find out what they want and make your products better. Happy customers will buy more and tell their friends.</li>
              <li>Offer New Things: Try selling new products or services. This way, you have more ways to make money.</li>
              <li>Use Technology: Go online, sell your products there, and use social media to get more customers.</li>
              <li>Save Money: Look at what you're spending and find ways to spend less.</li>
              <li>Train Your Team: Teach your employees new skills so they can help your business grow.</li>
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2 max-w-[95%] bg-[#262D30] p-3 rounded-full">
          <div className='flex space-x-2'>
          <img src={CygnozLogo} className='w-[22px]' alt="" />
          <input
            type="text"
            className="bg-gray-700 text-white bg-[#262D30] w-full text-sm focus:outline-none"
            placeholder="Type your prompt here"
          />
          </div>
          <div className='flex space-x-2 items-center'>
            <Mic/>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#69ACD6]  to-[#2A3075]"><ArrowRight stroke={2} color='white' size={20}/></button>
          </div>
        </div>
      </div>
 

        </div>
        <div className='col-span-3 ps-3'>
            <p className='font-bold mb-4'>Suggestions</p>
            <div className='grid grid-cols-2 gap-4 '>
                <div className='w-[160px]  bg-[#262D30] rounded-2xl p-4 space-y-4'>
                    <div className='w-[48px] h-[48px] bg-[#333A3D] rounded-full flex items-center justify-center'>
                      <img src={group} alt="" />
                    </div>
                    <p className='text-sm'>Summary of your past sales performance</p>
                </div>
                <div className='w-[160px]  bg-[#262D30] rounded-2xl p-4 space-y-4'>
                <div className='w-[48px] h-[48px] bg-[#333A3D] rounded-full flex items-center justify-center'>
                      <img src={mechineLearning} alt="" />
                    </div>
                    <p className='text-sm'>Overview of your current sales performance</p>
                </div>
                <div className='w-[160px]  bg-[#262D30] rounded-2xl p-4 space-y-4'>
                <div className='w-[48px] h-[48px] bg-[#333A3D] rounded-full flex items-center justify-center'>
                      <img src={sleep} alt="" />
                    </div>
                    <p className='text-sm'>Forecast your sales for the upcoming quarter</p>
                </div>
                <div className='w-[160px]  bg-[#262D30] rounded-2xl p-4 space-y-4'>
                <div className='w-[48px] h-[48px] bg-[#333A3D] rounded-full flex items-center justify-center'>
                      <img src={mechineLearning} alt="" />
                    </div>
                    <p className='text-sm'>Tips to improve customer satisfaction</p>
                </div>
                <div className='w-[160px]  bg-[#262D30] rounded-2xl p-4 space-y-4'>
                <div className='w-[48px] h-[48px] bg-[#333A3D] rounded-full flex items-center justify-center'>
                      <img src={passport} alt="" />
                    </div>
                    <p className='text-sm'>Reducing your business costs</p>
                </div>
                <div className='w-[160px]  bg-[#262D30] rounded-2xl p-4 space-y-4'>
                <div className='w-[48px] h-[48px] bg-[#333A3D] rounded-full flex items-center justify-center'>
                      <img src={sleep} alt="" />
                    </div>
                    <p className='text-sm'>Analyze repeat purchase rate</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    
    </>
  )
}

export default Chatboat