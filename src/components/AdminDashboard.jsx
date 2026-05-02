import "./css/AdminDashboard.css";

function AdminDashboard() {
    return (
        <div className="admin-container">

            <div className="header">
                <h1>🚆 Train Management Dashboard</h1>
                <p>Welcome Admin 👋 Manage your railway system efficiently</p>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <h2>25</h2>
                    <p>Total Trains</p>
                </div>

                <div className="stat-card">
                    <h2>12</h2>
                    <p>Total Routes</p>
                </div>

                <div className="stat-card">
                    <h2>40</h2>
                    <p>Total Stations</p>
                </div>

                <div className="stat-card">
                    <h2>120</h2>
                    <p>Total Bookings</p>
                </div>
            </div>

            <div className="info-section">
                <div className="info-card">
                    <h3>System Overview</h3>
                    <p>
                        This admin dashboard allows you to manage trains, routes,
                        stations, schedules, and bookings in the railway reservation system.
                    </p>
                </div>

                <div className="info-card">
                    <h3>Seat Management</h3>
                    <p>
                        Monitor available seats for General, Sleeper, and AC classes.
                        Ensure smooth booking experience for users.
                    </p>
                </div>

                <div className="info-card">
                    <h3>Route & Schedule Control</h3>
                    <p>
                        Maintain correct station sequence and train timings
                        for accurate journey planning.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;