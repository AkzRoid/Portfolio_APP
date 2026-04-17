
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
  useEffect(() => {
    document.title = 'About';
  }, []);

  const navigate = useNavigate();
    return (
       <div className="about-page">
  <main className="about-container">
    <section className="about-hero">
      <h1>About Me</h1>
      <p className="subtitle">Get to know me better</p>
      <h2>I'm a passionate and curious developer who loves turning ideas into clean, useful digital experiences. My journey began with a fascination for how websites are built one HTML tag at a time and that curiosity quickly grew into a dedication to learning modern web technologies. Over time I've focused on creating responsive, accessible interfaces and practical back-end solutions that make applications both delightful and reliable.</h2>
      <h2>I enjoy solving complex problems by breaking them down into manageable pieces, writing thoughtful code, and iterating until the user experience feels intuitive. Collaboration energizes me: I value clear communication, open feedback, and working closely with designers, product owners, and fellow engineers to ship features that solve real user needs. I'm continuously learning experimenting with new frameworks, improving testing practices, and exploring performance optimizations to deliver fast, maintainable apps.</h2>
      <h2>Outside of coding, I draw inspiration from a mix of creative and technical hobbies: reading about design and psychology, building small personal projects to explore new ideas, and playing competitive games that sharpen strategic thinking and rapid decision-making. These activities keep my perspective fresh and help me approach problems with both creativity and discipline. My goal is to keep growing as a developer and a teammate, contribute to meaningful projects, and help create products that people enjoy using.</h2>
    </section>
    <section className="about-content">
      <div className="about-text">
        <h2>Who I Am</h2>
        <p>I'm a web developer focused on building responsive, accessible interfaces and practical back-end solutions. See the "Get to know me better" section above for more about my background and approach.</p>
      </div>
      <div className="about-image">
        {/* <img src="assets/profile.jpg" alt="Profile Picture" /> */}
      </div>
    </section>
    <section className="skills-section">
      <h2>Skills</h2>
      <div className="skills-grid">
        <div className="skill-card">
          <h3>Frontend</h3>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>React</li>
          </ul>
        </div>
        <div className="skill-card">
          <h3>Backend</h3>
          <ul>
            <li>Node.js</li>
            <li>Python</li>
            <li>SQL</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div className="skill-card">
          <h3>Tools</h3>
          <ul>
            <li>Git</li>
            <li>VS Code</li>
            <li>Figma</li>
            <li>Docker</li>
          </ul>
        </div>
      </div>
    </section>
    <section className="experience-section">
      <h2>Experience</h2>
      <div className="experience-items">
        <div className="experience-card">
          <h3>Avid Gamer</h3>
          <p className="company">FPS games</p>
          <p className="date">Present</p>
          <p>Comepetitive gaming that involves strategic thinking and quick reflexes.</p>
        </div>
        <div className="experience-card">
          <h3>Freelance Developer</h3>
          <p className="exp">Self Employed</p>
          <p className="date">2021 - 2022</p>
          <p>Created custom websites for small businesses and startups.</p>
        </div>
        <div className="experience-items">
          <div className="experience-card">
            <h3>Avid Gamer</h3>
            <p className="company">FPS games</p>
            <p className="date">Present</p>
            <p>Comepetitive gaming that involves strategic thinking and quick reflexes.</p>
          </div>
        </div>
      </div></section>
    <section className="games-section">
      <h2>Try My Games</h2>
      <div className="games-buttons">
        <button className="game-btn" onClick={() => navigate('/quiz')}>Quiz</button>
        <button className="game-btn" onClick={() => navigate('/tictactoe')}>Tic Tac Toe</button>
      </div>
    </section>
  </main>
</div>

    );
}   
export default AboutPage;
