import { useEffect } from "react";
import noProjectImage from '../assets/logo.png'
import Button from './Button'
export default function NoProjectSelected({onStartAddProject}) {
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            onStartAddProject();
        }
    }
    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      }, []);
    return (
    <div className="mt-24 text-center w-2/3">
        <img src={noProjectImage} alt="An empty task list" className="w-28 h-28 object-contain mx-auto"/>
        <h2 className="text-2xl font-bold text-stone-600 pt-5 my-4">No Project Selected</h2>
        <p className="text-xl text-stone-400 mb-4">Select a project or get started with a new one</p>
        <p className="mt-8">
            <Button onClick={onStartAddProject}>Create New Project</Button>
        </p>
    </div>
    )
}