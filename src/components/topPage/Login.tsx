import './login.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/users/users';
import { saveUserInfoToFirestore } from '../../firebase/firebaseUserAuthentication';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    idRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    const user = users.find(u => u.id === id && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      await saveUserInfoToFirestore({ userName: user.userName, role: user.role});

      if (user.role === 'admin' || user.role === 'viewer') {
        navigate('/master');
      }
    } else {
      alert('ID又はパスワードが間違っています');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    if (value.length === 6) {
      passwordRef.current?.focus();
    }
  };

  return (
    <div className='loginForm'>
      <div className='titleContainer'>
        <h1 className='title'>
          LUMO
        </h1>
        <p className='subTitle'>VolumeObject</p>
      </div>
      <div className='inputForm'>
        <div className='inputLabel'>
          <p>
            ID:
          </p>
        </div>
        <input
          className='inputID'
          placeholder='IDを入力'
          value={id}
          maxLength={6}
          onChange={handleIdChange}
          ref={idRef}
        />
        <div className='inputLabel'>
          <p>
            password:
          </p>
        </div>
        <input
          className='inputPW'
          type='password'
          placeholder='パスワードを入力'
          value={password}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={passwordRef}
        />
        <button 
          className='submitButton'
          onClick={handleLogin}
        >
          ログイン
        </button>
      </div>
    </div>
  );
}

export default Login;