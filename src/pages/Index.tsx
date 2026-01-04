import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link2, Sparkles, Save, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ButtonPreview from "@/components/ButtonPreview";
import CodeOutput from "@/components/CodeOutput";
import ColorPresets from "@/components/ColorPresets";
import SliderControl from "@/components/SliderControl";
import IconPicker from "@/components/IconPicker";
import WebsitePreview from "@/components/WebsitePreview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ButtonPreset {
  id: string;
  name: string;
  url: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  paddingX: number;
  paddingY: number;
  borderRadius: number;
  buttonStyle: "solid" | "link";
  hoverScale: number;
  hoverShadow: number;
  hoverBgColor: string;
}

const PRESETS_STORAGE_KEY = "button-generator-presets";

const Index = () => {
  const [url, setUrl] = useState("");
  const [buttonText, setButtonText] = useState("🚀 Open Application");
  const [bgColor, setBgColor] = useState("#1DA1F2");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(22);
  const [paddingX, setPaddingX] = useState(30);
  const [paddingY, setPaddingY] = useState(15);
  const [borderRadius, setBorderRadius] = useState(12);
  const [buttonStyle, setButtonStyle] = useState<"solid" | "link">("solid");
  const [hoverScale, setHoverScale] = useState(105);
  const [hoverShadow, setHoverShadow] = useState(20);
  const [hoverBgColor, setHoverBgColor] = useState("#1A91DA");
  
  const [savedPresets, setSavedPresets] = useState<ButtonPreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
  const [presetName, setPresetName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (stored) {
      setSavedPresets(JSON.parse(stored));
    }
  }, []);

  const savePreset = () => {
    const name = presetName.trim() || `Preset ${savedPresets.length + 1}`;
    const newPreset: ButtonPreset = {
      id: Date.now().toString(),
      name,
      url,
      buttonText,
      bgColor,
      textColor,
      fontSize,
      paddingX,
      paddingY,
      borderRadius,
      buttonStyle,
      hoverScale,
      hoverShadow,
      hoverBgColor,
    };
    const updated = [...savedPresets, newPreset];
    setSavedPresets(updated);
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(updated));
    setPresetName("");
    toast.success(`Saved "${name}"`);
  };

  const loadPreset = (id: string) => {
    const preset = savedPresets.find((p) => p.id === id);
    if (preset) {
      setUrl(preset.url);
      setButtonText(preset.buttonText);
      setBgColor(preset.bgColor);
      setTextColor(preset.textColor);
      setFontSize(preset.fontSize);
      setPaddingX(preset.paddingX);
      setPaddingY(preset.paddingY);
      setBorderRadius(preset.borderRadius);
      setButtonStyle(preset.buttonStyle);
      setHoverScale(preset.hoverScale ?? 105);
      setHoverShadow(preset.hoverShadow ?? 20);
      setHoverBgColor(preset.hoverBgColor ?? preset.bgColor);
      setSelectedPresetId(id);
      toast.success(`Loaded "${preset.name}"`);
    }
  };

  const deletePreset = (id: string) => {
    const preset = savedPresets.find((p) => p.id === id);
    const updated = savedPresets.filter((p) => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(updated));
    if (selectedPresetId === id) setSelectedPresetId("");
    toast.success(`Deleted "${preset?.name}"`);
  };

  const generateCode = () => {
    const scaleValue = hoverScale / 100;
    const shadowPx = hoverShadow;
    
    if (buttonStyle === "link") {
      return `<style>
  .custom-link:hover {
    transform: scale(${scaleValue});
    opacity: 0.8;
  }
</style>
<a href="${url || "https://your-url.com"}" class="custom-link"
   style="display: inline-flex; align-items: center; gap: 8px; background-color: transparent; color: ${textColor}; 
          font-size: ${fontSize}px; padding: ${paddingY}px ${paddingX}px; 
          text-decoration: underline; text-underline-offset: 4px; transition: all 0.3s ease;">
    ${buttonText}
</a>`;
    }
    return `<style>
  .custom-btn:hover {
    background-color: ${hoverBgColor} !important;
    transform: scale(${scaleValue});
    box-shadow: 0 ${shadowPx}px ${shadowPx * 2}px rgba(0,0,0,0.2);
  }
</style>
<a href="${url || "https://your-url.com"}" class="custom-btn"
   style="display: inline-block; background-color: ${bgColor}; color: ${textColor}; 
          font-size: ${fontSize}px; font-weight: bold; padding: ${paddingY}px ${paddingX}px; 
          text-decoration: none; border-radius: ${borderRadius}px; transition: all 0.3s ease;">
    ${buttonText}
</a>`;
  };

  const handlePresetSelect = (bg: string, text: string) => {
    setBgColor(bg);
    setTextColor(buttonStyle === "link" ? bg : text);
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

            {/* Icon Picker */}
            <IconPicker onSelect={(icon) => setButtonText(icon + " " + buttonText.replace(/^[\p{Emoji}\s]+/u, ""))} />

            {/* Button Style Toggle */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Button Style</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setButtonStyle("solid")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    buttonStyle === "solid"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Solid Button
                </button>
                <button
                  onClick={() => setButtonStyle("link")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    buttonStyle === "link"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Link Style
                </button>
              </div>
            </div>

            {/* Save & Load Presets */}
            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Saved Presets</label>
              <div className="flex gap-2">
                <Select value={selectedPresetId} onValueChange={loadPreset}>
                  <SelectTrigger className="flex-1 bg-secondary/50 border-border/50">
                    <SelectValue placeholder="Load a preset..." />
                  </SelectTrigger>
                  <SelectContent>
                    {savedPresets.length === 0 ? (
                      <SelectItem value="none" disabled>No presets saved</SelectItem>
                    ) : (
                      savedPresets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          {preset.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {selectedPresetId && (
                  <button
                    onClick={() => deletePreset(selectedPresetId)}
                    className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Preset name..."
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  className="bg-secondary/50 border-border/50"
                />
                <button
                  onClick={savePreset}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>

            {/* Color Presets */}
            <ColorPresets onSelect={handlePresetSelect} mode={buttonStyle} />

            {/* Custom Colors */}
            <div className={`grid gap-4 ${buttonStyle === "solid" ? "grid-cols-2" : "grid-cols-1"}`}>
              {buttonStyle === "solid" && (
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
              )}
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
              {buttonStyle === "solid" && (
                <SliderControl
                  label="Border Radius"
                  value={borderRadius}
                  min={0}
                  max={30}
                  onChange={setBorderRadius}
                />
              )}
            </div>

            {/* Hover Effects */}
            <div className="space-y-4 pt-2">
              <label className="text-sm text-muted-foreground">Hover Effects</label>
              <SliderControl
                label="Hover Scale"
                value={hoverScale}
                min={100}
                max={120}
                onChange={setHoverScale}
              />
              <SliderControl
                label="Hover Shadow"
                value={hoverShadow}
                min={0}
                max={40}
                onChange={setHoverShadow}
              />
              {buttonStyle === "solid" && (
                <div className="space-y-3">
                  <label className="text-sm text-muted-foreground">Hover Background</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={hoverBgColor}
                      onChange={(e) => setHoverBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    />
                    <Input
                      type="text"
                      value={hoverBgColor}
                      onChange={(e) => setHoverBgColor(e.target.value)}
                      className="bg-secondary/50 font-mono text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Preview & Output */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Button Preview */}
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
                styleType={buttonStyle}
                hoverScale={hoverScale}
                hoverShadow={hoverShadow}
                hoverBgColor={hoverBgColor}
              />
            </div>

            {/* Website Preview */}
            <div className="glass-card rounded-2xl p-6">
              <WebsitePreview
                buttonHtml={
                  <a
                    href={url || "#"}
                    style={
                      buttonStyle === "link"
                        ? {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: "transparent",
                            color: textColor,
                            fontSize: `${fontSize}px`,
                            padding: `${paddingY}px ${paddingX}px`,
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                          }
                        : {
                            display: "inline-block",
                            backgroundColor: bgColor,
                            color: textColor,
                            fontSize: `${fontSize}px`,
                            fontWeight: "bold",
                            padding: `${paddingY}px ${paddingX}px`,
                            textDecoration: "none",
                            borderRadius: `${borderRadius}px`,
                          }
                    }
                  >
                    {buttonText || "🚀 Click Me"}
                  </a>
                }
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
