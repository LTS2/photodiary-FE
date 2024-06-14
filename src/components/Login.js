import React from 'react';
import './Login.css'; // 스타일을 별도의 CSS 파일로 분리

const Login = () => {
  return (
<div className="login">

        <div className="left">
            <p>Login</p>
        </div>
        <div className="right">
            <div className="form-container">

            <form>
                <input type="text" placeholder="ID" required />
                <input type="password" placeholder="PW" required />
                <button type="submit">login</button>
            </form>
            </div>
        </div>

</div>


  );
};

export default Login;
