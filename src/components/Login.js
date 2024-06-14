import React, { useState } from 'react';
import './Login.css'; // 스타일을 별도의 CSS 파일로 분리

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        // 예시: 로그인 API 요청
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // 로그인 성공 처리
                const data = await response.json();
                console.log('로그인 성공:', data);
                // TODO: 로그인 후 동작 추가
            } else {
                // 로그인 실패 처리
                setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            setError('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="login">
            <div className="left">
                <p>Login</p>
            </div>
            <div className="right">
                <div className="form-container">
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="PW"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
