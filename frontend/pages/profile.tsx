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
    margin-right: auto;

`;

const BookedRooms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    margin-bottom: 15px;
    width: 100%;
    gap: 20px;
    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const Heading3 = styled.h3`
    margin: 5px;
    margin-right: auto;
`;

const Heading4 = styled.h4`
    margin: 5px;
`;

type user = {
    name: string,
    role: string,
    bookings: any[],
}

function Profile() {
    const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);

    const {data, loading, error, fetchData } = useDB("getMyUser");

    const [user, setUser] = useState<user>({
        name: "",
        role: "",
        bookings: [],
    });


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

        <Heading3>Your booked rooms</Heading3>
        <BookedRooms>
            {user  && user.bookings && user.bookings.map((booking) => ( 
                <Booking key={booking.id} type={booking.room.type} name={booking.room.name} start={booking.startTime} end={booking.endTime} id={booking.id} refetch={fetchData} ></Booking>
            ))}
        </BookedRooms>
    </ProfileDiv>
    </>
    )
}

export default Profile