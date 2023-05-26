import { use, useContext, useEffect, useState  } from "react"
import { styled } from "styled-components"
import { useDB } from "../hooks/useDB"
import RoomInformationBox from "../components/RoomInformationBox"
import NavContext from "../contexts/NavContext"
import Link from "next/link"
const FilterBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: black;
    margin-bottom: 30px;
`        

const Filter = styled.div`
    background-color: white;
    color: black;
    padding: 4px 10px;
    &.active {
        background-color: gray;
    }
`

const BoxHeaderSmall = styled.div`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
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
    useEffect(() => {
        setShowBackbutton(false);
        setHeading("Home");
        setProfile("profile");
    }, [])

  const [filters, setFilters] = useState<string[]>([])
  const allFilters = ["Skyboxes", "Classrooms", "Auditoriums"]
  function addOrRemoveFilter(filter: string) {
    if (filters.includes(filter)) {
      setFilters(prev => prev.filter(f => f !== filter))
    } else {
      setFilters(prev => [...prev, filter])
    }
  }
  const { data, loading, error } = useDB("rooms");

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
        {data &&
            <RoomsBox>
                {data.map((room: any) => (
                    <RoomInformationBox key={room.id} name={room.name} type={room.type} capacity={room.capacity} bookings={[
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