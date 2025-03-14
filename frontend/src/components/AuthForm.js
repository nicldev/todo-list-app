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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? 'Login' : 'Cadastro'}
      </h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {isLogin ? 'Entrar' : 'Cadastrar'}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full text-center text-blue-500 mt-4 hover:text-blue-600 transition duration-300"
      >
        {isLogin ? 'Criar conta' : 'Já tem uma conta? Entrar'}
      </button>
    </form>
  );
}

export default AuthForm;