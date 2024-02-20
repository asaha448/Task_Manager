import Tasks from "./Tasks"

export default function SelectedProject({project, onDelete, onAddTask, onDeleteTask, tasks}) {
    const formattedDate=new Date(project.dueDate).toLocaleDateString('en-US',{
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
    <div className="w-[35rem] my-3 py-4">
        <header className="pb-4 mv-4 border-b-2 border-stone-300">
            <div className="flex items-center justify-between">
                <h1 className="text-5xl font-bold text-stone-600">{project.title}</h1>
                <button className="text-stone-600 hover:text-stone-950" onClick={onDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                        className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <p className="text-xl mt-4 text-zinc-400">{formattedDate}</p>
            <p className="text-lg italic my-4 text-zinc-500 whitespace-pre-wrap">{project.description}</p>
        </header>
        <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks}/>
    </div>
    )
}