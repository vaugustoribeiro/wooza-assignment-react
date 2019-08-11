import React, {
    useEffect,
    useState
} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import Plan from './plan'
import * as plansApi from '../apis/plans.api'
import OptionsContainer from './options-container'

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
    }, [match.params])

    return (
        <>
            {
                fetching ?
                    <CircularProgress /> :

                    <OptionsContainer title='Escolha um Plano!'>
                        {
                            plans.map((plan, index) => <Plan key={index} plan={plan} />)
                        }
                    </OptionsContainer>
            }
        </>
    )
}

export default Plans
