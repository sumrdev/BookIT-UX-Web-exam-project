import { useContext, useEffect, useState } from "react"
import Image from 'next/image'
import Booking from "../components/Booking"
import NavContext from "../contexts/NavContext"
import UserContext from "../contexts/UserContext"
import { styled } from "styled-components";
import { useDB } from "../hooks/useDB";

const ProfileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background-color: var(--background);
    margin-top: 15px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    background-color: var(--background);
    self-align: center;
`;

const BookedRooms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    background-color: var(--background);
    margin-top: 15px;
    width: 100%;
`;

const Heading3 = styled.h3`
    margin: 5px;
`;

const Heading4 = styled.h4`
    margin: 5px;
`;


function Profile() {
    const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);

    const {data, loading, error} = useDB("user/" + 8);
    const [bookings, setBookings] = useState();
    //get user info from backend

    useEffect(() => {
        setShowBackbutton(true);
        setHeading("Profile");
        setProfile("settings");
    })
    useEffect(() => {
        setBookings(data.bookings);
    }, [data])

    return (
    <ProfileDiv>
    <UserInfo>
        <Image src='/profile.svg' alt={''} width={50} height={50}></Image>
        <div>
            <Heading3>David Marius Feliksen</Heading3>
            <Heading4>Role: TA</Heading4>
            <Heading4>Bookings: 2</Heading4>
        </div>
    </UserInfo>

    <BookedRooms>
    <Heading3>Your booked rooms</Heading3>
    {bookings && bookings.map((booking) => ( 
        <Booking key={booking.id} type={booking.room.type} name={booking.room.name} start={booking.startTime} end={booking.endTime} id={booking.id} ></Booking>
    ))}
    </BookedRooms>
    </ProfileDiv>
    )
}

export default Profile