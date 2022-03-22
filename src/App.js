import 'boxicons/css/boxicons.min.css';
import './scss/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Category, Detail, Home, MainLayout } from './layouts';
import { NotFound } from './components';
import MovieSearch from './components/MovieSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<Category />} />
          <Route path=":category/:movieId" element={<Detail />} />
          <Route path="search" element={<MovieSearch />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
