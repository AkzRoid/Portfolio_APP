import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CreatePostPage = () => {
  useEffect(() => {
    document.title = 'Create Post';
  }, []);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required');
      return;
    }

    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      const { data } = await API.post('/posts', fd);
      setSuccess('Post published successfully!');
      setTitle('');
      setBody('');
      setImage(null);
      setTimeout(() => {
        navigate(`/posts/${data._id}`);
      }, 900);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    }
  };
return (
  <div className='create-post-page'>
    <div className='create-post-card'>
      <h2>Create a New Post</h2>

      {error && <div className='error-msg'>{error}</div>}
      {success && <div className='success-msg'>{success}</div>}

      <form className='create-post-form' onSubmit={handleSubmit}>
        <label htmlFor='post-title'>Title</label>
        <input
          id='post-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Post title'
          required
        />

        <label htmlFor='post-body'>Body</label>
        <textarea
          id='post-body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Write your post here...'
          rows={10}
          required
        />

        <div className='upload-group'>
          <label htmlFor='post-image'>Cover Image (optional)</label>
          <input
            id='post-image'
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>

        <button type='submit' className='btn-submit'>
          Publish Post
        </button>
      </form>
    </div>
  </div>
);
};

export default CreatePostPage;
