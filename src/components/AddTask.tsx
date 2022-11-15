import { v4 as uuidv4 } from 'uuid';
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react';
import {Task} from './Task'
import './AddTask.css'

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function AddTask(){

    const [newTitleTasks, setNewTitleTasks] = useState('');
    const [tasks, setTask] = useState<Task[]>([]);

    const numberOfCompleted = tasks.filter(task => task.isCompleted === true).length
    const numberOfTotals = tasks.length
    
    function handelGetTask(event: FormEvent ){
      event.preventDefault();
      setTask([...tasks, {id:uuidv4() ,title:newTitleTasks, isCompleted:false}])
      setNewTitleTasks('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTitleTasks(event.target.value);
    }

    function deleteTask(taskDelete:string){
        const taskWhithoutDeleteOne = tasks.filter((task)=>{
            return task.id !== taskDelete
        })
        setTask(taskWhithoutDeleteOne);
    
      }

      function finishTask(id:string){
        
        const newItems = tasks.map((item) => {
          if (item.id === id) {
            item.isCompleted = !item.isCompleted
          }
          return item;
        });

        setTask(newItems);
      }

    return(<>
    <form onSubmit={handelGetTask}>
        <div className='new-task'>
            <input  onChange={handleNewTaskChange} value={newTitleTasks} id="inputNewTask" type='text' className='input-task' placeholder='Adicione uma nova tarefa...'/>
            <button type='submit' id='btn-add-task' className='btn-add-task'>Criar<PlusCircle size={42}/></button> 
        </div>
    </form>
    <div className='task'>
      <div className='info'>
        <p><span className='create'>Tarefas Criadas: </span><span className='count'>{numberOfTotals}</span></p>
        <p><span className='completed'>Concluidas: </span><span className='count'>{numberOfCompleted} de {numberOfTotals}</span></p>
      </div>
      <div className='add-task'>
      {
      tasks.map(e =>{ 
        return (<Task key={e.id} id={e.id} title={e.title} isCompleted={e.isCompleted} onDeleteTask={deleteTask} onFinish={finishTask} />)}
      )}
      {
        tasks.length <= 0 &&(
          <section>
            <span className='iconClipboard'><ClipboardText size={56} /></span>
          <p className='pNotaks'>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
          </p>
          </section>
        )
      }
      </div>
    </div>
    </>    
    )
}