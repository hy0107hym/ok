import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Main from "./layout/Main";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main></Main>
    </QueryClientProvider>
  );
}

export default App;
