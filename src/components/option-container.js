import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

function OptionContainer({ action, actionTitle, children }) {

    return (
        <Card
            style={{
                marginTop: 10,
                marginLeft: 10
            }}
            elevation={0}
        >
            <CardContent
                style={{
                    paddingBottom: 0
                }}
            >
                { children }
            </CardContent>
            <CardActions>
                <Button
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={action}>{actionTitle}</Button>
            </CardActions>
        </Card>
    )
}

export default OptionContainer