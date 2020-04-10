import React, { useState } from 'react';

import './App.css';
import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState(['Rivan', 'Bello']);
  
  function handleAddProject() {
    //projects.push(`Nova Projeto ${Date.now()}`);

    setProjects([...projects, `Nova Projeto ${Date.now()}`])
  }

  return (
    <>
      <Header title="Projects"/>

      <img width={300} src={backgroundImage}/>

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button title="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;