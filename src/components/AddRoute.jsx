import axios from "axios";
import { useEffect, useState } from "react";
import './css/AddRoute.css';
function AddRoute() {
    const [stations, setStations] = useState([]);
    const [stops, setStops] = useState([])
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        distance: '',
        duration: '',
        stops: []
    });
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/station/getAllStations', {
            headers: { Authorization: token }
        })
            .then(res => {
                setStations(res.data);
            }).catch(err => {
                console.log(err);
            })

        axios.get('http://localhost:8000/api/route/getRoute',{
            headers: { Authorization: token }
        })
            .then(res => {
                setRoutes(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])
    const handleStops = (event) => {
        const obj = { station: event.target.value, sequence: stops.length };
        setStops([...stops, obj]);
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...formData,
            stops: [...stops]
        }
        try {
            axios.post('http://localhost:8000/api/route/createRoute', dataToSubmit,{
            headers: { Authorization: token }
        })
                .then(res => {
                    alert(res.data.message);
                    setFormData({
                        source: '',
                        destination: '',
                        distance: '',
                        duration: '',
                        stops: []
                    })
                    location.reload();
                }).catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="route-container">
                <div className="route-card">
                    <h2>+ Add Route</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Source:</label>
                        <select name="source" value={formData.source} onChange={handleChange}>
                            <option hidden>Select Source</option>
                            {
                                stations.map((element, index) => {
                                    return (
                                        <option value={element._id} key={index}>{element.stationName}</option>
                                    )
                                })
                            }
                        </select>

                        <label>Destination:</label>
                        <select name="destination" value={formData.destination} onChange={handleChange}>
                            <option hidden>Select Destination</option>
                            {
                                stations.map((element, index) => {
                                    return (
                                        <option value={element._id} key={index}>{element.stationName}</option>
                                    )
                                })
                            }
                        </select>

                        <label>Distance:</label>
                        <input type="text" name="distance" placeholder="Enter Distance" value={formData.distance} onChange={handleChange} />

                        <label>Duration:</label>
                        <input type="text" name="duration" placeholder="Enter Duration" value={formData.duration} onChange={handleChange} />

                        <label>Stops:</label>
                        <select name="stops" onChange={handleStops}>
                            <option hidden>Select Stops</option>
                            {
                                stations.map((element, index) => {
                                    return (
                                        <option value={element._id} key={index}>{element.stationName}</option>
                                    )
                                })
                            }
                        </select>

                        <button type="submit" name="btn">Create Route</button>
                    </form>
                </div>
            </div>
            <div>
                <h2 className="list-title">All Routes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Distance</th>
                            <th>Duration</th>
                            <th>Stations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            routes.map((route, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{route.source.stationName}</td>
                                        <td>{route.destination.stationName}</td>
                                        <td>{route.distance}</td>
                                        <td>{route.duration}</td>
                                        <td>
                                            {
                                                route.stops.sort((a, b) => a.sequence - b.sequence).map(stop => stop.station?.stationName).join('->')
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AddRoute;