import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'

function Platform({ platform, history }) {
    return (
        <Card
            style={{
                margin: 10
            }}
        >
            <CardActionArea
                onClick={() => history.push(`/plataformas/${platform.sku.toLowerCase()}/planos`)}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        { platform.nome }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { platform.descricao }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(Platform)