import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Estilo básico para melhorar a apresentação

function App() {
  // Estado para obter um recurso
  const [recurso, setRecurso] = useState(null);

  // Estado para listar todos os recursos
  const [recursos, setRecursos] = useState([]);

  // Estado para criar um recurso
  const [novoRecurso, setNovoRecurso] = useState({ título: '', corpo: '' });

  // Estado para atualizar um recurso
  const [recursoParaAtualizar, setRecursoParaAtualizar] = useState(null);
  const [recursoAtualizado, setRecursoAtualizado] = useState({ título: '', corpo: '' });

  // Estado para excluir um recurso
  const [recursoParaExcluir, setRecursoParaExcluir] = useState(null);

  // Estado para controlar a exibição da lista de recursos
  const [mostrarRecursos, setMostrarRecursos] = useState(false);

  useEffect(() => {
    // Obtendo um recurso
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setRecurso(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar o recurso:', error);
      });

    // Listando todos os recursos
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setRecursos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os recursos:', error);
      });

    // Atualizando um recurso
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setRecursoParaAtualizar(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar o recurso para atualizar:', error);
      });

    // Excluindo um recurso
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setRecursoParaExcluir(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar o recurso para excluir:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', novoRecurso);
      alert('Recurso criado com sucesso!');
      setNovoRecurso({ título: '', corpo: '' }); // Limpar o formulário após o envio
    } catch (error) {
      console.error('Erro ao criar o recurso:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${recursoParaAtualizar.id}`, recursoAtualizado);
      alert('Recurso atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o recurso:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${recursoParaExcluir.id}`);
      alert('Recurso excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o recurso:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Obtendo um recurso</h1>
      <div className="resource-container">
        {recurso ? (
          <pre>{JSON.stringify(recurso, null, 2)}</pre>
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      <h1>Listando todos os recursos</h1>
      <button onClick={() => setMostrarRecursos(!mostrarRecursos)}>
        {mostrarRecursos ? 'Esconder Recursos' : 'Mostrar Recursos'}
      </button>
      {mostrarRecursos && (
        <div className="resources-container">
          <ul className="resources-list">
            {recursos.map(recurso => (
              <li key={recurso.id}>{recurso.title}</li>
            ))}
          </ul>
        </div>
      )}

      <h1>Criando um recurso</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={novoRecurso.título}
            onChange={e => setNovoRecurso({ ...novoRecurso, título: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Corpo:</label>
          <textarea
            value={novoRecurso.corpo}
            onChange={e => setNovoRecurso({ ...novoRecurso, corpo: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit">Criar</button>
      </form>

      <h1>Atualizando um recurso</h1>
      <div className="resource-container">
        {recursoParaAtualizar ? (
          <form className="form-container" onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Novo Título:</label>
              <input
                type="text"
                value={recursoAtualizado.título}
                onChange={e => setRecursoAtualizado({ ...recursoAtualizado, título: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Novo Corpo:</label>
              <textarea
                value={recursoAtualizado.corpo}
                onChange={e => setRecursoAtualizado({ ...recursoAtualizado, corpo: e.target.value })}
                required
              ></textarea>
            </div>
            <button type="submit">Atualizar</button>
          </form>
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      <h1>Excluindo um recurso</h1>
      <div className="resource-container">
        {recursoParaExcluir ? (
          <div>
            <p>Título: {recursoParaExcluir.title}</p>
            <p>Corpo: {recursoParaExcluir.body}</p>
            <button className="delete-button" onClick={handleDelete}>Excluir</button>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}

export default App;
