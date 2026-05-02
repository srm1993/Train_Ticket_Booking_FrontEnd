import axios from "axios";
import { useEffect, useState } from "react";
import './css/AddTrain.css'

function AddTrain() {
    const [routes, setRoutes] = useState([]);
    const [stops, setStops] = useState([]);
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        trainName: '',
        trainNumber: '',
        trainType: '',
        totalSeats: {
            general: '',
            sleeper: '',
            ac: ''
        },
        availableSeats: {
            general: '',
            sleeper: '',
            ac: ''
        },
        route: '',
        schedule: []
    })
    useEffect(() => {
        axios.get('http://localhost:8000/api/route/getRoute',{
            headers: { Authorization: token }
        })
            .then(res => {
                console.log(res.data);
                setRoutes(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])
    const findRoute = (id) => {
        axios.get(`http://localhost:8000/api/route/findRoute/${id}`,{
            headers: { Authorization: token }
        })
            .then(res => {
                console.log(res.data.stops);
                setStops(res.data.stops);
            }).catch(err => console.log(err));
    }
    const handleAddSchedule = () => {
        const station = document.getElementById('station').value;
        const arrivalTime = document.getElementById('arrivalTime').value;
        const distance=document.getElementById('distance').value;

        // Check if station already exists in schedule
        if (formData.schedule.some(item => item.station === station)) {
            alert('This station is already added to the schedule');
            return;
        }
        const departureTime = document.getElementById('departureTime').value;

        if (station && arrivalTime && departureTime) {
            setFormData(prev => ({
                ...prev,
                schedule: [...prev.schedule, { station, arrivalTime, departureTime, distance, status: 'Scheduled' }]
            }));
            alert('Scheduled');
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'ac' || name === 'sleeper' || name === 'general') {
            setFormData({
                ...formData,
                totalSeats: {
                    ...formData.totalSeats,
                    [name]: value
                },
                availableSeats: {
                    ...formData.availableSeats,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData);
        axios.post('http://localhost:8000/api/train/createTrain', formData,{
            headers: { Authorization: token }
        })
            .then(res => {
                console.log(res);
                alert(res.data.message);
            }).catch(err=>console.log(err));
    }
    return (
        <div className="add-train-container">
            <div className="add-train-card">
                <h2 className="page-title">Add New Train</h2>

                <form onSubmit={handleSubmit}>

                    {/* Train Details */}
                    <div className="form-section">
                        <h3>Train Details</h3>
                        <div className="form-row">
                            <input type="text" name="trainName"
                                placeholder="Train Name"
                                onChange={handleChange} />

                            <input type="text" name="trainNumber"
                                placeholder="Train Number"
                                onChange={handleChange} />

                            <input type="text" name="trainType"
                                placeholder="Train Type"
                                onChange={handleChange} />
                        </div>
                    </div>

                    {/* Seat Configuration */}
                    <div className="form-section">
                        <h3>Seat Configuration</h3>
                        <div className="form-row">
                            <input type="number" name="general"
                                placeholder="General Seats"
                                onChange={handleChange} />

                            <input type="number" name="sleeper"
                                placeholder="Sleeper Seats"
                                onChange={handleChange} />

                            <input type="number" name="ac"
                                placeholder="AC Seats"
                                onChange={handleChange} />
                        </div>
                    </div>

                    {/* Route Selection */}
                    <div className="form-section">
                        <h3>Select Route</h3>
                        <select name="route"
                            onChange={(e) => {
                                findRoute(e.target.value);
                                handleChange(e);
                            }}>
                            <option hidden>Select Route</option>
                            {routes.map((route, index) => (
                                <option value={route._id} key={index}>
                                    {route.source.stationName} - {route.destination.stationName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Schedule Section */}
                    <div className="form-section">
                        <h3>Add Schedule</h3>

                        <div className="form-row">
                            <select name="station" id="station">
                                <option hidden>Select Station</option>
                                {stops.map((stop, index) => (
                                    <option value={stop.station._id} key={index}>
                                        {stop.station.stationName}
                                    </option>
                                ))}
                            </select>
                            <input type="datetime-local" id="arrivalTime" />
                            <input type="datetime-local" id="departureTime" />
                            <input type="text" id="distance" placeholder="distance" />
                        </div>

                        <button type="button"
                            className="schedule-btn"
                            onClick={handleAddSchedule}>
                            + Add Schedule
                        </button>
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Train
                    </button>

                </form>
            </div>
        </div>
    );
}
export default AddTrain;