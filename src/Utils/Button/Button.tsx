"use client";
const Button = ({buttonName, event}) => {
    return (
        <button onClick={event} style={{letterSpacing:'1px'}} className=" btn text-xl hover:bg-[#11009E] transition-all duration-300 bg-[#1640D6] px-4 py-2 rounded-md text-white font-medium">
            {buttonName}
        </button>
            
    );
};

export default Button;