import './App.css';
import LoadInfiniteData from './components/LoadInfiniteData';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoadInfiniteData />
      </QueryClientProvider>
    </>
  );
}

export default App;
