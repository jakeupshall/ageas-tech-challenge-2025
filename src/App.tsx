import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Dashboard } from 'modules';

import './styles/base.scss';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app__header">What Weather?</header>
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
};

export default App;
