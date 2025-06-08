import './login.scss';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/users/users';
import { saveUserInfoToFirestore } from '../../firebase/firebaseUserAuthentication';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  return (
    <div className='loginForm'>
      <h1 className='title'>
        IBC北関東
        <br/>
        ドラム出荷数管理表
      </h1>
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