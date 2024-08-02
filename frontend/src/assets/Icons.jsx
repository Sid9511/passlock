import { useState, useEffect } from 'react';


export const CopyIcon = ({ onClick }) => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
        @keyframes scaleAndRotate {
            0% {
                transform: scale(1) rotate(0deg);
            }
            20% {
                transform: scale(1.25) rotate(0deg);
            }
            40% {
                transform: scale(1.25) rotate(15deg);
            }
            60% {
                transform: scale(1.25) rotate(0deg);
            }
            80% {
                transform: scale(1.25) rotate(15deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
            }
        }

        .hover\\:animate-scale-rotate:hover {
            animation: scaleAndRotate 1.5s ease-in-out;
        }
        `;
        document.head.append(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="white"
            className="m-3 w-[15px] h-[15px]  cursor-pointer transition-transform duration-300 hover:animate-scale-rotate"
            onClick={onClick}
        >
            <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>
        </svg>
    );
};





export const EditIcon = ({ onClick }) => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
        @keyframes scaleAndRotate {
            0% {
                transform: scale(1) rotate(0deg);
            }
            20% {
                transform: scale(1.25) rotate(0deg);
            }
            40% {
                transform: scale(1.25) rotate(15deg);
            }
            60% {
                transform: scale(1.25) rotate(0deg);
            }
            80% {
                transform: scale(1.25) rotate(15deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
            }
        }

        .hover\\:animate-scale-rotate:hover {
            animation: scaleAndRotate 1.5s ease-in-out;
        }
        `;
        document.head.append(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="white"
        className="m-3 w-[15px] h-[15px]  cursor-pointer transition-transform duration-300 hover:animate-scale-rotate"
        onClick={onClick}
        >
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
        </svg>
    );
};




export const DeleteIcon = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const iconStyle = {
        margin: '8px',
        width: '20px',
        height: '20px',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer',
    };

    return (
        <lord-icon
            src="https://cdn.lordicon.com/skkahier.json"
            trigger="hover"
            delay="2000"
            stroke="bold"
            colors="primary:#ffffff,secondary:#ffffff"
            style={iconStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            aria-label="Delete"
        >
        </lord-icon>
    );
};



export const CheckIcon = () => {

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const iconStyle = {
        margin: '8px',
        width: '25px',
        height: '25px',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer', 
    };

    return (
        <lord-icon
            src="https://cdn.lordicon.com/lomfljuq.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={iconStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Check">
        </lord-icon>
    );
};


export const CrossIcon = () => {

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const iconStyle = {
        margin: '8px',
        width: '25px',
        height: '25px',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer', 
    };

    return (
        <lord-icon
            src="https://cdn.lordicon.com/zxvuvcnc.json"
            trigger="hover"
            state="morph-cross-in"
            colors="primary:#ffffff"
            style={iconStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Cross">
        </lord-icon>
    );
};



export const ArrowUpIcon = ({onClick}) => {

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const iconStyle = {
        margin: '8px',
        width: '35px',
        height: '35px',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer', 
    };

    return (
        <lord-icon
            src="https://cdn.lordicon.com/ternnbni.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={iconStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            aria-label="ArrowUP">
        </lord-icon>
    );
};



export const ArrowDownIcon = ({onClick}) => {

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const iconStyle = {
        margin: '8px',
        width: '35px',
        height: '35px',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer',
    };

    return (
        <lord-icon
            src="https://cdn.lordicon.com/xcrjfuzb.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={iconStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            aria-label="ArrowDown">
        </lord-icon>
    );
};



export const Heart = () => {
    return (
      <lord-icon
        src="https://cdn.lordicon.com/jjoolpwc.json"
        trigger="loop"
        delay="2000"
        stroke="bold"
        state="morph-two-hearts"
        colors="primary:#ffffff,secondary:#ffffff"
        style={{ width: '31px', height: '31px' }}
      >
      </lord-icon>
    );
  };
  
 


  
