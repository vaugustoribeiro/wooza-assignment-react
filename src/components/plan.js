import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'

function Plan({ plan, match, history }) {

    console.log(match)
    return (
        <Card
            style={{
                margin: 10
            }}
        >
            <CardActionArea
                onClick={() => history.push(`/plataformas/${match.params.platformSku.toLowerCase()}/planos/${plan.sku.toLowerCase()}/solicitar`)}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        R$ { plan.valor }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { plan.franquia }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(Plan)