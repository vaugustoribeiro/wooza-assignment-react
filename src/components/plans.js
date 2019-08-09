import React, {
    useEffect,
    useState
} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import Plan from './plan'
import * as plansApi from '../apis/plans.api'
import SelectedPlatform from './selected-platform'

function Plans({ match, history }) {
    
    const [plans, setPlans] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const { platformSku } = match.params
                const plans = await plansApi.getActiveByPlatformSku(platformSku)
                setPlans(plans)
            } catch (err) {
                console.log(err)
            } finally {
                setFetching(false)
            }
        }

        fetchPlans()
    }, [match.params.platformSku])

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
                        <SelectedPlatform />

                        <Typography variant='h4'>Qual o plano desejado?</Typography>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: 30
                            }}
                        >
                        {
                            plans.map((plan, index) => <Plan key={index} plan={plan} />)
                        }
                        </div>
                    </>
            }
        </div>
    )
}

export default Plans
