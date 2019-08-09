import React, {
    useEffect,
    useState
} from 'react'

function Platforms() {
    const [platforms, setPlatforms] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await fetch('')
                const json = await response.json()
                setPlatforms(json.plataformas)
            } catch (err) {
                console.log(err)
            } finally {
                setFetching(false)
            }
        }

        fetchPlatforms()
    }, [])

    return (
        <div>
            Plataformas
        </div>
    )
}

export default Platforms
