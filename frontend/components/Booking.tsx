import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const BookingBox = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff; 
    margin-top: 15px;
    width: 90%;
    padding: 15px;
    border-radius: 10px;
    text-decoration: none;
    color: black;
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



function Booking ({type, name, start, end, id}: {type: string, name: string, start: number, end: number, id: number}){

    const [upcoming, setUpcoming] = useState(type);
    const [startTime, setStartTime] = useState(new Date(start).toLocaleTimeString().replace(/:[^:]*$/, ''));
    const [endTime, setEndTime] = useState(new Date(end).toLocaleTimeString().replace(/:[^:]*$/, ''));
    console.log(start, end)
    useEffect(() => {
        end > Date.now() ? setUpcoming("Upcoming") : setUpcoming("Past");
        setEndTime(new Date(end).toLocaleTimeString().replace(/:[^:]*$/, ''));
    }, [])
    
    //replaces the seconds and milliseconds with nothing

    return (
        <BookingBox href="">
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
    )
}

export default Booking;