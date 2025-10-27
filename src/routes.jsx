import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TotemList from './pages/totens/TotemList';
import TotemCreate from './pages/totens/TotemCreate';
import Perguntas from "./pages/perguntas/Perguntas";
import Interacoes from "./pages/interacoes/Interacoes";
import Usuarios from "./pages/usuarios/Usuarios";  // ← ADICIONE ESTA LINHA

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/totens',
    element: <TotemList />,
  },
  {
    path: '/totens/novo',
    element: <TotemCreate />,
  },
  {
    path: '/perguntas',
    element: <Perguntas />,
  },
  {
    path: '/usuarios',
    element: <Usuarios />,  // ← MUDE AQUI
  },
  {
    path: '/interacoes',
    element: <Interacoes />,
  },
]);

export default router;