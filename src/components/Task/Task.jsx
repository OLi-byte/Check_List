import {useState} from 'react';
import './Task.css';
import { CgClose, CgInfo, CgPen, CgCalendarDates } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';


const Task = ({task, handleTaskClick, handleTaskRemove, handleAddDescription, handleAddDate}) => {
    const navegate = useNavigate();
    const [descreption_condition, setDescreption_condition] = useState(false);
    const [date_condition, setData_condition] = useState(false);
    const [descreptionInputData, setDescreptionInputData] = useState("");
    const [date, setDate] = useState();

    const handleAddDescriptionData = () => {
        handleAddDescription(task.id, descreptionInputData);
        setDescreptionInputData('');
    }

    const handleAddDateData = () => {
        handleAddDate(task.id, date);
        setDate('');
    }
    
    return (  
        <>
        <div className='task-container' style={task.completed ? {borderLeft: '6px solid cornflowerblue'} : {}} >
        <div className='task-title' 
        onClick={() => {handleTaskClick(task.id)}}>
            {task.title}
        </div>

        <div className='buttons-container'>
            <button className='add_description' onClick={() => (descreption_condition === false) 
                ? setDescreption_condition(true) || setData_condition(false)
                : setDescreption_condition(false)}>
                <CgPen />
            </button>
            <button className='add_date' onClick={() => (date_condition === false) 
                ? setData_condition(true) || setDescreption_condition(false)
                : setData_condition(false)}>
                <CgCalendarDates />
            </button>
            <button className='remove-task' onClick={() => {handleTaskRemove(task.id)}}>
               <CgClose /> 
            </button>
            <button className='see-details' onClick={() => navegate(`${task.id}`)}>
               <CgInfo /> 
            </button>
        </div> 
        </div>       
        {
            (descreption_condition === true) ? <input 
            className='add_descreption_input'
            type="text"
            placeholder='Descrição...'
            value={descreptionInputData}
            onChange={(e) => setDescreptionInputData(e.target.value)}
            onKeyPress={(e) => {
                if(e.key === "Enter") {
                    handleAddDescriptionData(); 
                    setDescreption_condition(false);
                }
            }} 
            /> : ''
        }    
        {
            (date_condition === true) ? <input 
            className='add_date_input'
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyPress={(e) => {
                if(e.key === "Enter") {
                    handleAddDateData();
                    setData_condition(false);
                }
            }}/> : ''
        }
        </>    
     );
}
 
export default Task;