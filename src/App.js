import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound } from './components';
import { Category, Detail, Filter, Home, MainLayout, Search } from './layouts';
import './scss/App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<Category />} />
          <Route path=":category/:movieId" element={<Detail />} />
          <Route path="search" element={<Search />} />
          <Route path="filter" element={<Filter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
