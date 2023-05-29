

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
    max-width: 400px;
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

const TimeCursor = styled.div.attrs<{left:number}>((props) => ({
    style: {
        left: props.left + "px"
        }
    }))`
    position: absolute;
    height: 16px;
    width: 3px;
    background-color: #444;
    border-radius: 5px;
    top: -4px;
    left: 10px;
`;

const TimeSlot = styled.div.attrs<{left:number, width:number}>((props) => ({
    style: {
        left: props.left + "px",
        width: props.width + "px"
        }
    }))`
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
function CreateTimeSlot(startTime: Date, endTime: Date, timeLineWidth: number, id: number) {
    let startPercentage = ((startTime.getHours()-8) + startTime.getMinutes() / 60) / 14
    let endPercentage = ((endTime.getHours()-8) + endTime.getMinutes() / 60) / 14
    //clamp values
    if (startPercentage < 0) startPercentage = 0
    if (startPercentage > 1) startPercentage = 1
    if (endPercentage < 0) endPercentage = 0
    if (endPercentage > 1) endPercentage = 1
    if (startPercentage > endPercentage) endPercentage = startPercentage + 0.01
   
    return (
        <TimeSlot left={`${timeLineWidth * startPercentage}`} width={`${timeLineWidth * (endPercentage - startPercentage)}`} key={id} />
    )
};


function RoomInformationBox({ name, type, capacity, bookings, id }: props) {
    const [ timeSlots, setTimeSlots ] = useState<Array<any>>([])
    const timelineRef = useRef<HTMLHeadingElement>(null);
    function updateTimeline() {
        if (!timelineRef.current) return
        let timeSlots: Array<any> = []
        let timeLineWidth = timelineRef.current.offsetWidth;
        if (!bookings) bookings = []
        bookings.forEach((booking: any, index: number) => {
            timeSlots.push(CreateTimeSlot(new Date(booking.startTime), new Date(booking.endTime), timeLineWidth, index))
        })
        setTimeSlots(timeSlots)
    }

    function currentTime() {
        let now = new Date()
        if (!timelineRef.current) return
        let timeLineWidth = timelineRef.current.offsetWidth;
        let startPercentage = ((now.getHours()-8) + now.getMinutes() / 60) / 14
        if (startPercentage < 0) startPercentage = 0
        if (startPercentage > 1) startPercentage = 1
        return startPercentage * timeLineWidth
    }

    useEffect(() => {
        window.addEventListener("resize", updateTimeline);
        updateTimeline()
        return () => {
            window.removeEventListener("resize", updateTimeline);
        }
    }, [])

  return (
        <MainBox href={`/room/${id}`}>
            <Name>{name}</Name>
            <Info>Type: {type}</Info>
            <Info>Fits {capacity} people</Info>
            <TimelineContainer> 
                <Timeline ref={timelineRef}>
                    {timeSlots}
                    <TimeCursor left={currentTime()}></TimeCursor>
                </Timeline >
            </TimelineContainer>
        </MainBox>
  )
}

export default RoomInformationBox;


