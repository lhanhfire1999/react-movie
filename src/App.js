import 'boxicons/css/boxicons.min.css';
import './scss/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Category, Home, MainLayout } from './layouts';
import { NotFound } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<Category />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
