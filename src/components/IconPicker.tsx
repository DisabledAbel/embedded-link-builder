import { motion } from "framer-motion";

interface IconPickerProps {
  onSelect: (icon: string) => void;
}

const iconGroups = [
  {
    label: "Arrows",
    icons: [
      { emoji: "➡️", name: "Right Arrow" },
      { emoji: "⬅️", name: "Left Arrow" },
      { emoji: "⬆️", name: "Up Arrow" },
      { emoji: "⬇️", name: "Down Arrow" },
      { emoji: "↗️", name: "Diagonal Arrow" },
      { emoji: "🔙", name: "Back" },
    ],
  },
  {
    label: "Actions",
    icons: [
      { emoji: "🚀", name: "Rocket" },
      { emoji: "▶️", name: "Play" },
      { emoji: "⏩", name: "Fast Forward" },
      { emoji: "🔗", name: "Link" },
      { emoji: "📥", name: "Download" },
      { emoji: "📤", name: "Upload" },
    ],
  },
  {
    label: "Status",
    icons: [
      { emoji: "✅", name: "Check" },
      { emoji: "⭐", name: "Star" },
      { emoji: "🔥", name: "Fire" },
      { emoji: "💡", name: "Idea" },
      { emoji: "⚡", name: "Lightning" },
      { emoji: "🎯", name: "Target" },
    ],
  },
  {
    label: "Objects",
    icons: [
      { emoji: "📧", name: "Email" },
      { emoji: "📱", name: "Phone" },
      { emoji: "🛒", name: "Cart" },
      { emoji: "💳", name: "Card" },
      { emoji: "🔒", name: "Lock" },
      { emoji: "🎁", name: "Gift" },
    ],
  },
];

const IconPicker = ({ onSelect }: IconPickerProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Add Icon to Button</p>
      {iconGroups.map((group, groupIndex) => (
        <div key={group.label} className="space-y-2">
          <p className="text-xs text-muted-foreground/70 uppercase tracking-wider">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.icons.map((icon, iconIndex) => (
              <motion.button
                key={icon.name}
                onClick={() => onSelect(icon.emoji)}
                className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/50 flex items-center justify-center text-xl transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: groupIndex * 0.1 + iconIndex * 0.02 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={icon.name}
              >
                {icon.emoji}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconPicker;
