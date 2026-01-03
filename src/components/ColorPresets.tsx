import { motion } from "framer-motion";

interface ColorPresetsProps {
  onSelect: (bg: string, text: string) => void;
}

const presets = [
  { name: "Twitter Blue", bg: "#1DA1F2", text: "#FFFFFF" },
  { name: "GitHub Dark", bg: "#24292e", text: "#FFFFFF" },
  { name: "Success Green", bg: "#10B981", text: "#FFFFFF" },
  { name: "Sunset Orange", bg: "#F97316", text: "#FFFFFF" },
  { name: "Royal Purple", bg: "#8B5CF6", text: "#FFFFFF" },
  { name: "Rose Pink", bg: "#EC4899", text: "#FFFFFF" },
  { name: "Ocean Teal", bg: "#14B8A6", text: "#FFFFFF" },
  { name: "Slate Dark", bg: "#334155", text: "#FFFFFF" },
];

const ColorPresets = ({ onSelect }: ColorPresetsProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Quick Presets</p>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset, index) => (
          <motion.button
            key={preset.name}
            onClick={() => onSelect(preset.bg, preset.text)}
            className="group relative w-8 h-8 rounded-lg border-2 border-transparent hover:border-primary/50 transition-all"
            style={{ backgroundColor: preset.bg }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={preset.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPresets;
