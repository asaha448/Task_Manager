import { forwardRef } from 'react';
const Input=forwardRef (function Input({ label, textarea, ...props}, ref) {
    const classes = "w-full p-1 border-b-2 rounded-md bg-stone-200 text-stone-900 focus:outline-none"
    return (
    <p className="flex flex-col gap-1 mb-7">
        <label className="text-sm tracking-widest font-bold uppercase text-stone-500 my-2">{label}</label>
        {textarea? <textarea ref={ref}className={classes}{...props}/>: <input ref={ref} className={classes}{...props}/>} 
    </p>
    );
})

export default Input;