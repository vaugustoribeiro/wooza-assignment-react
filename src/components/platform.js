import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

function Platform({ platform, history }) {
    return (
        <Card
            style={{
                marginTop:  10,
                marginLeft: 10
            }}
            elevation={0}
        >
            <CardContent
                style={{
                    paddingBottom: 0
                }}
            >
                <Typography gutterBottom variant='h6' color='primary' component='p' align='center'>
                    {platform.nome}
                </Typography>
                <Typography variant='subtitle1' component='p' align='center'>
                    {platform.descricao}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size='small'
                    fullWidth
                    color='primary'
                    variant='outlined'
                    onClick={() =>
                        history.push(`/plataformas/${platform.sku.toLowerCase()}/planos`)
                    }>Escolher</Button>
            </CardActions>
        </Card>
    )
}

export default withRouter(Platform)