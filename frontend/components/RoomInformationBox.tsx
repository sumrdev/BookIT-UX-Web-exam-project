

import { styled } from "styled-components"
import { useEffect, useRef, useState } from "react"
import Link from "next/link";
type props = {
    name: string,
    type: string,
    capacity: number,
    bookings: Array<any>,
    id: number
}

const MainBox = styled(Link)`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 100%;
    text-decoration: none;
    color: black;
`;
const TimelineContainer = styled.div`
    width: 100%;
    padding: 10px 0;
`;


const Timeline = styled.div`
    height: 8px;
    width: 100%;
    background-color: var(--background);
    border-radius: 5px;
    position: relative;
`;

const TimeSlot = styled.div`
    position: absolute;
    height: 8px;
    width: 10px;
    left: 10px;
    background-color: var(--splash);
`;

const Name = styled.h2`

    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 5px;
`;

const Info = styled.div`
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 5px;
    color: var(--gray-font);
`;    
function CreateTimeSlot(startTime: Date, endTime: Date, timeLineWidth: number) {
    let startPercentage = (startTime.getHours() + startTime.getMinutes() / 60) / 24
    let endPercentage = (endTime.getHours() + endTime.getMinutes() / 60) / 24
    //clamp values
    if (startPercentage < 0) startPercentage = 0
    if (startPercentage > 1) startPercentage = 1
    if (endPercentage < 0) endPercentage = 0
    if (endPercentage > 1) endPercentage = 1
    if (startPercentage > endPercentage) endPercentage = startPercentage + 0.01
    let NewTimeSlot = styled(TimeSlot)`
        left: ${timeLineWidth * startPercentage}px;
        width: ${
            timeLineWidth * (endPercentage - startPercentage)
        }px;
    `
    
    return NewTimeSlot;
}


function RoomInformationBox({ name, type, capacity, bookings, id }: props) {
    const [ timeSlots, setTimeSlots ] = useState<Array<any>>([])
    const timelineRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (!timelineRef.current) return
        let timeSlots: Array<any> = []
        let timeLineWidth = timelineRef.current.offsetWidth;
        bookings.forEach((booking: any) => {
            timeSlots.push(CreateTimeSlot(new Date(booking.startTime), new Date(booking.endTime), timeLineWidth))
        })
        setTimeSlots(timeSlots)
    }, [bookings, timelineRef.current])

  return (
        <MainBox href={`/room/${id}`}>
            <Name>{name}</Name>
            <Info>Type: {type}</Info>
            <Info>Fits {capacity} people</Info>
            <TimelineContainer> 
                <Timeline ref={timelineRef}>
                    {timeSlots.map((TimeSlot, index) => (
                        <TimeSlot key={index} />
                    ))}
                </Timeline>
            </TimelineContainer>
        </MainBox>
  )
}

export default RoomInformationBox;


