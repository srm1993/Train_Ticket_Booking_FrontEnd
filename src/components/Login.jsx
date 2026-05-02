import axios from "axios";
import { useState } from "react";
import "./css/Login.css";
import { Navigate } from "react-router-dom";
function Login() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    if (user) {
        return user.role === "admin"
            ? <Navigate to="/admin/dashboard" />
            : <Navigate to="/user/dashboard" />;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8000/api/user/loginUser`, formData)
            .then(res => {
                // console.log(res.data);
                alert(res.data.message);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.token);
                if (res.data.user.role === 'admin') {
                    window.location.href = '/admin/dashboard';
                } else {
                    window.location.href = '/user/dashboard';
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back 👋</h2>
                <p>Please login to your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
