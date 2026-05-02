import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/TrainSchedule.css";

function TrainSchedule() {

    const { id } = useParams();
    const [schedule, setSchedule] = useState({});
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(`http://localhost:8000/api/train/getTrainSchedule/${id}`,{
            headers: { Authorization: token }
        })
        .then(res => {
            setSchedule(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="schedule-page">

            <h2 className="schedule-title">🚆 Train Schedule</h2>

            <div className="schedule-timeline">

                {schedule.schedule && schedule.schedule.length > 0 ? (
                    schedule.schedule.map((stop) => (

                        <div className="schedule-row" key={stop._id}>

                            <div className="schedule-dot"></div>

                            {/* Station Card */}
                            <div className="station-card">
                                <h3>{stop.station.stationName}</h3>

                                <p>
                                    ⏰ Arrival :
                                    {new Date(stop.arrivalTime).toLocaleString()}
                                </p>

                                <p>
                                    🚆 Departure :
                                    {new Date(stop.departureTime).toLocaleString()}
                                </p>
                            </div>

                            {/* Status Card */}
                            <div className={`status-card ${stop.status}`}>
                                <p>{stop.status}</p>
                            </div>

                        </div>

                    ))
                ) : (
                    <p className="no-data">No schedule available</p>
                )}

            </div>

        </div>
    );
}

export default TrainSchedule;