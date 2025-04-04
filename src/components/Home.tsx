import React from 'react';
import { useNavigate } from 'react-router-dom';

const masterPassCode = "809617";
const viewingPassCode = "808121";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    const password = window.prompt("パスワードを入力してください", "");
    if (password === masterPassCode) {
      navigate("/master");
    } else if (password === viewingPassCode) {
      navigate("/viewing");
    } else if (password !== null) {
      alert("パスワードが間違っています");
    }
  };

  return (
    <div>
      <h1>Title</h1>
      <button onClick={handleClick}>パスワード入力</button>
    </div>
  );
}

export default Home;