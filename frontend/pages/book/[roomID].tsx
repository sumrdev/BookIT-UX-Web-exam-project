import { useRouter } from 'next/router';
import { useDB } from '../../hooks/useDB';
import { useContext, useEffect, useState } from 'react';
import NavContext from '../../contexts/NavContext';
import { FloatButton } from '../../components/styled/buttons';
import { RoomImageContainer, RoomImage, RoomImageText } from "../../components/styled/imageContainers"
import { Table, TableRow, TableCategory, TableDataText } from "../../components/styled/tables"


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
    function toggleTime(time: Date) {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter((t) => t != time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    }

    useEffect(() => {
        if (data && data.bookings) {
            const bookings = data.bookings;
            const newData: Date[] = [];
            bookings.forEach((booking: any) => {
                newData.push(booking.startTime);
            });
            setSelectedTimes(newData);
        }
    }, [data])
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
                            <TableDataText>{`${date.getHours()} - ${date.getHours()+1}`}</TableDataText>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        )}
        <FloatButton onClick={() => router.push(`/book/${roomID}`)}>Book this room</FloatButton>
    </>
  )
}




export default roomID