import { motion } from "framer-motion";

interface ButtonPreviewProps {
  url: string;
  text: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
}

const ButtonPreview = ({
  url,
  text,
  bgColor,
  textColor,
  fontSize,
  paddingX,
  paddingY,
  borderRadius,
}: ButtonPreviewProps) => {
  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "transparent",
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight: "normal",
    padding: `${paddingY}px ${paddingX}px`,
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">Live Preview</p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="p-8 rounded-xl bg-secondary/50 border border-border/50"
      >
        <motion.a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => !url && e.preventDefault()}
        >
          {text || "🚀 Click Me"}
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ButtonPreview;
