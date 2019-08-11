import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'

import OptionContainer from './option-container'
import Price from './price'

function Plan({ plan, match, history }) {
    return (
        <OptionContainer
            action={() =>
                history.push(`/plataformas/${match.params.platformSku.toLowerCase()}/planos/${plan.sku.toLowerCase()}/solicitar`)
            }
            actionTitle='Contratar Agora'
        >
            <Typography variant='h6' color='primary' component='p' align='center'>
                {plan.franquia}
            </Typography>

            <Price value={plan.valor} />
        </OptionContainer>
    )
}

export default withRouter(Plan)