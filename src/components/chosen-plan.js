import React, {
    useState,
    useEffect
} from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import * as plansApi from '../apis/plans.api'
import * as platformsApi from '../apis/platforms.api'

import Price from './price'
import OptionsContainer from './options-container'

function ChosenPlan({
    match,
    history,
    setSelectedPlan,
    setSelectedPlatform,
    disabled
}) {
    const [plan, setPlan] = useState(null)
    const [platform, setPlaform] = useState(null)
    const [fetching, setFetching] = useState(true)

    const { platformSku, planSku } = match.params

    useEffect(() => {
        const fetchData = async () => {
            try {
                const platformTask = platformsApi.getBySku(platformSku)
                const planTask = plansApi.getActiveByPlatformSku(platformSku)

                const platform = await platformTask
                const plans = await planTask

                const plan = plans.find(p => p.sku.toLowerCase() === planSku.toLowerCase())

                setPlan(plan)
                setPlaform(platform)
                setSelectedPlan(plan)
                setSelectedPlatform(platform)
            } catch (err) {
                console.log(err)
            } finally {
                setFetching(false)
            }
        }
        fetchData()
    }, [platformSku, planSku, setSelectedPlan, setSelectedPlatform])

    return (
        <>
            {
                fetching ?
                    <CircularProgress />
                    :
                    <OptionsContainer
                        title='Plano Escolhido'
                        hideBackButton={true}
                        layout='column'
                    >
                        <div
                            style={{
                                paddingTop: 10,
                                paddingLeft: 10
                            }}
                        >
                            <Typography variant='h6' align='center' gutterBottom>{platform.nome}</Typography>
                            <Typography variant='h5' align='center' gutterBottom color='primary'>{plan.franquia}</Typography>
                            <Price value={plan.valor} />
                            {
                                !disabled &&
                                < Button
                                    size='small'
                                    variant='outlined'
                                    fullWidth
                                    color='primary'
                                    style={{
                                        marginTop: 8
                                    }}
                                    onClick={() => {
                                        history.replace(`/plataformas/${platformSku}/planos`)
                                    }}
                                >
                                    Trocar Plano
                                </Button>
                            }
                        </div>
                    </OptionsContainer>
            }
        </>
    )
}

export default withRouter(ChosenPlan)