import { useContext, useEffect, useState } from "react"
import Image from 'next/image'
import Booking from "../components/Booking"
import NavContext from "../contexts/NavContext"
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

    const {data, loading, error} = useDB("getMyUser");

    const [user, setUser] = useState({});
    const [bookedLength, setBookedLength] = useState(0);


    useEffect(() => {
        setShowBackbutton(true);
        setHeading("Profile");
        setProfile("settings");
        setUser(data);
    }, [data])


    return (
    <>
    <ProfileDiv>
    <UserInfo>
        <Image src='/profile.svg' alt={''} width={50} height={50}></Image>
        {
        <div>
            <Heading3>{user.name}</Heading3>
            <Heading4>Role: {user.role}</Heading4>
            <Heading4>Bookings: {user.bookings && user.bookings.length}</Heading4>
        </div>
        }
    </UserInfo>

    <BookedRooms>
        <Heading3>Your booked rooms</Heading3>
            {user  && user.bookings && user.bookings.map((booking) => ( 
                <Booking key={booking.id} type={booking.room.type} name={booking.room.name} start={booking.startTime} end={booking.endTime} id={booking.id} ></Booking>
            ))}
        </BookedRooms>
    </ProfileDiv>
    </>
    )
}

export default Profile