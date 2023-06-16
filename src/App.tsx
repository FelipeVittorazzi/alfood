import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministratorRestaurantes from './paginas/Administrator/AdministratorRestaurantes';
import FormRestaurante from './paginas/Administrator/FormRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministratorRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormRestaurante />} />
    </Routes>
  );
}

export default App;
