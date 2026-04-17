import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const PostDetailPage = () => {
  useEffect(() => {
    document.title = 'Post Details';
  }, []);

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const styles = {
    page: {
      marginTop: '80px',
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #000000 0%, #af2912 100%)',
      color: '#ffffff',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    postDetail: {
      maxWidth: '800px',
      margin: '0 auto 40px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
    },
    postImage: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    postMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.9em',
      color: 'rgba(255, 255, 255, 0.85)',
    },
    commentsSection: {
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
    },
    commentForm: {
      marginBottom: '20px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '4px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    button: {
      marginTop: '10px',
      padding: '8px 16px',
      backgroundColor: '#af2912',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    commentCard: {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px',
      background: 'rgba(255, 255, 255, 0.05)',
    },
    commentHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    commentAuthor: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 'auto',
    },
    commentAvatar: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    commentDate: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9em',
    },
    commentBody: {
      margin: 0,
      color: 'rgba(255, 255, 255, 0.9)',
    },
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [postRes, commentsRes] = await Promise.all([
          API.get(`/posts/${id}`),
          API.get(`/comments/${id}`)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load the post or comments');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const { data } = await API.post(`/comments/${id}`, { body: newComment });
      setComments([...comments, data]);
      setNewComment('');
    } catch (err) {
      setError('Error adding comment');
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="error-msg">{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={styles.page}>
      <article style={styles.postDetail}>
        <h1>{post.title}</h1>
        {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} style={styles.postImage} />}
        <p className="post-body">{post.body}</p>
        <div style={styles.postMeta}>
          <span>By {post.author?.name || 'Unknown'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </article>

      <section style={styles.commentsSection}>
        <h2>Comments ({comments.length})</h2>
        {user ? (
          <form onSubmit={handleSubmitComment} style={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              required
              rows="3"
              style={styles.textarea}
            />
            <button type="submit" disabled={!newComment.trim()} style={styles.button}>Post Comment</button>
          </form>
        ) : (
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}>Please login to comment.</p>
        )}
        <div className="comments-list">
          {comments.length === 0 ? (
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} style={styles.commentCard}>
                <div style={styles.commentHeader}>
                  <div style={styles.commentAuthor}>
                    {comment.author?.profilePic ? (
                      <img src={`http://localhost:5000/uploads/${comment.author.profilePic}`} alt={comment.author.name} style={styles.commentAvatar} />
                    ) : (
                      <div style={{ ...styles.commentAvatar, backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{comment.author?.name?.[0]?.toUpperCase() || 'U'}</div>
                    )}
                    <strong>{comment.author?.name || 'Unknown'}</strong>
                  </div>
                  <span style={styles.commentDate}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p style={styles.commentBody}>{comment.body}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;