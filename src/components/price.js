import React from 'react'
import Typography from '@material-ui/core/Typography'

function Price({ value }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}
        >
            <span
                style={{
                    fontSize: 14,
                    color: '#999'
                }}
            >R$</span>
            <Typography variant='h5' component='span'>
                {value}
            </Typography>
            <span
                style={{
                    fontSize: 14,
                    color: '#999'
                }}
            >/mês</span>
        </div>
    )
}

export default Price