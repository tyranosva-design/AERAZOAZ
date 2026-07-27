import React, { useState } from 'react';
import { X, Terminal, RefreshCw, CheckCircle2, AlertCircle, Database, Play } from 'lucide-react';
import { WordPressGraphQLConfig, Post } from '../types';

interface GraphQLConsoleModalProps {
  config: WordPressGraphQLConfig;
  onRefreshFromGql: (customEndpoint?: string) => Promise<void>;
  onClose: () => void;
}

export const GraphQLConsoleModal: React.FC<GraphQLConsoleModalProps> = ({
  config,
  onRefreshFromGql,
  onClose
}) => {
  const [endpointInput, setEndpointInput] = useState(config.endpoint);
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState(`query GetAERAZOAZPosts {
  posts(first: 10) {
    nodes {
      id
      title
      slug
      excerpt
      categories {
        nodes { name }
      }
    }
  }
}`);

  const handleTestConnection = async () => {
    setLoading(true);
    await onRefreshFromGql(endpointInput);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border-2 border-black w-full max-w-4xl p-4 sm:p-6 font-mono text-xs text-black shadow-2xl max-h-[92vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3 sm:pb-4 mb-3 sm:mb-4 sticky top-0 bg-white z-10 pt-1">
          <div className="flex items-center space-x-2 sm:space-x-3 pr-2">
            <Terminal className="w-5 h-5 text-black shrink-0" />
            <h2 className="font-heading font-extrabold text-sm sm:text-lg uppercase tracking-wider text-black">
              WORDPRESS GRAPHQL ENDPOINT CONSOLE
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 border border-zinc-300 hover:border-black transition-colors cursor-pointer text-black shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close GraphQL modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Endpoint Status Box */}
        <div className="bg-zinc-50 border border-zinc-300 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 border-b border-zinc-200 pb-3">
            <div>
              <span className="text-zinc-500 uppercase text-[10px] block font-bold">Target GraphQL Endpoint:</span>
              <strong className="text-black text-xs sm:text-sm break-all">{config.endpoint}</strong>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {config.status === 'connected' ? (
                <span className="flex items-center space-x-1.5 bg-black text-white border border-black px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>CONNECTED TO WP</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1.5 bg-zinc-200 text-black border border-black px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>USING RESEARCH FALLBACK</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={endpointInput}
              onChange={(e) => setEndpointInput(e.target.value)}
              placeholder="https://cms.aerazoaz.com/graphql"
              className="w-full bg-white border border-zinc-300 p-2.5 text-black font-mono text-xs focus:border-black focus:outline-none min-h-[44px]"
            />
            <button
              onClick={handleTestConnection}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-black text-white font-heading font-bold px-4 py-2.5 min-h-[44px] uppercase tracking-wider hover:bg-zinc-800 cursor-pointer shrink-0 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 shrink-0 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'SYNCING...' : 'SYNC FROM GRAPHQL'}</span>
            </button>
          </div>

          {config.errorMessage && (
            <div className="mt-3 p-3 bg-zinc-100 border-l-4 border-black text-zinc-800 text-[11px]">
              <p className="text-black font-bold mb-0.5">Note on GraphQL Endpoint:</p>
              {config.errorMessage}
            </div>
          )}
        </div>

        {/* Query Editor & Raw Payload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <span className="text-zinc-600 uppercase text-[10px] font-bold block mb-1">Active GraphQL Query Schema:</span>
            <pre className="bg-zinc-50 border border-zinc-300 p-3 h-36 sm:h-48 overflow-auto text-[10px] sm:text-[11px] text-zinc-800">
              {activeQuery}
            </pre>
          </div>

          <div>
            <span className="text-zinc-600 uppercase text-[10px] font-bold block mb-1">Raw GraphQL Server Response:</span>
            <pre className="bg-zinc-50 border border-zinc-300 p-3 h-36 sm:h-48 overflow-auto text-[10px] sm:text-[11px] text-black font-semibold">
              {config.rawResponse 
                ? JSON.stringify(config.rawResponse, null, 2) 
                : JSON.stringify({
                    status: config.status,
                    endpoint: config.endpoint,
                    lastCheck: config.lastQueryTime,
                    info: "Posts are rendered from AERAZOAZ research dataset if GraphQL endpoint is offline or CORS protected."
                  }, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-600 border-t border-zinc-200 pt-3 gap-2">
          <span>Last Query Executed: {config.lastQueryTime || 'Initial Boot'}</span>
          <button 
            onClick={onClose}
            className="bg-black text-white font-heading font-bold px-4 py-2 min-h-[40px] uppercase cursor-pointer shadow-sm"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
