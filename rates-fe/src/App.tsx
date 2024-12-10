import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Layout } from 'antd';
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Redirect logged-in users away from login and register pages */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
          />

          {/* Redirect unauthenticated users to login */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
