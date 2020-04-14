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

    setRepositories([...reposistories, response.data])

    console.log(response.data)

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)
   
    setRepositories(reposistories.filter(repo => repo.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {reposistories.map(repo => (<li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button> <br />  <br />
      <input placeholder="Title" type="text" onChange={event => setTitle(event.target.value)} /> <br />
      <input placeholder="URL" type="text" onChange={event => setUrl(event.target.value)} /> <br />
      <input placeholder="Techs" type="text" onChange={event => setTechs(event.target.value)} /> <br />
    </div>
  );
}

export default App;
