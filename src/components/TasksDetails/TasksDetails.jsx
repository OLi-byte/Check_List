import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./TaskDetails.css";

const TasksDetails = () => {
  const [info, setInfo] = useState([]);
  const navegate = useNavigate();
  const params = useParams();
  const storage = localStorage.getItem("taskList");
  const infofilter = info.filter((inf) => inf.id === params.id);

  const showDate = (dateString) => {
    const DateToShow = new Date(dateString);

    return DateToShow.toLocaleDateString();
  }

  useEffect(() => {
    const takeInfo = async () => {
      const data = storage;
      setInfo(JSON.parse(data));
    };
    takeInfo();
  }, [storage]);
  return (
    <div className="container">
      <div className="task-details-container">
        {infofilter.map((infomap) => {
          return (
            <>
              <h2 className="taskTitle">{infomap.title}</h2>
              {
                (infomap.descreption === "") ? <h3 className="noDescreption_title">Sem Descrição</h3> 
                : <><h3>Descrição</h3> <p>{infomap.descreption}</p></>
              }
              {
                (infomap.completed === false) ? 
                <>
                <p className="taskNotFinished_Message">Tarefa não cumprida</p>
                </>
                : 
                <p className="taskFinished_Message">Tarefa cumprida</p>
              }
                <p>Tarefa criada em {infomap.creation_date}</p>
              {
                (infomap.completed === false && infomap.date !== "") ? 
                <h4 className="dateAlert_title">Terminar até {showDate(infomap.date)}</h4> : ''
              }
            </>
          );
        })}
      </div>
      <div className="back-button">
        <Button
          onClick={() => {
            navegate("/");
          }}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default TasksDetails;
