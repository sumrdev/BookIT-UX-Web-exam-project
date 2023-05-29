import Image from 'next/image'
import styled from 'styled-components'

const RoomImageContainer = styled.div`
    width: 100%;
    height: 160px;
    margin-bottom: 1rem;
    position: relative;
    max-width: 400px;
    @media (min-width: 768px) {
        height: 200px;
    }
`

const RoomImage = styled(Image).attrs<{type:string, width:number}>((props) => ({
        src: `/images/${props.type}.png`,
        alt: `Image of ${props.type} room`,
    }))`
    border-radius: 10px;
    margin-bottom: 1rem;
    object-fit: cover;
    filter: brightness(50%)
`

const RoomImageText = styled.div`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 100%;
    height: 120px;
    color: white;
    font-size: 1.4rem;
    font-weight: 500;
`

export { RoomImageContainer, RoomImage, RoomImageText }