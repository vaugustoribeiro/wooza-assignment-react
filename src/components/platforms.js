import React, {
    useEffect,
    useState
} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import normalizeString from '../utils/normalize-string'
import Platform from './platform'

import * as platformsApi from '../apis/platforms.api'

import OptionsContainer from './options-container'

function Platforms() {
    const [platforms, setPlatforms] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const platforms = await platformsApi.get()
                setPlatforms(platforms.map(p => ({ ...p, descricao: normalizeString(p.descricao) })))
            } catch (err) {
                console.log(err)
            } finally {
                setFetching(false)
            }
        }

        fetchPlatforms()
    }, [])

    return (
        <>
            {
                fetching ?
                    <CircularProgress /> :
                    <OptionsContainer title='Escolha uma plataforma!'>
                        {
                            platforms.map((platform, index) => <Platform key={index} platform={platform} />)
                        }
                    </OptionsContainer>
            }

        </>
    )
}

export default Platforms
