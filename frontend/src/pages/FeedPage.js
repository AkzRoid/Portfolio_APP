import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const FeedPage = () => {
  useEffect(() => {
    document.title = 'Feed';
  }, []);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        setPosts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
    try {
      const { data } = await API.post(`/posts/${postId}/like`);
      setPosts(posts.map(post =>
        post._id === postId
          ? { ...post, likes: data.isLiked ? [...post.likes.filter(id => id !== user._id), user._id] : post.likes.filter(id => id !== user._id) }
          : post
      ));
    } catch (err) {
      setError('Error liking post');
    }
  };

  const handleComment = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleShare = (post) => {
    const url = window.location.origin + `/posts/${post._id}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.body,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
    }
  };

  return (
    <div className="feed-page">
      <div className="feed-container">
        <h1>Community Feed</h1>
        <p>Discover posts from the community</p>

        {loading && <p className="loading-msg">Loading posts...</p>}
        {error && <p className="error-msg">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="empty-msg">No posts yet. Be the first to share something!</p>
        )}

        <div className="posts-feed">
          {posts.map((post) => (
            <article key={post._id} className="feed-post-card">
              <div className="post-header">
                <div className="author-info">
                  <div className="author-avatar">
                    {post.author?.profilePic ? (
                      <img src={`http://localhost:5000/uploads/${post.author.profilePic}`} alt={post.author.name} />
                    ) : (
                      <div className="default-avatar">{post.author?.name?.[0]?.toUpperCase() || 'U'}</div>
                    )}
                  </div>
                  <div className="author-details">
                    <h4>{post.author?.name || 'Unknown User'}</h4>
                    <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
                {post.image && (
                  <div className="post-image-container">
                    <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} className="post-image" />
                  </div>
                )}
              </div>
              <div className="post-actions">
                <button className="action-btn like-btn" onClick={() => handleLike(post._id)}>
                  {user && post.likes.includes(user._id) ? '❤️' : '🤍'} {post.likes.length}
                </button>
                <button className="action-btn comment-btn" onClick={() => handleComment(post._id)}>
                  💬 Comment
                </button>
                <button className="action-btn share-btn" onClick={() => handleShare(post)}>
                  🔗 Share
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;