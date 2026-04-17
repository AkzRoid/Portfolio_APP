import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProfilePage = () => {
  useEffect(() => {
    document.title = 'Profile';
  }, []);

  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');

  const picSrc = user?.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : '/default-avatar.png';

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);

    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      await API.put('/auth/change-password', {
        currentPassword: curPw,
        newPassword: newPw,
      });
      setMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>
        <div className="profile-actions">
          <a href="/create-post" className="btn-secondary">Create Post</a>
          <a href="/my-posts" className="btn-secondary">My Posts</a>
        </div>
        <img src={picSrc} alt="Profile" className="profile-pic-preview" />
        <p className="profile-subtitle">{user?.email || 'No email'}</p>
        {msg && <div className="success-msg">{msg}</div>}

        <form className="profile-form" onSubmit={handleProfile}>
          <h3>Edit Profile</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display name"
            required
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short bio..."
            rows={3}
          />
          <label htmlFor="profile-pic">Change Profile Picture:</label>
          <input
            id="profile-pic"
            type="file"
            accept="image/*"
            onChange={(e) => setPic(e.target.files?.[0] || null)}
          />
          <button type="submit" className="btn-submit">
            Save Profile
          </button>
        </form>

        <form className="profile-form" onSubmit={handlePassword}>
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current password"
            value={curPw}
            onChange={(e) => setCurPw(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New password (min 6 chars)"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit" className="btn-submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
