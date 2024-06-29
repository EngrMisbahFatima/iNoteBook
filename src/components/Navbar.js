import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    React.useEffect(() => { // eslint-disable-next-line 
    }, [location]);
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Pricing</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/">Action</Link></li>
                                    <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                       { (!localStorage.getItem('authToken')) ? <form className="d-flex" role="search"><Link className="btn btn-light mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-light mx-1" to="/signup" role="button">Signup</Link></form> : <form className="d-flex" role="search"><button className="btn btn-light mx-1" onClick={handleLogout}>Logout</button>
                        </form>}
                    
                </div>
            </nav>
        </>
    )
}
