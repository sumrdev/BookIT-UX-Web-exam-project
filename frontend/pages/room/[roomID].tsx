import { useRouter } from 'next/router';
import { useDB } from '../../hooks/useDB';
import { useContext, useEffect } from 'react';
import NavContext from '../../contexts/NavContext';
import { BoxHeaderSmall } from "../../components/styled/headers"
import { LargeButton } from '../../components/styled/buttons';
function roomID({}) {
    const {  setShowBackbutton, setProfile, setHeading } = useContext(NavContext);
    useEffect(() => {
        setShowBackbutton(true);
        setHeading("Room");
        setProfile("profile");
    }, [])
    const router = useRouter();
    const { roomID } = router.query;
    
    const { data, loading, error } = useDB(router.isReady ? `rooms/${roomID}` : "")
    const roomInformaitonKeys = [
        "capacity",
        "externalMonitor",
        "whiteboard",
        "eatingAllowed",
        "powerOutlets",
        "ethernetPorts",
      ];
  return (
    <>
        <h1>{data && `${data.type} - ${data.name}`}</h1>
        <h2>About this room:</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data && (
            <div>
                {roomInformaitonKeys.map((key, index) => (
                    <BoxHeaderSmall key={index}>
                        <h3>{key}</h3>
                        <p>{ 
                            (typeof data[key]) == "boolean"  ? 
                                data[key] == true ? "Yes" : "No" :  
                                data[key]
                            }</p>
                    </BoxHeaderSmall>
                ))}
            </div>
        )}
        <LargeButton onClick={() => router.push(`/room/${roomID}/book`)}>Book this room</LargeButton>
    </>
  )
}




export default roomID