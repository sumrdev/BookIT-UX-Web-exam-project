import { use, useEffect, useState } from "react";

function useDB(apiPath: string) {
    const [data, setData] = useState<any>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    async function fetchData() {
        try {
            if (apiPath === "") return
            const token = document.cookie.split("=")[1];
            if (!token) throw new Error("Unauthorized");
            setLoading(true)
            console.log("fetching data at: " + `${process.env.NEXT_PUBLIC_DB_ENDPOINT}/${apiPath}`)
            const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ENDPOINT}/${apiPath}`, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': "Bearer " + token, // notice the Bearer before your token
                },
            })
            if(response.status === 401) {
                throw new Error("Unauthorized")
            }
            const data = await response.json()
            setData(data);
            setError(null) 
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, [apiPath])

    useEffect(() => {
        if (!loading && error) console.log(error)
        if (!loading && error && error.message === "Unauthorized") window.location.href = "/login"
    }, [error])
    
    return { data, loading, error, fetchData };
}

export { useDB }