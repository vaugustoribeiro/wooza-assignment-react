import React, {
    useState,
    useEffect
} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter } from 'react-router'

import * as platformsApi from '../apis/platforms.api'

function SelectedPlatform({ match, history }) {
    const [platform, setPlaform] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchPlatform = async () => {
            try {
                const { platformSku } = match.params
                const platform = await platformsApi.getBySku(platformSku)
                setPlaform(platform)
            } catch (err) {
                console.log(err)
            } finally {
                setFetching(false)
            }
        }
        fetchPlatform()
    }, [])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 30
                }}
            >
                {
                    fetching ?
                        <CircularProgress /> :
                        <>
                            <Typography variant='subtitle1'>Você escolheu a plataforma {platform.nome.toUpperCase()}!</Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => history.replace('/plataformas')}
                                style={{
                                    marginLeft: 15
                                }}
                            >
                                Trocar
                            </Button>
                        </>
                }
            </div>
        </>
    )
}

export default withRouter(SelectedPlatform)