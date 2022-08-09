import React, {useEffect, useState} from 'react';
import AddTask from '../AddTask/AddTask';
import Task from '../Task/Task';
import {v4 as uuidv4} from 'uuid';
import './TasksList.css';
import Header from '../Header/Header';

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    if(!localStorage.getItem('taskList')) {
      localStorage.setItem('taskList', JSON.stringify(tasks));
    } else {} 
    const data = localStorage.getItem('taskList');
    
    useEffect(() => {
      const fetchTasks = async () => {
        setTasks(JSON.parse(data));
      };
      fetchTasks();
    }, [data]);
    // const url = ("https://jsonplaceholder.typicode.com/users/1/todos");
    // useEffect(() => {
    //   const takeTasks = async () => {
    //     const {data} = await axios.get(url);
    //     setTasks(data)
    //   };
    //   takeTasks();
    // }, [url]); 
    
    const handleTaskAdd = (taskTitle) => {
      let notSpace=false;
      while(!notSpace){
      let end=taskTitle.length-1;
      let character = taskTitle.charAt(end);
      if(character===" ") taskTitle = taskTitle.slice(0, end-1);
      else notSpace=true;
} 
        if(taskTitle === "") {}
        else
        { 
          const newTasks = [...tasks, {
            title: taskTitle,
            id: uuidv4(),
            completed: false,
            descreption: "",
            date: "",
            creation_date: fetchCurrentDate()
          }]
          
          setTasks(newTasks);
          localStorage.setItem('taskList', JSON.stringify(newTasks));
        }
        
      }

      const fetchCurrentDate = () => {
        const current_date = new Date();
        const day = current_date.getDay();
        const month = current_date.getMonth();
        const year = current_date.getFullYear();
        let date_format = `${day}/${month}/${year}`

        return date_format;
      }

      const handleAddDescription = (taskId, descreption) => {
      let notSpace=false;
      while(!notSpace){
      let end=descreption.length-1;
      let character = descreption.charAt(end);
      if(character===" ") descreption = descreption.slice(0, end-1);
      else notSpace=true;
      } 

      if(descreption === "") {}
      else {
        const newTasks = tasks.map((task) => {
          if(task.id === taskId) return {...task, descreption: descreption}

          return task;
        })

        setTasks(newTasks);
        localStorage.setItem('taskList', JSON.stringify(newTasks));
      }
      }

      const handleAddDate = (taskId, data) => {
        const newTasks = tasks.map((task) => {
          if(task.id === taskId) return {...task, date: data}

          return task
        })

        setTasks(newTasks);
        localStorage.setItem('taskList', JSON.stringify(newTasks));
      }
      
      const handleTaskRemove = (taskId) => {
          const newTasks = tasks.filter((task) => task.id !== taskId );
          setTasks(newTasks);
          localStorage.setItem('taskList', JSON.stringify(newTasks));
        }
      
      const handleTaskClick = (taskId) => {
        const newTasks = tasks.map(task => {
          if(task.id === taskId) return {...task, completed: !task.completed}
    
          return task;
        });
    
        setTasks(newTasks)
        localStorage.setItem('taskList', JSON.stringify(newTasks));
      }
    
        
    return ( 
        <div className='tasksList_container'>  
            <Header />
            <AddTask handleTaskAdd={handleTaskAdd}/>
            {tasks.map((task) => (
                <Task 
                key={task.id} 
                task={task} 
                handleTaskClick={handleTaskClick} 
                handleTaskRemove={handleTaskRemove}
                handleAddDescription={handleAddDescription}
                handleAddDate={handleAddDate}/>
            ))}
        </div>
     );
}
 
export default TasksList;