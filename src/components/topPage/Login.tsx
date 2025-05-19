import './login.scss';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/users';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.id === id && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (user.role === 'admin' || 'viewer') {
        navigate('/master');
      }
    } else {
      alert('パスワードが間違っています');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='loginForm'>
      <h1 className='title'>Title</h1>
      <div className='inputForm'>
        <input
          className='inputID'
          placeholder='ID'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className='inputPW'
          type='password'
          placeholder='パスワードを入力'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
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