import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const ContainsCancel = styled.div`
    width: 90%;
    background-color: #ffffff; 
    margin-top: 15px;
    padding: 15px;
    color: black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    `;

const BookingBox = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff; 
    width: 100%;
`;

const Times = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 50px;
`;

const Information = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: 50px;
`;

const P = styled.p`
    margin: 0;
`;

const Cancel = styled.button`
    background-color: #DE6262;
    border: none;
    color: white;
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;




function Booking ({type, name, start, end, id}: {type: string, name: string, start: number, end: number, id: number}){

    const [upcoming, setUpcoming] = useState(type);
    const [startTime, setStartTime] = useState(new Date(start).toLocaleTimeString().replace(/:[^:]*$/, ''));
    const [endTime, setEndTime] = useState(new Date(end).toLocaleTimeString().replace(/:[^:]*$/, ''));
    useEffect(() => {
        end > Date.now() ? setUpcoming("Upcoming") : setUpcoming("Past");
        setEndTime(new Date(end).toLocaleTimeString().replace(/:[^:]*$/, ''));
    }, [])

    const [showCancelButton, setShowCancelButton] = useState(false);

    function flipShowCancelButton(){
        setShowCancelButton(!showCancelButton);
    }
    const token = document.cookie.split("=")[1];

    function cancelBooking(){
        fetch(`http://localhost:4000/booking/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + token, // notice the Bearer before your token
            },
        })
        window.location.reload();
    }

    //replaces the seconds and milliseconds with nothing

    return (
        <ContainsCancel>
        <BookingBox onClick={flipShowCancelButton}>
            <Information>
                {type}
                <br />
                {name}
            </Information>
            <Times>
                {startTime}
                <br />
                <P>|</P>
                {endTime}
            </Times>
            <Information>
                {upcoming}
            </Information>
        </BookingBox>
        {showCancelButton && <Cancel onClick={cancelBooking}>Cancel booking</Cancel>}
        </ContainsCancel>

    )
}

export default Booking;