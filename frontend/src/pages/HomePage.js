import { useEffect } from 'react';

function HomePage () {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div className="home-page">
            <section className="home" id="home">
                <div className="home-img">
                    <img src="/assets/main4k.jpg" alt="" />
                </div>
                <div className="home-content">
                    <h1>Hi, It's <span>Ray</span></h1>
                    <h3 className="typing-text">I'm a <span /></h3>
                    <p>Welcome to my Portfolio website where I showcase my projects and skills on programming. Im new to web development so please i need your guidance to get better and produce more amazing projects.</p>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/in/rhay-laurence-9a100a314/"><i className="fa-brands fa-linkedin" /></a>
                        <a href="https://github.com/RayL910"><i className="fa-brands fa-github" /></a>
                        <a href="https://x.com/Rhay_laurencxe"><i className="fa-brands fa-x-twitter" /></a>
                        <a href="https://www.instagram.com/ray_eaii/"><i className="fa-brands fa-instagram" /></a>
                    </div>
                    <a href="https://buymeacoffeeprof.netlify.app/" className="btn" target="_blank" rel="noreferrer">Buy me a Coffee!</a>
                </div>
            </section>
            <footer className="footer">
                <p>© 2026 My Portfolio. All rights reserved.</p>
                <p>© Newly built website by truely youre's</p>
            </footer>
        </div>
    );
}
export default HomePage;
