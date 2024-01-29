import React from 'react'
import dayjs from 'dayjs'

import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import supabase from '@/utils/supabase'
import type Transaction from './TransactionType'

interface TransactionCrud {
  id?: number
  title?: string
  description?: string
  date?: Date
  amount?: number
}

function parseTransationToCrud (transaction?: Transaction): TransactionCrud {
  const transactionCrud: TransactionCrud = {
    id: transaction ? transaction.id : undefined,
    title: transaction ? transaction.title : undefined,
    description: transaction ? transaction.description : undefined,
    date: transaction ? transaction.date : undefined,
    amount: transaction ? transaction.amount : undefined
  }
  return transactionCrud
}

export default function TransactionForm ({ handleClose, transaction }: {
  handleClose: () => void
  transaction?: Transaction
}) {
  const crud: TransactionCrud = parseTransationToCrud(transaction)

  const setTitle = (x: string) => crud.title = x
  const setDescription = (x: string) => crud.description = x
  const setAmount = (x: string) => crud.amount = Number.parseFloat(x)
  const setDate = (x: Date) => crud.date = x

  const createNewTransaction = async (transactionCrud: TransactionCrud) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .insert({
          title: transactionCrud.title,
          description: transactionCrud.description,
          date: transactionCrud.date,
          amount: transactionCrud.amount
        })
    } catch (error) {
      console.log(error)
    }
  }

  const updateTransaction = async (transactionCrud: TransactionCrud) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({
          title: transactionCrud.title,
          description: transactionCrud.description,
          date: transactionCrud.date,
          amount: transactionCrud.amount
        })
        .eq('id', transactionCrud.id)
    } catch (error) {
      console.log(error)
    }
  }
  function validateForm(transactionCrud: TransactionCrud) {
    if (!transactionCrud.title || transactionCrud.title.length == 0) {
      alert('Invalid Form, Title can not be empty')
      return false
    }
    if (!transactionCrud.description || transactionCrud.description.length == 0) {
      alert('Invalid Form, Description can not be empty')
      return false
    }

    if (!transactionCrud.amount ) {
      alert('Invalid Form, Amount can not be empty')
      return false
    }

    return true
  }
  const saveData = async () => {
    if(!validateForm(crud))
      return
    if (!crud.id) {
       createNewTransaction(crud) 
      } else {
         updateTransaction(crud) 
        }

    handleClose()
    window.location.reload()
  }

  return (
     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='NL'>

        { crud.id &&
            <TextField id="new-transaction-id" label="Id" variant="filled" value={crud.id} sx={{py:1}} disabled/>
        }
        <TextField id="new-transaction-title" label="Title" variant="outlined" sx={{py:1}}
            defaultValue={crud.title} onChange={e => { setTitle(e.currentTarget.value) }}/>
        <TextField id="new-transaction-description" label="Description" variant="outlined" sx={{py:1}}
            defaultValue={crud.description} onChange={e => { setDescription(e.currentTarget.value) }}/>
        <DateTimePicker label="Basic date time picker" defaultValue={dayjs(crud.date)} sx={{py:1}}
            onChange={e => { setDate(e.toDate()) }}/>
        <FormControl fullWidth sx={{ m: 0 }}> 
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Amount"
            defaultValue={crud.amount}
            onChange={e => { setAmount(e.currentTarget.value) }}
          />
        </FormControl>
            <p/>
        <Button onClick={saveData} color={ transaction ? 'success' : 'info'}>{ transaction ? 'Save' : 'Create'}</Button>
        <Button onClick={handleClose} color='error'>Cancel</Button>
    </LocalizationProvider>

  )
}
