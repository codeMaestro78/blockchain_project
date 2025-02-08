import { Paper, Typography, Box, Chip } from "@mui/material";
import moment from "moment";

export default function Block({ block }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 2,
        background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
        color: "white",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Block #{block.index}</Typography>
        <Chip
          label={`Nonce: ${block.nonce}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Typography variant="body2" sx={{ wordBreak: "break-all", mb: 1 }}>
        <strong>Hash:</strong> {block.hash}
      </Typography>

      <Typography variant="body2" sx={{ wordBreak: "break-all", mb: 1 }}>
        <strong>Previous Hash:</strong> {block.previousHash}
      </Typography>

      <Typography variant="body2" mb={2}>
        <strong>Timestamp:</strong> {moment(block.timestamp).format("LLLL")}
      </Typography>

      <Typography variant="subtitle1" mb={1}>
        Transactions:
      </Typography>

      {block.transactions &&
        block.transactions.map((tx, index) => (
          <Paper
            key={index}
            sx={{ p: 2, mb: 1, bgcolor: "rgba(255,255,255,0.1)" }}
          >
            <Typography variant="body2">
              <strong>From:</strong> {tx.sender}
            </Typography>
            <Typography variant="body2">
              <strong>To:</strong> {tx.recipient}
            </Typography>
            <Typography variant="body2">
              <strong>Amount:</strong> {tx.amount}
            </Typography>
          </Paper>
        ))}
    </Paper>
  );
}
