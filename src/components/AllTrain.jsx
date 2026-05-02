import axios from "axios";
import { useEffect, useState } from "react";
import "./css/AllTrain.css";

function AllTrain() {

    const [trains, setTrains] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://localhost:8000/api/train/getTrain",{
            headers: { Authorization: token }
        })
            .then(res => setTrains(res.data))
            .catch(err => console.log(err))
    }, []);

    const formatTime = (time) => {
        if (!time) return "";
        const date = new Date(time);
        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    };

    const formatDate = (time) => {
        if (!time) return "";
        const date = new Date(time);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="trainContainer">

            <h1 className="title">🚆 All Trains</h1>

            <div className="trainGrid">

                {trains.map((train, index) => (

                    <div className="trainCard" key={index}>

                        <h2>{train.trainName}</h2>

                        <p className="trainNumber">
                            Train No: {train.trainNumber}
                        </p>

                        <p className="trainType">
                            Type: {train.trainType}
                        </p>

                        {train.schedule.length > 0 && (
                            <p className="trainDate">
                                📅 {formatDate(train.schedule[0].arrivalTime)}
                            </p>
                        )}

                        <div className="route">
                            <span>📍 {train.route.source.stationName}</span>
                            <span className="arrow">➡</span>
                            <span>📍 {train.route.destination.stationName}</span>
                        </div>

                        <div className="seatContainer">

                            <div className="seatBox">
                                <h4>Total Seats</h4>
                                <p>General : {train.totalSeats.general}</p>
                                <p>Sleeper : {train.totalSeats.sleeper}</p>
                                <p>AC : {train.totalSeats.ac}</p>
                            </div>

                            <div className="seatBox">
                                <h4>Available Seats</h4>
                                <p>General : {train.availableSeats.general}</p>
                                <p>Sleeper : {train.availableSeats.sleeper}</p>
                                <p>AC : {train.availableSeats.ac}</p>
                            </div>

                        </div>

                        <div className="schedule">

                            <h3>📍 Train Schedule</h3>

                            <table>

                                <thead>
                                    <tr>
                                        <th>Station</th>
                                        <th>Arrival</th>
                                        <th>Departure</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {train.schedule.map((s, i) => (
                                        <tr key={i}>
                                            <td>{s.station.stationName}</td>
                                            <td>{formatTime(s.arrivalTime)}</td>
                                            <td>{formatTime(s.departureTime)}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AllTrain;