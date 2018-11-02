import React, {useState, useEffect} from "react";
import moment from "moment";
import "./App.css";

type ProjectProps = {
    isActive: boolean,
    onClick: any,
    name: string
};

function Project(props: ProjectProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (props.isActive) {
        setDuration(duration + 1000);
      }
    }, 1000);
    return function() {
      clearTimeout(timeout);
    };
  });

  return (
    <p onClick={props.onClick} className={props.isActive ? "active" : ""}>
      {props.name} : {moment.utc(duration).format("HH:mm:ss")}{" "}
    </p>
  );
}

function App() {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState(["Other"]);
  const [activeProject, setActiveProject] = useState(0);

  function handleProjectChange(evt) {
    setProject(evt.target.value);
  }

  function handleAddProject() {
    setProjects([...projects, project]);
  }

  function handleSelectProject(i) {
    return function() {
      setActiveProject(i);
    };
  }

  return (
    <div className="App">
      <input name="project" value={project} onChange={handleProjectChange} />
      <button onClick={handleAddProject}>Add</button>
      {projects.map((p, i) => (
        <Project
          onClick={handleSelectProject(i)}
          isActive={i === activeProject}
          key={i}
          name={p}
        />
      ))}
    </div>
  );
}

export default App;
