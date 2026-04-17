import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuizPage from './pages/QuizPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import MyPostsPage from './pages/MyPostsPage';
import AdminPage from './pages/AdminPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TicTacToePage from './pages/tictactoe';
import PostDetailPage from './pages/PostDetailPage';
import FeedPage from './pages/FeedPage';
function App (){
  const location = useLocation();
  
  // Don't show Nav on auth pages
  const authPages = ['/login', '/register', '/forgot-password'];
  const showNav = !authPages.includes(location.pathname) && !location.pathname.startsWith('/reset-password');

return(
<>
{showNav && <Nav />}
<Routes>
{/* Public routes — anyone can visit */}
<Route path='/' element={<SplashPage />} />
<Route path='/home' element={<HomePage />} />
<Route path='/about' element={<AboutPage />} />
<Route path='/contact' element={<ContactPage />} />
<Route path='/quiz' element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
<Route path='/feed' element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
<Route path='/login' element={<LoginPage />} />
<Route path='/register' element={<RegisterPage />} />
<Route path='/forgot-password' element={<ForgotPasswordPage />} />
<Route path='/reset-password/:resetToken' element={<ResetPasswordPage />} />
{/*Protectedroutes—mustbe logged in */}
<Route path = '/profile'
element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
<Route path='/create-post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
<Route path='/posts/:id' element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
<Route path='/my-posts' element={<ProtectedRoute><MyPostsPage /></ProtectedRoute>} />
<Route path='/tictactoe' element={<ProtectedRoute><TicTacToePage /></ProtectedRoute>} />
{/* Admin only — redirects members/guests to home */}
<Route path ='/admin'
element={<ProtectedRoute allowedRoles={['admin']}><AdminPage /></ProtectedRoute>}
/>
<Route path ='/analytics'
element={<ProtectedRoute allowedRoles={['admin']}><AnalyticsPage /></ProtectedRoute>}
/>
</Routes>
</>
);
}
export default App;