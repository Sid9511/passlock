import { Link } from "react-router-dom"

const Navbar = () => {
  return (

    <div className="flex m-3 max-w-full items-center justify-center lg:overflow-hidden ">
        <div className="w-[90%] items-center ">
            <nav className="sticky top-0 z-10 block text-white bg-neutral-800 rounded-xl shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 md:px-2 md:py-1">
                
                <div className="flex items-center justify-between text-blue-gray-900">
                    <a className="ml-6 block cursor-pointer font-sans text-2xl font-medium leading-relaxed text-inherit antialiased">
                        <span className="text-blue-400 text-2xl">&lt;</span>
                        Pass
                        <span className="text-blue-400 text-2xl">Lock/&gt;</span>
                    </a>

                    <div className="flex items-center mr-2 lg:mr-8 gap-4 lg:gap-16">
                        <div className="block">
                            <ul className="flex mb-0 mt-0 flex-row items-center lg:gap-16 md:gap-16 sm:gap-5 ">
                                <li className="block p-2 font-sans antialiased font-normal leading-normal" >
                                    <Link to="/" className="flex items-center text-base sm-text-sm text-gray-300 hover:text-gray-50">
                                    Home
                                    </Link>
                                </li>
                                <li className="block p-2 font-sans antialiased font-normal leading-normal">
                                    <Link to="/pass" className="flex items-center text-base sm-text-sm text-gray-300 hover:text-gray-50">
                                    Passwords
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-center gap-10">
                            <button
                            className="hidden px-4 py-2 font-sans text-xs font-bold uppercase text-center text-white transition-all rounded-lg select-none hover:bg-gray-600 bg-gray-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block "
                            type="button">
                                <span>Log In</span>
                            </button> 

                            <button
                            className="hidden py-2 px-4 font-sans text-xs font-bold uppercase text-center select-none rounded-lg bg-gradient-to-tr from-gray-800 to-gray-700 text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-400/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                            type="button">
                                <span>Sign in</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
)}

export default Navbar
