import { Heart } from '../assets/Icons';

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full '>
      <div className="logo font-bold text-white text-lg pt-2"> 
        <span className='text-blue-400'> &lt;</span>
        <span>Pass</span>
        <span className='text-blue-400'>Lock/&gt;</span>
      </div>
      
      <div className='flex justify-center items-center text-[12px]'> 
        Created with 
        <div className='w-7 mx-2'>
          <Heart />
        </div>
        by Siddhant Deshmukh
      </div>
    </div>
  );
};

export default Footer;
