import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as Router from 'react-router-dom';
import * as Containers from './containers';
import * as serviceWorker from './serviceWorker';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(_error: Error): ErrorBoundaryState | null {
    return { hasError: true };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void {
    console.error(error);
  }
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ErrorBoundary>
      <Router.BrowserRouter>
        <Containers.App />
      </Router.BrowserRouter>
    </ErrorBoundary>,
  );
}

serviceWorker.unregister();
