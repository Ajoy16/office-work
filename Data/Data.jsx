import React, { useEffect, useState } from 'react';
import './Data.css'

const Data = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: ''});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => setUsers(json))
      .catch(error => console.error('Error fetching users:', error));
  };

  const addUser = () => {
    const { name, email} = newUser;
    if (name.trim() && email.trim()){
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name, email}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then(response => response.json())
        .then(data => {
          setUsers([...users, data]);
          setNewUser({ name: '', email: '' });
          showToast("User added successfully", "success");
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const updateUser = (id) => {
    const userToUpdate = users.find(user => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userToUpdate),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(() => showToast("User updated successfully", "success"))
      .catch(error => console.error('Error updating user:', error));
  };

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        showToast("User deleted successfully", "success");
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleInputChange = (key, value) => {
    setNewUser(prevUser => ({ ...prevUser, [key]: value }));
  };

  const showToast = (message, intent) => {
    alert(`${intent.toUpperCase()}: ${message}`);
  };

  return (
    <div className="App">
      <div>
         <tr className='input_contain'>
            <td></td>
            <td>
              <input
                type="text"
                value={newUser.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="Add name here..."
              />
            </td>
            <td>
              <input
                type="text"
                value={newUser.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="Add email here..."
              />
            </td>
            <td>
              <button onClick={addUser}>
                Add user
              </button>
            </td>
          </tr>
      </div>
      <table className="bp4-html-table .modifier">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <input
                  type="text"
                  value={user.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                />
              </td>
              
              <td>
                <button onClick={() => updateUser(user.id)}>
                  Update
                </button>
                &nbsp;
                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;