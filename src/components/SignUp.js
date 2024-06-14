import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    validateConfirmPassword();
    validatePassword();
  }, [password, confirmPassword]);

  const checkUsername = async () => {
    if (!username) {
      setUsernameError('아이디를 입력해주세요');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/users/?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        if (data) {
          setUsernameError('사용 가능한 아이디입니다.');
        } else {
          setUsernameError('이미 사용 중인 아이디입니다.');
        }
      } else {
        setUsernameError('아이디 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setUsernameError('서버와 통신 중 오류가 발생했습니다.');
      console.log(error);
    }
  };

  const validatePassword = () => {
    if (password.length < 8 || password.length > 20) {
      setPasswordError('비밀번호는 8자 이상 20자 이하로 입력해주세요');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
    } else {
      setEmailError('');
    }
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('유효한 휴대폰 번호를 입력해주세요 (10-11자리 숫자)');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (usernameError || passwordError || confirmPasswordError || emailError || phoneNumberError) {
      alert('유효성 검사를 통과하지 못했습니다. 모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const payload = {
      username,
      password,
      email,
      phoneNumber,
    };

    try {
      const response = await fetch('http://localhost:8081/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        alert('가입이 완료되었습니다!');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setPhoneNumber('');
        navigate('/');
      } else {
        const data = await response.json();
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="signup-container">
        <h1>Sign Up</h1>
        <p>Please Sign up to meet various services!</p>
        <form id="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="아이디 입력 (6-20자)" required onBlur={checkUsername} />
            <button type="button" className="check-button" onClick={checkUsername}>중복 확인</button>
          </div>
          <div id="username-error" className="error">{usernameError}</div>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); validatePassword(); }} placeholder="비밀번호 입력 (8-20자)" required />
          <div id="password-error" className="error">{passwordError}</div>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 재입력" required />
          <div id="confirm-password-error" className="error">{confirmPasswordError}</div>
          <div className="input-group">
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); validateEmail(); }} placeholder="이메일 주소" required />
          </div>
          <div id="email-error" className="error">{emailError}</div>
          <div className="input-group">
            <input type="text" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); validatePhoneNumber(); }} placeholder="휴대폰 번호 입력 ('-' 제외 10-11자리 입력)" required />
          </div>
          <div id="phone-number-error" className="error">{phoneNumberError}</div>
          <button type="submit">가입하기</button>
        </form>
      </div>
  );
};

export default SignUp;