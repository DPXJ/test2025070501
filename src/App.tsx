import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProductionExecution from './pages/ProductionExecution'
import ProductionAcceptance from './pages/ProductionAcceptance'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductionExecution />} />
        <Route path="/production/execution" element={<ProductionExecution />} />
        <Route path="/production/acceptance" element={<ProductionAcceptance />} />
      </Routes>
    </Layout>
  )
}

export default App 