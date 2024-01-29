import React from 'react'
import { Box, Modal, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'

import TransactionForm from './TransactionForm'
import type Transaction from './TransactionType'

export default function TransactionModal ({ open, handleClose, transaction }: {
  open: boolean
  handleClose: () => void
  transaction?: Transaction
}) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create a new transaction
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Add a new transaction with a title, description, date and total amount in Euro's (positive or
          negative)
        </Typography>

        <Divider variant="middle" component="p" />
        <TransactionForm handleClose={handleClose} transaction={transaction}/>

      </Box>
  </Modal>
  )
}
