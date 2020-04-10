import React, { useState } from 'react';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState(['Rivan', 'Bello']);
  
  function handleAddProject() {
    //projects.push(`Nova Projeto ${Date.now()}`);

    setProjects([...projects, `Nova Projeto ${Date.now()}`])

    console.log(projects);
  }

  return (
    <>
      <Header title="Projects"/>

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button title="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;