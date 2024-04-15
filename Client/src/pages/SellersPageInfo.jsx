import React, { useState, useContext, useEffect } from 'react';
import { Globalcontext } from "../components/GlobalContext";

const SellerProfile = () => {
  const { user, updateUser } = useContext(Globalcontext);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState(user.creatorImage || '');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser) 
      setUsername(userData.username)
      setName(userData.name)
      setUserImage(userData.creatorImage)
    }
  },[]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      name,
      password, 
      creatorImage: userImage,
    };

    updateUser(updatedUser);
    alert('Profile updated!');
  };
  
  return (
    <div>
      <h2>Säljarsida</h2>
      {userImage && <img src={userImage} alt="User" style={{ maxWidth: '200px', marginBottom: '20px' }} />}
      <form onSubmit={handleUpdate}>
        <label>
          Användarnamn:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Namn:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>        
        <label>
          Uppdatera Lösenord:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Företagslogga URL:
          <input type="text" value={userImage} onChange={(e) => setUserImage(e.target.value)} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default SellerProfile;
