import React, { useState } from 'react';
import './AddTask.css';
import Button from '../Button/Button';


const AddTask = ({handleTaskAdd}) => {
    const [inputData, setInputData] = useState(' ');
    
    const handleInputChange = (e) => {
        setInputData(e.target.value);
    }

    const handleAddTaskClick = () => {
        handleTaskAdd(inputData);
        setInputData('');
    }
    return ( 
        <div className='add-task-container'>

            <input onChange={handleInputChange} 
            value={inputData} 
            className='add-task-input' 
            type="text" 
            onKeyPress={(e) => {
                if(e.key ==="Enter") {
                    handleAddTaskClick();                
                }
            }} /> 

            <div className='button-container'>
            <Button onClick={handleAddTaskClick}>Adicionar</Button>             
            </div> 
            
        </div>
     );
}
 
export default AddTask;