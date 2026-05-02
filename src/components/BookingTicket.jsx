import { useState, useEffect } from "react";
import axios from "axios";
import "./css/BookingTicket.css";

function BookingTicket() {

    const [trains, setTrains] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [sourceDistance, setSourceDistance] = useState(null);
    const [destinationDistance, setDestinationDistance] = useState(null);
    const [selectedTrain, setSelectedTrain] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        user: user._id,
        train: "",
        passengerName: "",
        passengerAge: "",
        passengerGender: "",
        seatType: "",
        sourceStation: "",
        destinationStation: "",
        distance: 0,
        journeyDate: "",
        totalFare: 0
    });

    useEffect(() => {
        axios.get("http://localhost:8000/api/train/getTrain",{
            headers: { Authorization: token }
        })
            .then(res => setTrains(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleTrainChange = (trainId) => {

        setSelectedTrain(trainId);

        setFormData(prev => ({
            ...prev,
            train: trainId,
            sourceStation: "",
            destinationStation: "",
            totalFare: 0
        }));

        setSourceDistance(null);
        setDestinationDistance(null);

        axios.get(`http://localhost:8000/api/train/getTrainSchedule/${trainId}`,{
            headers: { Authorization: token }
        })
            .then(res => setSchedules(res.data.schedule))
            .catch(err => console.log(err));
    };

    const updateDistance = (stationId, stationName, type) => {

        if (!selectedTrain) return;

        axios.get(`http://localhost:8000/api/train/findDistance/${stationId}/${selectedTrain}`,{
            headers: { Authorization: token }
        })
            .then(res => {

                const distance = res.data;

                if (type === "source") {

                    setSourceDistance(distance);

                    setFormData(prev => ({
                        ...prev,
                        sourceStation: stationName,
                        distance: distance,
                        totalFare: destinationDistance !== null
                            ? (destinationDistance - distance) * 2
                            : 0
                    }));

                } else {

                    setDestinationDistance(distance);

                    setFormData(prev => ({
                        ...prev,
                        destinationStation: stationName,
                        distance: distance,
                        totalFare: sourceDistance !== null
                            ? (distance - sourceDistance) * 2
                            : 0
                    }));

                }

            })
            .catch(err => console.log(err));
    };

    const handleInputChange = (event) => {

        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const order = await axios.post(
            "http://localhost:8000/api/payment/createOrder",
            { amount: formData.totalFare }
        );
        const options = {
                key: "rzp_test_SPUcXzZmj9HPhx",
                amount: order.data.amount,
                currency: "INR",
                name: "Train Booking",
                description: "Ticket Payment",
                order_id: order.data.id,
                handler: async function (response) {
                    const bookingData = {
                        ...formData,
                        paymentStatus: "Paid",
                        bookingStatus: "Confirmed"
                    };
                    await axios.post(
                        "http://localhost:8000/api/train/bookTicket",
                        bookingData
                    );
                    alert("Payment Successful & Ticket Booked");
                    location.reload()
                },
                prefill: {
                    name: formData.passengerName
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
    };

    return (

        <div className="booking-page">

            <div className="booking-card">

                <h2 className="booking-title">🚆 Train Ticket Booking</h2>

                <form className="booking-form" onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <select
                            className="booking-input"
                            value={selectedTrain}
                            onChange={(e) => handleTrainChange(e.target.value)}
                        >
                            <option hidden>Choose Train</option>
                            {trains.map((train, index) => (
                                <option key={index} value={train._id}>
                                    {train.trainName}
                                </option>
                            ))}
                        </select>

                        <input
                            className="booking-input"
                            type="text"
                            name="passengerName"
                            placeholder="Passenger Name"
                            value={formData.passengerName}
                            onChange={handleInputChange}
                        />

                        <input
                            className="booking-input"
                            type="number"
                            name="passengerAge"
                            placeholder="Passenger Age"
                            value={formData.passengerAge}
                            onChange={handleInputChange}
                        />

                        <select
                            className="booking-input"
                            name="passengerGender"
                            value={formData.passengerGender}
                            onChange={handleInputChange}
                        >
                            <option hidden>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>

                        <select
                            className="booking-input"
                            name="seatType"
                            value={formData.seatType}
                            onChange={handleInputChange}
                        >
                            <option hidden>Seat Type</option>
                            <option>General</option>
                            <option>Sleeper</option>
                            <option>AC</option>
                        </select>

                        <select
                            className="booking-input"
                            onChange={(e) => {
                                const stationName = e.target.options[e.target.selectedIndex].text;
                                updateDistance(e.target.value, stationName, "source");
                            }}
                        >
                            <option hidden>Source Station</option>
                            {schedules.map((schedule, index) => (
                                <option key={index} value={schedule.station._id}>
                                    {schedule.station.stationName}
                                </option>
                            ))}
                        </select>

                        <select
                            className="booking-input"
                            onChange={(e) => {
                                const stationName = e.target.options[e.target.selectedIndex].text;
                                updateDistance(e.target.value, stationName, "destination");
                            }}
                        >
                            <option hidden>Destination Station</option>
                            {schedules.map((schedule, index) => (
                                <option key={index} value={schedule.station._id}>
                                    {schedule.station.stationName}
                                </option>
                            ))}
                        </select>

                        <input
                            className="booking-input"
                            type="date"
                            name="journeyDate"
                            value={formData.journeyDate}
                            onChange={handleInputChange}
                        />

                        <input
                            className="booking-input fare"
                            type="text"
                            value={`₹ ${formData.totalFare}`}
                            readOnly
                        />

                    </div>

                    <button className="booking-button">
                        🎫 Book Ticket
                    </button>

                </form>

            </div>

        </div>

    );
}

export default BookingTicket;