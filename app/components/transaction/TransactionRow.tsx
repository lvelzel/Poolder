import React from 'react'
import dayjs from 'dayjs'

import EditTransaction from './actions/EditTransaction'
import DeleteTransaction from './actions/DeleteTransaction'
import type Transaction from './TransactionType'
import { TableCell, TableRow } from '@mui/material'

export default function TransactionRow ({
  transaction
}: {
  transaction: Transaction
}) {
  return (
            <TableRow
              key={transaction.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction.id}
              </TableCell>
              <TableCell align="right">{transaction.title}</TableCell>
              <TableCell align="right">{transaction.description}</TableCell>
              <TableCell align="right">€ {transaction.amount.toFixed(2)}</TableCell>
              <TableCell align="right">{dayjs(transaction.date).format('MM/DD/YYYY HH:mm A')}</TableCell>
              <TableCell align="right">
                <EditTransaction transaction={transaction} />
                <DeleteTransaction id={transaction.id} title={transaction.title}/></TableCell>
            </TableRow>
  )
}
