import { use, useContext, useEffect, useState  } from "react"
import { styled } from "styled-components"
import { useDB } from "../hooks/useDB"
import RoomInformationBox from "../components/RoomInformationBox"
import NavContext from "../contexts/NavContext"
import { BoxHeaderSmall } from "../components/styled/headers"

const FilterBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: black;
    margin-bottom: 30px;
    background-color: var(--background);
`        

const Filter = styled.div`
    background-color: white;
    color: black;
    padding: 4px 10px;
    &.active {
        background-color: var(--background);
    }
`

const RoomsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
`


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
                {rooms.map((room: any) => (
                    <RoomInformationBox id={room.id} key={room.id} name={room.name} type={room.type} capacity={room.capacity} bookings={[
                        {
                            startTime: "2023-05-26T16:52:00.000Z",
                            endTime:   "2023-05-26T21:52:00.000Z",
                            "roomId": 1,
                            "userId": 2
                        },
                        {
                            startTime: "2023-05-26T22:52:00.000Z",
                            endTime:   "2023-05-26T24:52:00.000Z",
                            "roomId": 1,
                            "userId": 2
                        },
                        {
                            startTime: "2023-05-26T06:52:00.000Z",
                            endTime:   "2023-05-26T10:52:00.000Z",
                            "roomId": 1,
                            "userId": 2
                        },
                    ]} />
                ))}
            </RoomsBox>
        }
    </>
  )
}

export default Home
