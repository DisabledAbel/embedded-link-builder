import { Slider } from "@/components/ui/slider";

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
}

const SliderControl = ({
  label,
  value,
  min,
  max,
  onChange,
  unit = "px",
}: SliderControlProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="text-sm font-mono text-primary">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onChange(v[0])}
        className="w-full"
      />
    </div>
  );
};

export default SliderControl;
