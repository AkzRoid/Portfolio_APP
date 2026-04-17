import { useEffect, useState } from 'react';
import API from '../api/axios';

const MyPostsPage = () => {
  useEffect(() => {
    document.title = 'My Posts';
  }, []);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await API.get('/posts/mine');
        setPosts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load your posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="page-container">
      <div className="section-title">
        <h2>Your Posts</h2>
        <p>See all posts you created and manage them from here.</p>
      </div>

      {loading && <p>Loading your posts…</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="empty-msg">No posts yet. Create a post and it will appear here.</p>
      )}

      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.length > 180 ? post.body.slice(0, 180) + '...' : post.body}</p>
            <div className="post-meta">
              <span>{post.status?.toUpperCase() || 'PUBLISHED'}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MyPostsPage;
