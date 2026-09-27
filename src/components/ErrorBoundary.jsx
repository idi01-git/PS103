import React from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[PAIMANA Platform ErrorBoundary]', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 text-[#0f172a]">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-[#ebebeb] shadow-xl p-6 sm:p-8 space-y-6 text-center">
            
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-xs">
              <ShieldAlert className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-wider">
                  SESSION INTEGRITY ISOLATION
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0f172a] tracking-tight">
                Temporary Rendering Variance Encountered
              </h2>
              <p className="text-xs text-[#64748b] leading-relaxed max-w-md mx-auto">
                PAIMANA surveillance caught an unexpected runtime variance. Platform session state has been protected to ensure data consistency.
              </p>
            </div>

            {/* Error Message Details (Non-Intrusive) */}
            {this.state.error && (
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] text-left text-xs font-mono text-[#64748b] max-h-32 overflow-y-auto">
                <span className="font-bold text-rose-600">Exception: </span>
                {this.state.error.message || 'Unknown runtime variance'}
              </div>
            )}

            {/* Action Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Platform</span>
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] text-xs font-semibold border border-[#e2e8f0] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Refresh View</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-[#94a3b8] border-t border-[#f1f5f9] pt-4">
              MoSPI OCMS Surveillance Engine v3.2.1 • All Rights Reserved
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
