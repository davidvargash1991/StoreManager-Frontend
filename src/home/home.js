import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../home/header';

function Home() {
  return (
    <React.Fragment>
      <Header />     
      <div>Home <Link to="/usersAdmin">Users</Link></div>
    </React.Fragment>
  );
}
export default Home;