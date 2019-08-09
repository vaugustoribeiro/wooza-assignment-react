import React, {
    useEffect,
    useState
} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import normalizeString from '../utils/normalize-string'
import Platform from './platform'
import { Typography } from '@material-ui/core'

import * as platformsApi from '../apis/platforms.api'

function Platforms() {
    const [platforms, setPlatforms] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const platforms = await platformsApi.get()
                setPlatforms(platforms.map(p => ({ ...p, descricao: p.descricao })))
            } catch (err) {
                console.log(err)
            } finally {
                setFetching(false)
            }
        }

        fetchPlatforms()
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            {
                fetching ?
                    <CircularProgress /> :
                    <>
                        <Typography variant='h4'>Qual plataforma?</Typography>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: 30
                            }}
                        >
                        {
                            platforms.map((platform, index) => <Platform key={index} platform={platform} />)
                        }
                        </div>
                    </>
            }
        </div>
    )
}

export default Platforms
