import React, { useState } from 'react';

function CreateResource() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
    });

    const data = await response.json();

    if (data.id) {
      setSuccess(true);
      setTitle('');
      setBody('');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Creating a resource</h2>
      {success && <p>Recurso criado com sucesso!</p>}
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Corpo:</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateResource;