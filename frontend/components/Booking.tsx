import { styled } from "styled-components";

const BookingBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff; 
    margin-top: 15px;
    width: 90%;
    padding: 15px;
    border-radius: 10px;
`;

const Times = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    self-align: center;
`;

const P = styled.p`
    margin: 0;
`;



function Booking (booking: Object){
    const {type, name, start, end} = booking;

    const upcoming =   end > Date.now() ? " Upcoming" : " Past";

    return (
        <BookingBox>
            <div>
                {type}
                <br />
                {name}
            </div>
            <Times>
                {start}
                <br />
                <P>|</P>
                {end}
            </Times>
            <div>
                Upcoming
            </div>
        </BookingBox>
    )
}

export default Booking;