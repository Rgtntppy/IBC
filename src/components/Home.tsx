import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const masterPassCode = "809617";
const viewingPassCode = "808121";

function Home() {
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = () => {
    if (passwordInput === masterPassCode) {
      navigate("/master");
    } else if (passwordInput === viewingPassCode) {
      navigate("/viewing");
    } else {
      alert("パスワードが間違っています");
    }
    setPasswordInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <h1>Title</h1>
      <input
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="パスワードを入力"
      />
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}

export default Home;