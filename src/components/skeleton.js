import React from 'react'

function Skeleton({ children }) {
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
            { children }
        </div>
    )
}   

export default Skeleton