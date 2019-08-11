import React from 'react'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { Typography } from '@material-ui/core'
import { withRouter } from 'react-router'

function OptionsContainer({
    title, 
    children, 
    match, 
    history,
    hideBackButton,
    layout
}) {
    
    function CanGoBack() {
        const { platformSku } = match.params

        return !!platformSku && !hideBackButton
    }

    function GoBack() {
        const { platformSku, planSku } = match.params

        if (platformSku && !planSku) {
            // go to platforms
            history.replace('/plataformas')
        }

        if (platformSku && planSku) {
            // go to plans
            history.replace(`/plataformas/${platformSku}/planos`)
        }
    }

    return (
        <Fade in={true}>
            <Paper
                style={{
                    overflow: 'hidden'
                }}
            >
                <AppBar position='relative' elevation={1}>
                    <Toolbar
                        variant='dense'
                    >
                        {
                            CanGoBack() &&
                            <IconButton
                                edge="start"
                                color="inherit"
                                style={{
                                    marginRight: 10
                                }}
                                onClick={GoBack}
                            >
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        }
                        <Typography variant='h6'>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: layout || 'row',
                        paddingRight: 10,
                        paddingBottom: 10
                    }}
                >
                    {children}
                </div>

            </Paper>
        </Fade>
    )
}

export default withRouter(OptionsContainer)