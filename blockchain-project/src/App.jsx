import { Typography, Box } from "@mui/material";
import Layout from "./components/Layout";
import Block from "./components/Block";
import TransactionForm from "./components/TransactionForm";
import useBlockchain from "./hooks/useBlockchain";

function App() {
  const { blocks, loading, mineNewBlock } = useBlockchain();

  return (
    <Layout>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          backgroundClip: "text",
          textFillColor: "transparent",
          mb: 4,
        }}
      >
        Blockchain Explorer
      </Typography>

      <TransactionForm onSubmit={mineNewBlock} loading={loading} />

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Blockchain
        </Typography>
        {blocks.map((block) => (
          <Block key={block.hash} block={block} />
        ))}
      </Box>
    </Layout>
  );
}

export default App;
