import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { setToken } from '../utils/jwtHelper';
import styles from '../components/auth/Auth.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validatePassword = (password) => password.length >= 6;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login({ email, password });
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrors(err.response.data.errors || { email: 'Invalid email or password' });
    }
  };

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {};

    if (!validateName(name)) {
      errors.name = 'Invalid name';
      valid = false;
    }
    if (!validateEmail(email)) {
      errors.email = 'Invalid email';
      valid = false;
    }
    if (!validatePassword(password)) {
      errors.password = 'Password is too weak';
      valid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      try {
        await authService.register({ name, email, password });
        navigate('/dashboard');
      } catch (err) {      
        setErrors(err.response.data.errors || {});
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h1 className={styles.title}>QUIZZA</h1>
        <div className={styles.switchForm}>
          <button
            className={`${styles.switchButton} ${!isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={`${styles.switchButton} ${isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
        </div>
        {!isLogin ? (
          <>
            <form onSubmit={onSubmitSignup}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder={errors.name || "Name"}
                  required
                  className={`${styles.inputBox} ${errors.name ? styles.error : ''}`}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder={errors.email || "Email"}
                  required
                  className={`${styles.inputBox} ${errors.email ? styles.error : ''}`}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder={errors.password || "Password"}
                  required
                  className={`${styles.inputBox} ${errors.password ? styles.error : ''}`}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder={errors.confirmPassword || "Confirm Password"}
                  required
                  className={`${styles.inputBox} ${errors.confirmPassword ? styles.error : ''}`}
                />
              </div>
              <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={onSubmitLogin}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder={errors.email || "Email"}
                  required
                  className={`${styles.inputBox} ${errors.email ? styles.error : ''}`}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder={errors.password || "Password"}
                  required
                  className={`${styles.inputBox} ${errors.password ? styles.error : ''}`}
                />
              </div>
              <button type="submit" className={styles.submitButton}>Login</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
