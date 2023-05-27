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
    const [tableData, setTableData] = useState<string[][]>([]);
    useEffect(() => {
        if (data) {
            const newData: string[][] = [];
            roomInformaitonKeys.forEach((key) => {
                const value = data[key];
                let newvalue = "";
                if (typeof value == "boolean") {
                    newvalue = value ? "Yes" : "No";
                } else if (typeof value == "number") {
                    newvalue = value.toString();
                } else if (typeof value == "string") {
                    newvalue = value.charAt(0).toUpperCase() + value.slice(1);
                } else {
                    newvalue = "Unknown";
                }
                if (key == "capacity") newvalue += " people";
                if (key == "powerOutlets" || key=="ethernetPorts") newvalue += "+";
                const newKey = key.charAt(0).toUpperCase() + key.slice(1);
                newData.push([newKey, newvalue]);
            });
            setTableData(newData);
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
                    {tableData.map((array, index) => (
                        <TableRow key={index}>
                            <TableCategory>{array[0]}</TableCategory>
                            <TableDataText>{array[1]}</TableDataText>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        )}
        <FloatButton onClick={() => router.push(`/book/${roomID}`)}>Select time</FloatButton>
    </>
  )
}




export default roomID