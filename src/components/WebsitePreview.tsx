import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, CreditCard, Mail, Layout, Moon, Sun } from "lucide-react";

interface WebsitePreviewProps {
  buttonHtml: React.ReactNode;
}

type PreviewMode = "hero" | "card" | "email" | "minimal";

const WebsitePreview = ({ buttonHtml }: WebsitePreviewProps) => {
  const [mode, setMode] = useState<PreviewMode>("hero");
  const [isDark, setIsDark] = useState(false);

  const modes = [
    { id: "hero" as const, label: "Hero Section", icon: Monitor },
    { id: "card" as const, label: "Card", icon: CreditCard },
    { id: "email" as const, label: "Email", icon: Mail },
    { id: "minimal" as const, label: "Minimal", icon: Layout },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Website Preview</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-md transition-all ${
              isDark
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
            title={isDark ? "Switch to Light" : "Switch to Dark"}
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <div className="flex gap-1 p-1 rounded-lg bg-secondary/50">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`p-2 rounded-md transition-all ${
                  mode === m.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                title={m.label}
              >
                <m.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${isDark}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl overflow-hidden border border-border/50"
        >
          {mode === "hero" && (
            <div className={`p-8 ${isDark ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100"}`}>
              {/* Browser chrome */}
              <div className={`rounded-t-lg p-2 flex items-center gap-2 ${isDark ? "bg-slate-800/50" : "bg-slate-300/50"}`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className={`flex-1 rounded-md h-6 mx-8 ${isDark ? "bg-slate-700/50" : "bg-slate-200/80"}`} />
              </div>
              {/* Hero content */}
              <div className={`rounded-b-lg p-8 text-center space-y-4 ${isDark ? "bg-slate-900" : "bg-white"}`}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto" />
                <div className="space-y-2">
                  <div className={`h-8 rounded-lg w-3/4 mx-auto ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
                  <div className={`h-4 rounded w-2/3 mx-auto ${isDark ? "bg-slate-800" : "bg-slate-100"}`} />
                  <div className={`h-4 rounded w-1/2 mx-auto ${isDark ? "bg-slate-800" : "bg-slate-100"}`} />
                </div>
                <div className="pt-4">{buttonHtml}</div>
              </div>
            </div>
          )}

          {mode === "card" && (
            <div className={`p-8 ${isDark ? "bg-gradient-to-br from-slate-950 to-slate-900" : "bg-gradient-to-br from-slate-100 to-slate-200"}`}>
              <div className={`max-w-sm mx-auto rounded-2xl shadow-xl overflow-hidden ${isDark ? "bg-slate-800" : "bg-white"}`}>
                <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600" />
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className={`h-5 rounded w-3/4 ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
                    <div className={`h-3 rounded w-full ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                    <div className={`h-3 rounded w-5/6 ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                  </div>
                  <div className="pt-2">{buttonHtml}</div>
                </div>
              </div>
            </div>
          )}

          {mode === "email" && (
            <div className={`p-6 ${isDark ? "bg-slate-950" : "bg-slate-200"}`}>
              <div className={`max-w-md mx-auto rounded-lg shadow-lg overflow-hidden ${isDark ? "bg-slate-800" : "bg-white"}`}>
                {/* Email header */}
                <div className={`px-6 py-4 border-b ${isDark ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                  <div className={`h-4 rounded w-1/3 mb-2 ${isDark ? "bg-slate-700" : "bg-slate-300"}`} />
                  <div className={`h-3 rounded w-1/4 ${isDark ? "bg-slate-700/50" : "bg-slate-200"}`} />
                </div>
                {/* Email body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className={`h-4 rounded w-1/4 ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
                    <div className={`h-3 rounded w-full ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                    <div className={`h-3 rounded w-full ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                    <div className={`h-3 rounded w-3/4 ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                  </div>
                  <div className="py-4 text-center">{buttonHtml}</div>
                  <div className="space-y-2">
                    <div className={`h-3 rounded w-full ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                    <div className={`h-3 rounded w-2/3 ${isDark ? "bg-slate-700/50" : "bg-slate-100"}`} />
                  </div>
                </div>
                {/* Email footer */}
                <div className={`px-6 py-3 border-t ${isDark ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
                  <div className={`h-2 rounded w-1/2 mx-auto ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />
                </div>
              </div>
            </div>
          )}

          {mode === "minimal" && (
            <div className="grid grid-cols-2 gap-0">
              {/* Light background */}
              <div className="bg-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-3">Light Mode</p>
                  {buttonHtml}
                </div>
              </div>
              {/* Dark background */}
              <div className="bg-slate-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-3">Dark Mode</p>
                  {buttonHtml}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WebsitePreview;
