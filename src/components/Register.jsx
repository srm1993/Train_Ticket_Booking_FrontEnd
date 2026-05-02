import { useState } from "react";
import axios from "axios";
import "./css/Register.css";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/user/createUser', formData)
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                console.log("Error registering user", err);
            });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Account 🚆</h2>
                <p>Register to start booking your journey</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="input-group">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option hidden>Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Register;
