import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from 'react-dom';
import Button from './Button.jsx'
const Modal= forwardRef(function Modal({children, buttonCaption}, ref) {
    const dialog=useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });
    return createPortal(
    <dialog ref={dialog} className="w-[24rem] h-[10rem] backdrop:bg-stone-900/90 p-6 rounded-md shadow-md">
        {children}
        <form method="dialog" className="mt-4 text-right text-stone-100">
            <Button>{buttonCaption}</Button>
        </form>
    </dialog>, document.getElementById('modal-root'));
});

export default Modal;