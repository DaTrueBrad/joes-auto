import { Box, AppBar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box>
      <AppBar position='static' sx={{padding: 1}}>
        <Typography variant='h3'>Joe's Auto</Typography>
      </AppBar>
    </Box>
  )
}

export default Header