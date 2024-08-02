const Button = ({ children, className, onClick }) => {
    return (
      <button
        className={`shadow-[0_0_0_3px_#000000_inset] px-3 py-1 bg-transparent border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1.5 transition duration-500 ${className || ''}`} onClick={onClick}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  