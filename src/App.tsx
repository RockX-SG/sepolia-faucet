import React from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
function App() {
  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
