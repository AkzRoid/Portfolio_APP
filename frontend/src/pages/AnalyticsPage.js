import { useState, useEffect } from 'react';
import API from '../api/axios';

const AnalyticsPage = () => {
  useEffect(() => {
    document.title = 'Analytics';
  }, []);

  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    publishedPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const usersRes = await API.get('/admin/users');
        const postsRes = await API.get('/admin/posts');
        
        const users = usersRes.data || [];
        const posts = postsRes.data || [];
        
        setAnalyticsData({
          totalUsers: users.length,
          activeUsers: users.filter(u => u.status === 'active').length,
          totalPosts: posts.length,
          publishedPosts: posts.filter(p => p.status === 'published').length,
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className='analytics-page'>
        <div className='analytics-header'>
          <h2>Dashboard Analytics</h2>
          <p>System performance and activity metrics</p>
        </div>
        <div className='loading'>Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className='analytics-page'>
      <div className='analytics-header'>
        <h2>📊 Dashboard Analytics</h2>
        <p>System performance and activity metrics</p>
      </div>

      <div className='analytics-grid'>
        <div className='analytics-card'>
          <div className='card-icon'>👥</div>
          <div className='card-content'>
            <h3>Total Users</h3>
            <p className='card-number'>{analyticsData.totalUsers}</p>
            <span className='card-label'>Registered members</span>
          </div>
        </div>

        <div className='analytics-card'>
          <div className='card-icon'>✅</div>
          <div className='card-content'>
            <h3>Active Users</h3>
            <p className='card-number'>{analyticsData.activeUsers}</p>
            <span className='card-label'>Currently active</span>
          </div>
        </div>

        <div className='analytics-card'>
          <div className='card-icon'>📝</div>
          <div className='card-content'>
            <h3>Total Posts</h3>
            <p className='card-number'>{analyticsData.totalPosts}</p>
            <span className='card-label'>All posts</span>
          </div>
        </div>

        <div className='analytics-card'>
          <div className='card-icon'>📢</div>
          <div className='card-content'>
            <h3>Published Posts</h3>
            <p className='card-number'>{analyticsData.publishedPosts}</p>
            <span className='card-label'>Live content</span>
          </div>
        </div>
      </div>

      <div className='analytics-summary'>
        <h3>System Summary</h3>
        <div className='summary-content'>
          <p>
            Your platform has <strong>{analyticsData.totalUsers}</strong> registered users with{' '}
            <strong>{analyticsData.activeUsers}</strong> currently active. There are{' '}
            <strong>{analyticsData.totalPosts}</strong> posts in total, with{' '}
            <strong>{analyticsData.publishedPosts}</strong> published and visible to users.
          </p>
          <div className='summary-stats'>
            <div className='stat-item'>
              <span className='stat-label'>Engagement Rate</span>
              <span className='stat-value'>
                {analyticsData.totalUsers > 0
                  ? ((analyticsData.activeUsers / analyticsData.totalUsers) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <div className='stat-item'>
              <span className='stat-label'>Post Visibility</span>
              <span className='stat-value'>
                {analyticsData.totalPosts > 0
                  ? ((analyticsData.publishedPosts / analyticsData.totalPosts) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
