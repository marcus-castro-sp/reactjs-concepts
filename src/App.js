import React, {useEffect, useState} from "react";
import axios from 'axios';

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'https://facebook.com',
      techs: ["NodeJS", "React"]
    });

    const newRep = response.data;

    setRepositories([...repositories, newRep]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(rep => rep.id !== id));    
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(rep => (
            <li key={rep.id}>
              {rep.title}

              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
