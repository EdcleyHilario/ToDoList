import { Trash} from "phosphor-react"
import { ChangeEvent,  useState } from "react";
import './Task.css'

interface Task {
    id: string,
    title: string,
    isCompleted: boolean,
    onFinish: (task: string) => void,
    onDeleteTask: (task:string) => void
}


export function Task({id, title, isCompleted, onDeleteTask, onFinish }:Task){
    
    function handleDeleteTask(){
        onDeleteTask(id);
    }

    const [tagP, setTagP] = useState('p');
    
    function handleCompleteTask(event:ChangeEvent<HTMLInputElement>){
        if(event.target.checked) {
            setTagP('p-2');
            onFinish(id)
        }else{
            setTagP('p');
            onFinish(id)
        }
    }
    
    return (
        <header className="container">
             <input onChange={handleCompleteTask} id="check" className="check" type="checkbox" radioGroup="task" /> 
             <p className={tagP}>{title}</p>
             <button onClick={handleDeleteTask} className="trash"><Trash size={18} /></button>
        </header>
    )
}