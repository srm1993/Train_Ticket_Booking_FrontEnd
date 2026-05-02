import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./css/ViewTickets.css";

function ViewTickets() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/train/viewTicket/${user._id}`, {
                headers: { Authorization: token },
            })
            .then((res) => {
                setTickets(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // 🎫 Download Professional Ticket
    const downloadTicket = (booking) => {
        const doc = new jsPDF();

        // 🔷 Header Background
        doc.setFillColor(0, 102, 204);
        doc.rect(0, 0, 210, 25, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text("INDIAN RAILWAYS E-TICKET", 55, 15);

        // Reset text color
        doc.setTextColor(0, 0, 0);

        // 🔲 Outer Box
        doc.setDrawColor(0);
        doc.rect(10, 30, 190, 120);

        // 🎯 Ticket Details
        doc.setFontSize(12);

        doc.text(`PNR: ${booking._id}`, 15, 45);
        doc.text(`Passenger: ${booking.passengerName}`, 15, 55);
        doc.text(
            `Age/Gender: ${booking.passengerAge} / ${booking.passengerGender}`,
            15,
            65
        );

        doc.text(`Train: ${booking.train.trainName}`, 15, 75);
        doc.text(`Seat Type: ${booking.seatType}`, 15, 85);

        doc.text(`From: ${booking.sourceStation}`, 15, 95);
        doc.text(`To: ${booking.destinationStation}`, 15, 105);

        doc.text(
            `Journey Date: ${new Date(
                booking.journeyDate
            ).toLocaleDateString()}`,
            15,
            115
        );

        doc.text(`Fare: ₹ ${booking.totalFare}`, 15, 125);

        // 🔻 Footer
        doc.setFontSize(10);
        doc.text("Have a safe and happy journey!", 60, 145);

        doc.save(`${booking.passengerName}_Ticket.pdf`);
    };

    return (
        <div className="tickets-container">
            <h2>My Tickets</h2>

            <div className="ticket-grid">
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <div key={ticket._id} className="ticket-card">
                            <div className="ticket-content">
                                <h3>{ticket.train.trainName}</h3>

                                <p>
                                    <b>PNR:</b> {ticket._id}
                                </p>
                                <p>
                                    <b>Passenger:</b> {ticket.passengerName}
                                </p>
                                <p>
                                    <b>From:</b> {ticket.sourceStation}
                                </p>
                                <p>
                                    <b>To:</b> {ticket.destinationStation}
                                </p>
                                <p>
                                    <b>Date:</b>{" "}
                                    {new Date(
                                        ticket.journeyDate
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={() => downloadTicket(ticket)}
                            >
                                Download Ticket
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No Tickets Found</p>
                )}
            </div>
        </div>
    );
}

export default ViewTickets;