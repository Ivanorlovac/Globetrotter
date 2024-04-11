

// import React, { useState } from 'react';


// const FavoritesForm = ({ onSubmit }) => {
//   const [favorites, setFavorites] = useState('');

//   const handleFavoritesChange = (e) => {
//     setFavorites(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(favorites);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={favorites}
//         onChange={handleFavoritesChange}
//         placeholder="Enter your favorite items"
//         required
//       />
//       <button type="submit">Submit Favorites</button>
//     </form>
//   );
// };

// const RegisterForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [userFavorites, setUserFavorites] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//           name,
//           phoneNumber,
//           address,
//           favorites: userFavorites,
//           role: 'user'
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Registration failed');
//       }
//       const data = await response.json();
//       console.log('Registration successful', data);
     
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//   const handleFavoritesSubmit = (favorites) => {
//     setUserFavorites(favorites);
//   };

//   return (
//     <div>
//       <form onSubmit={handleRegister}>
//         {/* Existing input fields */}
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         {/* Other input fields */}
//         {/* ... */}
//         <FavoritesForm onSubmit={handleFavoritesSubmit} />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;
