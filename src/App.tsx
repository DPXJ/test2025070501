import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProductionExecution from './pages/ProductionExecution'
import ProductionAcceptance from './pages/ProductionAcceptance'
import ProductionAssembly from './pages/ProductionAssembly'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/production/execution" replace />} />
        <Route path="/production/execution" element={<ProductionExecution />} />
        <Route path="/production/acceptance" element={<ProductionAcceptance />} />
        <Route path="/production/assembly" element={<ProductionAssembly />} />
      </Routes>
    </Layout>
  )
}

export default App 