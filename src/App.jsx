import { useState, useRef } from "react";
import Modal from "./components/Modal"
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const modalProject= useRef();
  const modalTask= useRef();
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId=Math.random();
      const newTask= {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      }
      const projectTasks = prevState.tasks.filter(
        (task) => task.projectId === prevState.selectedProjectId
      );
      
      if (projectTasks.length < 4) {
        return {
          ...prevState,
          tasks: [newTask, ...prevState.tasks]
        };
      }
      else {
        modalTask.current.open();
        return prevState;
      }
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return { 
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id),
      };
    });
  }


  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleStartAddProject(prevstate) {
      setProjectsState(prevState=> {
        return { 
          ...prevState,
          selectedProjectId: null,
        };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return { 
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      
      const totalprojects=prevState.projects.length
      if (totalprojects < 7) {
        const projectId=Math.random()
        const newProject = {
          ...projectData,
          id: Math.random(),
        };
        return {
          ...prevState,
          selectedProjectId: newProject.id,
          projects: [...prevState.projects, newProject ]
        }
      }    
      else {
        modalProject.current.open();
        return prevState;
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return { 
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId),
      };
    });
  }
  const selectedProjectTasks = projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId);
  const selectedProject=projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content=(
  <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={selectedProjectTasks}
  />
  );

  if (projectsState.selectedProjectId===null) {
    content= <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if(projectsState.selectedProjectId=== undefined) {
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }

  return (
    
    <main className="h-screen flex gap-8 bg-gradient-to-r from-white via-white to-blue-200 transition-colors duration-500">
      <Modal ref={modalTask} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Task limit for this project exceeded!</h2>
      </Modal>
      <Modal ref={modalProject} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-800 mt-4 my-4">Project limit exceeded!</h2>
      </Modal>
      <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectsState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
