import React, { useState, useContext } from 'react';
import { Globalcontext } from "../components/GlobalContext";

const SellerProfile = () => {
  const { user, updateUser } = useContext(Globalcontext);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState(user.creatorImage || '');

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      password, // Be cautious with updating passwords like this
      creatorImage: userImage,
    };

    updateUser(updatedUser);
    alert('Profile updated!');
  };

  return (
    <div>
      <h2>Seller Profile</h2>
      {userImage && <img src={userImage} alt="User" style={{ maxWidth: '200px', marginBottom: '20px' }} />}
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          New Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          User Image URL:
          <input type="text" value={userImage} onChange={(e) => setUserImage(e.target.value)} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default SellerProfile;
