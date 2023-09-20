import React from 'react';
import headerStyles from '../headerStyles.module.css'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Header = () => {

  const {
    loginWithPopup, 
    logout,
    isAuthenticated,
  }  = useAuth0()





  return (
    <header>
    <>
        <div className={headerStyles.left}>
          <Link role="button" to="/" className={headerStyles.title}>Comments++</Link>
        </div>

        <div className={headerStyles.right}>
          {isAuthenticated ? (
              <button onClick={() => logout()} className={`${headerStyles.logout} ${headerStyles.button}`}>
                Logout
              </button>
            ) : (
              <button onClick={() => loginWithPopup()} className={`${headerStyles.login} ${headerStyles.button}`}>
                Login
              </button>
            )}
        </div>
      </>
    </header>
  )
}

export default Header