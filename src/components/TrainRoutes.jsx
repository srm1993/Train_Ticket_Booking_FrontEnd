import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/TrainRoutes.css";

function TrainRoutes() {
    const { id } = useParams();
    const [routes, setRoutes] = useState({});
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(`http://localhost:8000/api/train/getTrainRoutes/${id}`,{
            headers: { Authorization: token }
        })
        .then(res => {
            setRoutes(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="route-container">
            <h2 className="route-title">🚆 Train Journey Route</h2>

            <div className="timeline">
                {routes.route?.stops?.map((stop, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="timeline-circle"></div>

                        <div className="timeline-content">
                            <h3>{stop.sequence + 1}. {stop.station.stationName}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrainRoutes;