import { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  getRootErrorHandlers,
  TelemetryErrorBoundary,
} from '@ds/telemetry/telemetry';
import App from './App';
import './fonts.css';

class BootErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            padding: 16,
            fontFamily: 'monospace',
          }}
        >
          {this.state.error.message}
          {'\n'}
          {this.state.error.stack}
        </pre>
      );
    }
    return this.props.children;
  }
}

const rootTag = document.getElementById('root');
if (!rootTag) {
  throw new Error('Missing #root');
}

createRoot(rootTag, getRootErrorHandlers()).render(
  <BootErrorBoundary>
    <TelemetryErrorBoundary>
      <App />
    </TelemetryErrorBoundary>
  </BootErrorBoundary>,
);
