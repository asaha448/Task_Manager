export default function Button({children, ...props}) {
    return (
    <button className="text-xl px-2 py-2 md:text-base rounded-md bg-gradient-to-r from-teal-950 to-stone-700 text-white hover:from-teal-100 hover:to-violet-100 hover:text-stone-800 hover:font-semibold" {...props}>
        {children}
    </button>
    )
}