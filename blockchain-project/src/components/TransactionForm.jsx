import { useState } from "react";
import { Paper, Typography, TextField, Button, Grid, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function TransactionForm({ onSubmit, loading }) {
  const [transaction, setTransaction] = useState({
    sender: "",
    recipient: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(transaction);
    setTransaction({ sender: "", recipient: "", amount: "" });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Create New Transaction
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Sender"
              value={transaction.sender}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  sender: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Recipient"
              value={transaction.recipient}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  recipient: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  amount: e.target.value,
                })
              }
              required
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={<SendIcon />}
          >
            {loading ? "Mining..." : "Mine Block"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
