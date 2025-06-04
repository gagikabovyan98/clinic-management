import React, { useEffect, useState } from 'react';
import { api } from '../api';

import React from 'react';
import EhrImages from './EhrImages';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <EhrImages ehrId={1} />
    </div>
  );
}

export default Dashboard;


// function Dashboard() {
//   const [patients, setPatients] = useState([]);
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const fetchPatients = () => {
//     api('/patient')
//       .then(setPatients)
//       .catch(err => setError(err.message));
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const handleAddPatient = async (e) => {
//     e.preventDefault();
//     try {
//       await api('/patient', 'POST', { email, password });
//       setEmail('');
//       setPassword('');
//       fetchPatients(); 
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>

//       <h3>add pacient:</h3>
//       <form onSubmit={handleAddPatient}>
//         <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
//         <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
//         <button type="submit">add</button>
//       </form>

//       <h3>pacient list:</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {patients.map(p => (
//           <li key={p.id}>{p.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;
