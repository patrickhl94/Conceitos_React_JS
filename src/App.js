import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [reposistories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function handleGetData() {

      const response = await api.get('repositories');

      setRepositories([...reposistories, ...response.data]);

    }

    handleGetData()

  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title,
      url,
      techs
    });

    setTechs('');
    setTitle('');
    setUrl('');
    setRepositories([...reposistories, response.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    setRepositories(reposistories.filter(repo => repo.id !== id))

  }

  return (
    <div className="container">
    
    <div className="areaButtonAdd">
        <input value={title} placeholder="Title" type="text" onChange={event => setTitle(event.target.value)} /> <br />
        <input value={url} placeholder="URL" type="text" onChange={event => setUrl(event.target.value)} /> <br />
        <input value={techs} placeholder="Techs" type="text" onChange={event => setTechs(event.target.value)} /> <br />
        <button onClick={handleAddRepository}>Adicionar</button> <br />  <br />
      </div>

    <div className="listRepo">
      <ul data-testid="repository-list">
        {reposistories.map(repo => (<li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>))
        }
      </ul>
     </div>

    </div>
  );
}

export default App;
