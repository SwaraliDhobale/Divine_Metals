import React, { useState, useEffect } from 'react';

function UsernameDisplay() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Replace 'yourUserId' with the actual user ID
    fetch(`/api/getUsername/yourUserId`)
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  }, []);

  return (
    <div>
      {username ? <p>Hello, {username}!</p> : <p>Loading...</p>}
    </div>
  );
}

export default UsernameDisplay;
