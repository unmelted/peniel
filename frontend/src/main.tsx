import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Personal from './container/dashboards/personal/personal.tsx'
import './index.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route path={`${import.meta.env.BASE_URL}dashboards/personal`} element={<Personal />} />

          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
