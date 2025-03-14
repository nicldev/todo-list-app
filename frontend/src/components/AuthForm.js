import React, { useState } from 'react';
import Parse from '../services/api';

function AuthForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login
      try {
        const user = await Parse.User.logIn(username, password);
        onLogin(user);
      } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
      }
    } else {
      // Signup
      try {
        const user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        await user.signUp();
        onLogin(user);
      } catch (error) {
        alert('Erro ao cadastrar: ' + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-bold mb-2">{isLogin ? 'Login' : 'Cadastro'}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        className="border p-2 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="border p-2 mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="ml-2 text-blue-500"
      >
        {isLogin ? 'Criar conta' : 'Já tem uma conta? Entrar'}
      </button>
    </form>
  );
}

export default AuthForm;