export function NoteCard() {
    return (
        <button className='text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
            <span className='text-sm font-medium text-slate-300'>
            Há dois dias
            </span>
            <p className='text-sm leading-6 text-slate-400'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure accusantium laudantium sequi veniam. Cumque, dolor eum delectus earum praesentium repellendus optio dolore vel dolorem, fugiat quod dicta ab vero dolores?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure accusantium laudantium sequi veniam. Cumque, dolor eum delectus earum praesentium repellendus optio dolore vel dolorem, fugiat quod dicta ab vero dolores?

            </p>

            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none'/>

        </button>
    )
}