import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import ButtonPreview from "@/components/ButtonPreview";
import CodeOutput from "@/components/CodeOutput";
import ColorPresets from "@/components/ColorPresets";
import SliderControl from "@/components/SliderControl";

const Index = () => {
  const [url, setUrl] = useState("");
  const [buttonText, setButtonText] = useState("🚀 Open Application");
  const [bgColor, setBgColor] = useState("#1DA1F2");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(22);
  const [paddingX, setPaddingX] = useState(30);
  const [paddingY, setPaddingY] = useState(15);
  const [borderRadius, setBorderRadius] = useState(12);

  const generateCode = () => {
    return `<a href="${url || "https://your-url.com"}" 
   style="display: inline-block; background-color: ${bgColor}; color: ${textColor}; 
          font-size: ${fontSize}px; font-weight: bold; padding: ${paddingY}px ${paddingX}px; 
          text-decoration: none; border-radius: ${borderRadius}px; transition: background 0.3s;">
    ${buttonText}
</a>`;
  };

  const handlePresetSelect = (bg: string, text: string) => {
    setBgColor(bg);
    setTextColor(text);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            URL to Embed Button Generator
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Create Beautiful</span>
            <br />
            Embed Buttons
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Transform any URL into a stylish HTML button. Customize colors, size, and copy the code instantly.
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            className="glass-card rounded-2xl p-6 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* URL Input */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Target URL
              </label>
              <Input
                type="url"
                placeholder="https://your-website.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-secondary/50 border-border/50 focus:border-primary input-glow"
              />
            </div>

            {/* Button Text */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Button Text</label>
              <Input
                type="text"
                placeholder="🚀 Open Application"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="bg-secondary/50 border-border/50 focus:border-primary input-glow"
              />
            </div>

            {/* Color Presets */}
            <ColorPresets onSelect={handlePresetSelect} />

            {/* Custom Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Background</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="bg-secondary/50 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Text Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="bg-secondary/50 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Size Controls */}
            <div className="space-y-4 pt-2">
              <SliderControl
                label="Font Size"
                value={fontSize}
                min={12}
                max={36}
                onChange={setFontSize}
              />
              <SliderControl
                label="Horizontal Padding"
                value={paddingX}
                min={10}
                max={60}
                onChange={setPaddingX}
              />
              <SliderControl
                label="Vertical Padding"
                value={paddingY}
                min={5}
                max={40}
                onChange={setPaddingY}
              />
              <SliderControl
                label="Border Radius"
                value={borderRadius}
                min={0}
                max={30}
                onChange={setBorderRadius}
              />
            </div>
          </motion.div>

          {/* Preview & Output */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Preview */}
            <div className="glass-card rounded-2xl p-6">
              <ButtonPreview
                url={url}
                text={buttonText}
                bgColor={bgColor}
                textColor={textColor}
                fontSize={fontSize}
                paddingX={paddingX}
                paddingY={paddingY}
                borderRadius={borderRadius}
              />
            </div>

            {/* Code Output */}
            <div className="glass-card rounded-2xl p-6">
              <CodeOutput code={generateCode()} />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-12 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Paste the generated code into any HTML page or email template
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
