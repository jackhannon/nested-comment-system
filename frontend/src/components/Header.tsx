import React, { useState, useRef } from 'react';
import headerStyles from '../headerStyles.module.css'
import { useAuth0 } from '@auth0/auth0-react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {

  const {
    loginWithPopup, 
    logout,
    isAuthenticated,
  }  = useAuth0()

  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }


  return (
    <header>
    <>
        <div className={headerStyles.left}>
          <div className={headerStyles.title}>Comments++</div>
        </div>

        <div 
          className={headerStyles.center}>
          <button onClick={() => handleFocusInput()}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          <input 
            ref={inputRef}
            placeholder='Search'
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={headerStyles.X} onClick={() => setQuery("")}>X</button>
        </div>

        <div className={headerStyles.right}>
          {isAuthenticated ? (
              <button onClick={() => logout()} className={headerStyles.logout}>
                Logout
              </button>
            ) : (
              <button onClick={() => loginWithPopup()} className={headerStyles.login}>
                Login
              </button>
            )}
        </div>
      </>
    </header>
  )
}

export default Header