import React, { useState, useEffect } from 'react';

function GetResource() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Getting a resource</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default GetResource;