import { useRef, useEffect } from "react";
import Input from "./Input.jsx";
import Modal from './Modal.jsx';

export default function NewProject({onAdd, onCancel} ) {
    const modalempty= useRef();
    const modaltitleempty= useRef();
    const modaldescempty= useRef();
    const modaldateempty= useRef();
    const modalshortlen= useRef();
    const modaltitleshortlen= useRef();
    const modaldescshortlen= useRef();
    const title=useRef();
    const description=useRef();
    const dueDate=useRef();

    const curr = new Date();
    var mm=`${curr.getMonth()+1}`
    if(mm==='1' || mm==='2' || mm==='3' || mm==='4' || mm==='5' || mm==='6' || mm==='7' || mm==='8' || mm==='9') {
        mm='0'+mm;
    }
    var dd=`${curr.getDate()}`
    if(dd==='1' || dd==='2' || dd==='3' || dd==='4' || dd==='5' || dd==='6' || dd==='7' || dd==='8' || dd==='9') {
        dd='0'+dd;
    }
    const date = `${curr.getFullYear()}-${mm}-${dd}`;

    function handleSave() {
        const enteredTitle=title.current.value;
        const enteredDescription=description.current.value;
        const enteredDueDate=dueDate.current.value;

        if(enteredTitle.trim() === '') {
            modaltitleempty.current.open();
            return;
        }
        if(enteredDescription.trim() === '') {
            modaldescempty.current.open();
            return;
        }
        if(enteredDueDate.trim() === '') {
            modaldateempty.current.open();
            return;
        }
        if(enteredTitle.length<4 && enteredDescription.trim().length<4) {
            modalshortlen.current.open();
            return;
        }
        if(enteredTitle.length<4) {
            modaltitleshortlen.current.open();
            return;
        }
        if(enteredDescription.trim().length<4) {
            modaldescshortlen.current.open();
            return;
        }
        onAdd ({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
          handleSave();
        }
    }
    
    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      }, []);
      const handleInputChange = (e) => {
        e.preventDefault();
        return false;
      };
    return (
    <>
        <Modal ref={modaltitleempty} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Please provide a Project Title!</h2>
        </Modal>
        <Modal ref={modaldescempty} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Please provide a Description!</h2>
        </Modal>
        <Modal ref={modaldateempty} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Please provide a Project Due Date!</h2>
        </Modal>
        <Modal ref={modalshortlen} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Title & Description are too short!</h2>
        </Modal>
        <Modal ref={modaltitleshortlen} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Title is too short!</h2>
        </Modal>
        <Modal ref={modaldescshortlen} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Description is too short!</h2>
        </Modal>
        <div className="w-[35rem] mt-16 ml-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-sm text-stone-800 hover:text-stone-950 hover:text-base mx-4 hover:font-semibold"
                     onClick={onCancel}>
                        Cancel
                    </button></li>
                <li>
                    <button className="px-6 py-2 text-sm rounded-md bg-gradient-to-r from-teal-950 to-stone-700  text-stone-50 hover:bg-teal-700 hover:text-base hover:font-semibold" 
                    onClick={handleSave}>        
                        Save
                    </button></li>
            </menu>
            <div>
                <Input type="text" ref={title} label="Title"/>
                <Input ref={description} label="Description" textarea/>
                <Input type="date" ref={dueDate} label="Due Date" onChange={handleInputChange} onKeyDown={handleInputChange}  min={date} />
            </div>
        </div>
    </>
    )
}