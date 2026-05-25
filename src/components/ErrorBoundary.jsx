import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'Manrope, sans-serif', maxWidth: 640, margin: '40px auto' }}>
          <h1 style={{ color: '#0B1C33', fontFamily: 'Nunito, sans-serif' }}>Something went wrong</h1>
          <pre style={{ marginTop: 16, padding: 16, background: '#fff3e8', borderRadius: 12, overflow: 'auto', fontSize: 13 }}>
            {this.state.error.message}
          </pre>
          <button
            type="button"
            style={{ marginTop: 20, background: '#F37021', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 50, fontWeight: 800, cursor: 'pointer' }}
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
