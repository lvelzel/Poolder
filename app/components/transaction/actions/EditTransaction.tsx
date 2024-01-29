'use client'

import React, { useState } from 'react'
import type Transaction from '../TransactionType'
import TransactionModal from '../TransactionModal'
import { Button } from '@mui/material'

export default function EditTransaction ({ transaction }: {
  transaction: Transaction
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  return (
    <>
      <Button onClick={handleOpen} color='warning'>Edit</Button>
      {open && <TransactionModal open={open} handleClose={handleClose} transaction={transaction}/>}
    </>
  )
}
