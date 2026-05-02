import { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddStation.css";

function AddStation() {
  const [formData, setFormData] = useState({
    stationName: "",
    stationCode: "",
    cityName: "",
  });
  const token = localStorage.getItem("token");
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch stations
  const fetchStations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/station/getAllStations",{
            headers: { Authorization: token }
        });
      setStations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "stationCode") {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/station/createStation",
        formData,{
            headers: { Authorization: token }
        });

      alert(res.data.message);

      setFormData({
        stationName: "",
        stationCode: "",
        cityName: "",
      });

      fetchStations();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server Error");
      }
    }

    setLoading(false);
  };
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:8000/api/station/deleteStation/${id}`,{
            headers: { Authorization: token }
        })
    .then(res=>{
      alert(res.data.message)
      location.reload()
    }).catch(err=>console.log(err))
  }

  return (
    <div className="station-container">
      <h2 className="title">🚆 Add Station</h2>

      <form onSubmit={handleSubmit} className="station-form">
        <input
          type="text"
          name="stationName"
          placeholder="Station Name"
          value={formData.stationName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="stationCode"
          placeholder="Station Code"
          value={formData.stationCode}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="cityName"
          placeholder="City Name"
          value={formData.cityName}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Station"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <h3 className="list-title">📋 Station List</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Station Name</th>
              <th>StationCode</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stations.length > 0 ? (
              stations.map((station) => (
                <tr key={station._id}>
                  <td>{station.stationName}</td>
                  <td>{station.stationCode}</td>
                  <td>{station.cityName}</td>
                  <td><button onClick={()=>handleDelete(station._id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Stations Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddStation;
