import { useEffect } from "react";

export default function About(){

    useEffect(() => {
        fetch('http://localhost:3000/', { method: 'GET' })
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

    return (
        <div>
            <p>This is the about page</p>
        </div>
    )
}