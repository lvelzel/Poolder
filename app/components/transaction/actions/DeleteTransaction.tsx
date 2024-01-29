'use client'

import supabase from '@/utils/supabase'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@mui/material'
import React from 'react'
import { type TransitionProps } from 'react-transition-group/Transition'

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function DeleteTransaction ({ id, title }: {
  id: number
  title: string
}) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }
  const handleDelete = async () => {
    handleClose()

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    // TO-DO: State reload
    window.location.reload()
  }

  return (
    <>
        <Button onClick={handleClickOpen} color='error'>Delete</Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete transaction '" + title + "'" }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Be aware that this account cannot be reverted. When clicking on conform the transaction '{title}',
           with id = {id} will be permantly deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button onClick={handleDelete} color='success'>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
