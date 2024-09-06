import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingBackdrop = ({openBackdrop}) => {
  return (
    <div>
        <Backdrop open={openBackdrop} sx={{ color: "#fff" }}>
          <CircularProgress />
        </Backdrop>
    </div>
  )
}

export default LoadingBackdrop