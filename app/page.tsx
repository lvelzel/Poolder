import supabase from "@/utils/supabase";
import { cookies } from "next/headers";
import TransactionRow from "./components/transaction/TransactionRow";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default async function Home() {
  const cookieStore = cookies();
  const { data: transactions } = await supabase.from("transactions").select();
  let fullAmount = 0;
  if (transactions) {
    transactions.map((r) => (fullAmount += r.amount));
  }

  return (
    <>
      <p>Total amount of money spent: € {fullAmount.toFixed(2)}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions ? (
              transactions.map((row) => (
                <TransactionRow key={row.id} transaction={row} />
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
