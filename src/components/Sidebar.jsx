import { Link } from "react-router-dom";
import { useState } from "react";
import "./css/SideBar.css";

function SideBar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>

            <div className={`sidebar ${isOpen ? "active" : ""}`}>
                
                {/* Logo */}
                <div className="logo-container">
                    <Link 
                        to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                        onClick={() => setIsOpen(false)}
                    >
                        <img 
                            src="/logo/R_T_B_logo.png" 
                            alt="Logo" 
                            className="sidebar-logo"
                        />
                    </Link>
                </div>

                {user ? (
                    <>
                        <ul className="sidebar-links">
                            {user.role === 'admin' ? (
                                <>
                                    <li><Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Admin Home</Link></li>
                                    <li><Link to="/admin/add-station" onClick={() => setIsOpen(false)}>Add Station</Link></li>
                                    <li><Link to="/admin/add-route" onClick={() => setIsOpen(false)}>Add Route</Link></li>
                                    <li><Link to="/admin/add-train" onClick={() => setIsOpen(false)}>Add Train</Link></li>
                                    <li><Link to="/admin/all-train" onClick={() => setIsOpen(false)}>All Train</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/user/dashboard" onClick={() => setIsOpen(false)}>User Home</Link></li>
                                    <li><Link to="/user/book-ticket" onClick={() => setIsOpen(false)}>Book Ticket</Link></li>
                                    <li><Link to="/user/viewTicket" onClick={() => setIsOpen(false)}>View Tickets</Link></li>
                                </>
                            )}
                        </ul>

                        <button
                            className="logout-btn"
                            onClick={() => {
                                localStorage.removeItem('user');
                                window.location = '/';
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <ul className="sidebar-links">
                        <li><Link to="/" onClick={() => setIsOpen(false)}>Login</Link></li>
                        <li><Link to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default SideBar;