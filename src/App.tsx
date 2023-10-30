import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DetailCountryPage, FavoritePage, HomePage } from './pages'
import { MainLayout } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="detail/:countryName" element={<DetailCountryPage />} />
          <Route path="favorite" element={<FavoritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
