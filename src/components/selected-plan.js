import React, {
    useState,
    useEffect
} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withRouter } from 'react-router'

import * as plansApi from '../apis/plans.api'

function SelectedPlan({ match, history }) {
    const [plan, setPlan] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchPlatform = async () => {
            try {
                const { platformSku, planSku } = match.params

                const plans = await plansApi.getActiveByPlatformSku(platformSku)

                const plan = plans.find(p => p.sku.toLowerCase() === planSku.toLowerCase())

                setPlan(plan)
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
                            <Typography variant='subtitle1'>Você escolheu o plano de {plan.franquia.toUpperCase()} por {plan.valor.toUpperCase()}!</Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => history.replace(`/plataformas/${match.params.platformSku}/planos`)}
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

export default withRouter(SelectedPlan)