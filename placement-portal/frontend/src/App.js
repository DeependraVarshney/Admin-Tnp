// App.js
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider } from './context/LoadingContext';
import ErrorBoundary from './components/ErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider>
          <LoadingProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </LoadingProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;