import { use, useContext, useEffect, useState  } from "react"
import { styled } from "styled-components"
import { useDB } from "../hooks/useDB"
import RoomInformationBox from "../components/RoomInformationBox"
import NavContext from "../contexts/NavContext"
import { BoxHeaderSmall } from "../components/styled/text"

const FilterBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: black;
    margin-bottom: 30px;
    background-color: var(--background);
    flex-wrap: wrap;
    @media (min-width: 768px) {
        justify-content: left;
    }
`        

const Filter = styled.div`
    background-color: white;
    color: black;
    padding: 4px 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    border: none;
    cursor: pointer;
    user-select: none;

    &.active {
        background-color: var(--light-accent);
    }
`

const RoomsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;

    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }

`
type Booking = {
    startTime: string,
    endTime: string,
    roomId: number,
}

function Home() {
  const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);
  const userData = useDB("getMyUser");
  useEffect(() => {
        setShowBackbutton(false);
        setHeading(userData.data?.name || "Home");
        setProfile("profile");
}, [userData])

  const [filters, setFilters] = useState<string[]>([])
  const allFilters = ["Skybox", "Classroom", "Auditorium"]
  function addOrRemoveFilter(filter: string) {
    if (filters.includes(filter)) {
      setFilters(prev => prev.filter(f => f !== filter))
    } else {
      setFilters(prev => [...prev, filter])
    }
  }
  const [rooms, setRooms] = useState<any[]>([])
  const { data, loading, error } = useDB("rooms");
  const [availableNow, setAvailableNow] = useState<any[]>([])
  const [avalableLater, setAvalableLater] = useState<any[]>([])
  const [notAvailable, setNotAvailable] = useState<any[]>([])
    useEffect(() => {
        if (data) {
            setRooms(data)
        }
    }, [data])

    useEffect(() => {
        if (!data || data.length == 0) return;
        if (filters.length === 0) {
            if (data) setRooms(data)
        } else {
            if (data) setRooms(data.filter((room: any) => filters.includes(room.type)))
        }
    }, [filters])

    function currentDateAtTime(date: Date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const now = new Date();
        now.setHours(hours);
        now.setMinutes(minutes);
        return now;
    }

    useEffect(() => {
        if (rooms && rooms.length > 0) {
            const availableNow: any[] = [];
            const availableLater: any[] = [];
            const notAvailable: any[] = [];
            for (let room of rooms) {
                const bookings  = room.bookings as Booking[];
                const now = new Date();
                const laterBookings = bookings.filter((booking) => {
                    const end = currentDateAtTime(new Date(booking.endTime));
                    return end > now;
                })
                if (laterBookings.length === 0) {
                    if (now.getHours() < 8 || now.getHours() > 22) {
                        availableLater.push(room);
                        continue;
                    } else {
                        availableNow.push(room);
                        continue;
                    }
                }
                const sortedBookings = laterBookings.sort((a, b) => {
                    const aStart = currentDateAtTime(new Date(a.endTime));
                    const bStart = currentDateAtTime(new Date(b.endTime));
                    return aStart.getTime() - bStart.getTime();
                })
                
                let startFirstBooking = currentDateAtTime(new Date(sortedBookings[0].startTime));
                if (startFirstBooking > now) {
                    availableNow.push(room);
                    continue;
                } 
                let timeToCompare = currentDateAtTime(new Date(sortedBookings[0].endTime));
                const endOfToday = new Date();
                endOfToday.setHours(22);
                endOfToday.setMinutes(0);
                let availableToday = false;
                for (let booking of sortedBookings) {
                    const start = new Date(booking.startTime);
                    const end = new Date(booking.endTime);
                    if (sortedBookings[0] != booking && start.getHours() != timeToCompare.getHours()) {
                        availableToday = true;
                        break;
                    } else if (end >= endOfToday) {
                        availableToday = false;
                        break;
                    } else if (sortedBookings[sortedBookings.length-1] == booking && end.getHours() < endOfToday.getHours()) {
                        availableToday = true;
                        break;
                    } else {
                        timeToCompare = end;
                    }
                }

                if (availableToday === false) {
                    notAvailable.push(room);
                } else {
                    availableLater.push(room);
                }
            }
            setAvailableNow(availableNow);
            setAvalableLater(availableLater);
            setNotAvailable(notAvailable);
        }
    }, [rooms])


  return (
    <>
        <BoxHeaderSmall>Filters</BoxHeaderSmall>
        <FilterBox>
            {allFilters.map((filter, index) => (
                <Filter key={index} onClick={() => addOrRemoveFilter(filter)} className={ filters.includes(filter) ? "active"  : ""}>{filter}</Filter>
                ))}
        </FilterBox>
        <BoxHeaderSmall>Free now</BoxHeaderSmall>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {
            <RoomsBox>
                {availableNow.map((room: any) => (
                    <RoomInformationBox id={room.id} key={room.id} name={room.name} type={room.type} capacity={room.capacity} bookings={room.bookings} />
                ))}
            </RoomsBox>
        }
        <BoxHeaderSmall>Available later</BoxHeaderSmall>
        {
            <RoomsBox>
                {avalableLater.map((room: any) => (
                    <RoomInformationBox id={room.id} key={room.id} name={room.name} type={room.type} capacity={room.capacity} bookings={room.bookings} />
                ))}
            </RoomsBox>
        }
        <BoxHeaderSmall>Not Available</BoxHeaderSmall>
        {
            <RoomsBox>
                {notAvailable.map((room: any) => (
                    <RoomInformationBox id={room.id} key={room.id} name={room.name} type={room.type} capacity={room.capacity} bookings={room.bookings} />
                ))}
            </RoomsBox>
        }
    </>
  )
}

export default Home
