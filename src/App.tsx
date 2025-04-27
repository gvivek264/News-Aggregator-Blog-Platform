import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import NewsSearch from './components/NewsSearch';
import BlogList from './components/BlogList';
import CreatePost from './components/CreatePost';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<NewsSearch />} />
              <Route path="/news" element={<NewsSearch />} />
              <Route path="/blog" element={<BlogList />} />
              <Route 
                path="/blog/create" 
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;