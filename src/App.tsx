import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministratorRestaurantes from './paginas/Administrator/Restaurantes/AdministratorRestaurantes';
import FormRestaurante from './paginas/Administrator/Restaurantes/FormRestaurante';
import AppBarNavigate from './componentes/AppBarNavigate/AppBarNavigate';
import FormPrato from './paginas/Administrator/Pratos/FormPrato';
import AdministratorPratos from './paginas/Administrator/Pratos/AdministratorPratos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<AppBarNavigate />}>
        <Route path="restaurantes" element={<AdministratorRestaurantes />} />
        <Route path="restaurante/novo" element={<FormRestaurante />} />
        <Route path="restaurantes/:id" element={<FormRestaurante />} />
        <Route path="pratos" element={<AdministratorPratos />} />
        <Route path="prato/novo" element={<FormPrato />} />
        <Route path="pratos/:id" element={<FormPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
