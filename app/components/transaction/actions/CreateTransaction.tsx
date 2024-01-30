"use client";

import { Button } from "@mui/material";
import React, { useState } from "react";
import TransactionModal from "../TransactionModal";
import styles from "../Transaction.module.css";

const CreateTransaction = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.newTransactionContainer}>
      <Button onClick={handleOpen} variant="outlined">
        Add new transaction
      </Button>
      {open && <TransactionModal open={open} handleClose={handleClose} />}
    </div>
  );
};

export default CreateTransaction;
