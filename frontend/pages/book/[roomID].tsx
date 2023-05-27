import { useRouter } from 'next/router';
import { useDB } from '../../hooks/useDB';
import { useContext, useEffect, useState } from 'react';
import NavContext from '../../contexts/NavContext';
import { FloatButton } from '../../components/styled/buttons';
import { RoomImageContainer, RoomImage, RoomImageText } from "../../components/styled/imageContainers"
import { Table, TableRow, TableCategory, TableDataText } from "../../components/styled/tables"
import { parse } from 'path';
import { styled } from 'styled-components';

type Booking = {
    startTime: string,
    endTime: string,
    roomId: number,
}

const Spacer = styled.div`
    height: 70px;
`

function roomID({}) {
    const {  setShowBackbutton, setProfile, setHeading } = useContext(NavContext);
    useEffect(() => {
        setShowBackbutton(true);
        setHeading("Select Time");
        setProfile("profile");
    }, [])
    const router = useRouter();
    const { roomID } = router.query;

    const { data, loading, error } = useDB(router.isReady ? `rooms/${roomID}` : "")

    const date = new Date();
    const availableTimes : Date[] = []
    for (let i = 8; i <= 22; i++) {
        const time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i);
        availableTimes.push(time)
    }
    const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);

    const [Bookings, setBookings] = useState<Booking[]>([]);
    function toggleTime(time: Date) {
        if (selectedTimes.map(date => date.toISOString()).includes(time.toISOString())) {
            setSelectedTimes(selectedTimes.filter((t) => t.toISOString() != time.toISOString()));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    }

    function dateIsUnavailable(date: Date) {
        let isUnavailable = false;
        Bookings.forEach((booking) => {
            const startTime = new Date(booking.startTime);
            const endTime = new Date(booking.endTime);
            if (date >= startTime && date < endTime) {
                isUnavailable = true;
                return true;
            }
        });
        return isUnavailable;
    }

    useEffect(() => {
        if (data && data.bookings) {
            const bookings = data.bookings;
            setBookings(bookings);
        }
    }, [data])

    async function bookNow() {
        let finalBookings: Booking[] = [];
        selectedTimes.forEach((time) => {
            finalBookings.push({
                startTime: time.toISOString(),
                endTime: new Date(time.getTime() + 3600 * 1000).toISOString(),
                roomId: parseInt(roomID as string),
            });
        });
        finalBookings = meargeBookings(finalBookings);

        const token = document.cookie.split("=")[1];
        if(finalBookings.length > 1) {
            await fetch("http://localhost:4000/booking/many", {
                method: "POST",
                body: JSON.stringify({bookings: finalBookings}),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': "Bearer " + token,
                },
            });
        } else {
            await fetch("http://localhost:4000/booking", {
                method: "POST",
                body: JSON.stringify(finalBookings[0]),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': "Bearer " + token,
                },
            });
        }
        router.push("/");
    }

    function meargeBookings(bookings: Booking[]) {
        const newBookings: Booking[] = [];
        bookings.forEach((booking) => {
            const before = newBookings.find((b) => b.endTime == booking.startTime);
            const after = newBookings.find((b) => b.startTime == booking.endTime);
            if (before) {
                before.endTime = booking.endTime;
            } else if (after) {
                after.startTime = booking.startTime;
            } else {
                newBookings.push(booking);
            }
        })
        return newBookings;
    }
  return (
    <> 
        <RoomImageContainer>
            <RoomImage type={"skybox"} fill={true} title="aaa" priority></RoomImage>
            <RoomImageText>{data && `${data.type} - ${data.name}`}</RoomImageText>
        </RoomImageContainer>
        <h2>About this room:</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data && (
            <Table>
                <tbody>
                    {availableTimes.map((date, index) => (
                        <TableRow key={index} onClick={() => toggleTime(date)}>
                            <TableCategory>{`${date.getHours()} - ${date.getHours()+1}`}</TableCategory>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedTimes.map(date => date.toISOString()).includes(date.toISOString())}
                                        onChange={() => toggleTime(date)}
                                        disabled={dateIsUnavailable(date)}
                                    />
                                </label>
                            </td>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        )}
        <Spacer/>
        <FloatButton onClick={() => bookNow()}>Book now</FloatButton>
    </>
  )
}




export default roomID