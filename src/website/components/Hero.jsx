import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            paddingTop: '80px', // for navbar
            background: 'radial-gradient(circle at 50% 50%, #1A1625 0%, #120D20 100%)',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div className="animate-fade-in" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("/JEN.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
                filter: 'blur(3px)',
                transform: 'scale(1.03)'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
                <div className="hero-content" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <h1 className="animate-slide-in-left hero-title" style={{
                        fontSize: '4.5rem',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em',
                        color: 'white'
                    }}>
                        Empowering <span className="text-gradient">Purpose</span><br />
                        Matching Up <span className="text-gradient">God's Call</span>
                    </h1>

                    <p className="animate-slide-in-left animate-delay-200 hero-subtitle" style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        marginInline: 'auto'
                    }}>
                        We envision the reign of Christ on earth before the second Advent.
                        Join us in this journey of faith and transformation.
                    </p>

                    <div className="animate-slide-in-left animate-delay-300 hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/give" className="btn btn-primary btn-hover-scale" style={{ fontSize: '1.125rem', padding: '1rem 2rem', textDecoration: 'none' }}>
                            ❤ Give Now
                        </Link>
                        <Link to="/sermons" className="btn btn-outline btn-hover-effect" style={{ fontSize: '1.125rem', padding: '1rem 2rem', color: 'white', textDecoration: 'none' }}>
                            ▶ Watch Live
                        </Link>
                        <Link to="/contact" className="btn btn-outline btn-hover-effect" style={{ fontSize: '1.125rem', padding: '1rem 2rem', color: 'white', textDecoration: 'none' }}>
                            💬 Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 968px) {
                    .hero-title {
                        font-size: 2.25rem !important;
                    }
                    .hero-subtitle {
                        font-size: 1rem !important;
                        margin-bottom: 2rem !important;
                    }
                    .hero-content {
                        text-align: center !important;
                        padding: 0 1rem;
                    }
                    .hero-actions {
                        justify-content: center !important;
                    }
                    .hero-actions .btn {
                        width: 100%;
                        max-width: 300px;
                    }
                }
                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 1.75rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
