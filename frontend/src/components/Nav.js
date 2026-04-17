import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = user?.role === 'admin' && (location.pathname === '/admin' || location.pathname === '/analytics');
  const isAuthScreen = ['/login', '/register', '/'].includes(location.pathname);

  if (isAuthScreen) return null;

  const baseLinks = (user?.role === 'member' || user?.role === 'admin') ? [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/feed', label: 'Feed' },
  ] : [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const links = isAdminPage
    ? [{ to: '/admin', label: 'Admin' }, { to: '/analytics', label: 'Analytics' }]
    : baseLinks;

  const authLinks = user
    ? (isAdminPage
      ? []
      : [
          { to: '/profile', label: 'Profile' },
          ...(user.role === 'admin' ? [{ to: '/admin', label: 'Admin' }] : []),
        ])
    : [
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' },
      ];

  return (
    <header>
      <div className="logo">TheFolio</div>
      <button className="nav-toggle" onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? '✕' : '☰'}
      </button>
      <nav className={menuOpen ? 'active' : ''}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
            {link.label}
          </NavLink>
        ))}

        {authLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
            {link.label}
          </NavLink>
        ))}

        {user && (
          <button
            className="btn-logout"
            onClick={() => {
              logout();
              setMenuOpen(false);
              navigate('/login');
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Nav;