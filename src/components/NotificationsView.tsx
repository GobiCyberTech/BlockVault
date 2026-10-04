import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { SOCAlert } from '../types';

interface NotificationsViewProps {
  alerts: SOCAlert[];
  onAcknowledgeAll: () => void;
  onNavigate: (view: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  alerts,
  onAcknowledgeAll,
  onNavigate,
}) => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
            Security Operations Center (SOC) Alerts
          </h1>
          <p className="text-xs text-[#c1c6d7]">
            Live audit notifications, cryptographic intrusion detections, and multisig timers
          </p>
        </div>

        <button
          onClick={onAcknowledgeAll}
          className="px-3.5 py-1.5 rounded bg-[#212a39] border border-[#414755]/40 text-[#d9e3f7] text-xs font-medium hover:border-[#48d7f9] transition-colors cursor-pointer self-start sm:self-auto"
        >
          Acknowledge All
        </button>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-8 rounded bg-[#121c2a] border border-[#414755]/20 text-center text-[#8b90a0]">
            <CheckCircle2 className="w-8 h-8 text-[#6de039] mx-auto mb-2" />
            <p className="text-xs">All Security Operations Center alerts have been resolved.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded bg-[#121c2a] border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-[#414755]/30 ${
                alert.severity === 'HIGH'
                  ? 'border-l-[#ff4d4f]'
                  : alert.severity === 'MEDIUM'
                  ? 'border-l-[#faad14]'
                  : 'border-l-[#48d7f9]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold text-[10px] font-mono uppercase tracking-wider ${
                      alert.severity === 'HIGH'
                        ? 'text-[#ff4d4f]'
                        : alert.severity === 'MEDIUM'
                        ? 'text-[#faad14]'
                        : 'text-[#48d7f9]'
                    }`}
                  >
                    {alert.severity} SEVERITY
                  </span>
                  <span className="text-[10px] font-mono text-[#8b90a0]">
                    {alert.timestamp}
                  </span>
                  {alert.resolved && (
                    <span className="text-[10px] font-mono text-[#6de039] font-bold">
                      • RESOLVED
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-[#d9e3f7] mt-1 font-headline">
                  {alert.title}
                </h4>
                <p className="text-xs text-[#c1c6d7] mt-0.5 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              {alert.targetView && !alert.resolved && (
                <button
                  onClick={() => onNavigate(alert.targetView!)}
                  className="px-3 py-1.5 bg-[#16202f] hover:bg-[#212a39] text-[#48d7f9] text-[11px] font-mono rounded border border-[#414755]/40 hover:border-[#48d7f9] transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Investigate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
