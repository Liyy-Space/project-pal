import { useState, useRef, useCallback, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FONTS = [
  "Inter",
  "Poppins",
  "Raleway",
  "Nunito",
  "Montserrat",
  "DM Sans",
  "Plus Jakarta Sans",
  "Sora",
  "Outfit",
  "Space Grotesk",
];

const WEIGHTS = [300, 400, 600, 700, 800];

const LogoCustomizer = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const [font, setFont] = useState("Inter");
  const [fontSize, setFontSize] = useState(42);
  const [fontWeight, setFontWeight] = useState(700);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [primaryColor, setPrimaryColor] = useState("#0D2145");
  const [accentColor, setAccentColor] = useState("#1AAFA0");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [iconSize, setIconSize] = useState(72);
  const [showTagline, setShowTagline] = useState(true);
  const [borderThickness, setBorderThickness] = useState(3);
  const [darkBg, setDarkBg] = useState(true);

  // Load Google Font dynamically
  useEffect(() => {
    const id = `gfont-${font.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
      /\s+/g,
      "+"
    )}:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap`;
    document.head.appendChild(link);
  }, [font]);

  const LogoIcon = ({ size, bg }: { size: number; bg: "light" | "dark" }) => {
    const circleColor = bg === "dark" ? accentColor : primaryColor;
    const borderColor = accentColor;
    const innerTextColor = bg === "dark" ? "#FFFFFF" : "#FFFFFF";

    return (
      <div
        className="relative flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: circleColor,
          border: `${borderThickness}px solid ${borderColor}`,
        }}
      >
        <span
          style={{
            fontFamily: `'${font}', sans-serif`,
            fontWeight: 800,
            fontSize: size * 0.42,
            color: innerTextColor,
            lineHeight: 1,
          }}
        >
          N
        </span>
        {showTagline && (
          <span
            className="absolute text-center leading-none"
            style={{
              bottom: size * 0.1,
              fontSize: Math.max(size * 0.09, 6),
              fontFamily: `'${font}', sans-serif`,
              fontWeight: 400,
              fontStyle: "italic",
              color: innerTextColor,
              opacity: 0.85,
              letterSpacing: 0.5,
            }}
          >
            search. found. transform.
          </span>
        )}
      </div>
    );
  };

  const LogoPreview = ({ bg }: { bg: "light" | "dark" }) => {
    const bgColor = bg === "dark" ? primaryColor : "#FFFFFF";
    const nameColor = bg === "dark" ? textColor : primaryColor;
    const tagColor = bg === "dark" ? accentColor : accentColor;

    return (
      <div
        className="rounded-xl p-8 flex items-center gap-6 transition-all duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <LogoIcon size={iconSize} bg={bg} />
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: `'${font}', sans-serif`,
              fontWeight,
              fontSize,
              letterSpacing,
              color: nameColor,
              lineHeight: 1.1,
            }}
          >
            Neudata
          </span>
          <span
            style={{
              fontFamily: `'${font}', sans-serif`,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: fontSize * 0.35,
              letterSpacing: letterSpacing + 1,
              color: tagColor,
              marginTop: 4,
            }}
          >
            search. found. transform.
          </span>
        </div>
      </div>
    );
  };

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 2;
    const w = 800;
    const h = 240;
    canvas.width = w * scale;
    canvas.height = h * scale;
    ctx.scale(scale, scale);

    // Dark variant
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 0, w, h / 2);
    // Light variant
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, h / 2, w, h / 2);

    const drawRow = (y: number, isDark: boolean) => {
      const circleX = 80;
      const circleY = y + 60;
      const r = iconSize / 2;

      // Circle
      ctx.beginPath();
      ctx.arc(circleX, circleY, r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? accentColor : primaryColor;
      ctx.fill();
      ctx.lineWidth = borderThickness;
      ctx.strokeStyle = accentColor;
      ctx.stroke();

      // "N" in circle
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `800 ${r * 0.84}px '${font}', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("N", circleX, circleY - (showTagline ? 4 : 0));

      if (showTagline) {
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = `italic 400 ${Math.max(r * 0.18, 6)}px '${font}', sans-serif`;
        ctx.fillText("search. found. transform.", circleX, circleY + r * 0.55);
      }

      // Brand name
      ctx.fillStyle = isDark ? textColor : primaryColor;
      ctx.font = `${fontWeight} ${fontSize}px '${font}', sans-serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      // letterSpacing approximation
      const nameX = circleX + r + 24;
      ctx.fillText("Neudata", nameX, circleY - fontSize * 0.15);

      // Tagline
      ctx.fillStyle = accentColor;
      ctx.font = `italic 400 ${fontSize * 0.35}px '${font}', sans-serif`;
      ctx.fillText("search. found. transform.", nameX, circleY + fontSize * 0.35);
    };

    drawRow(0, true);
    drawRow(h / 2, false);

    const link = document.createElement("a");
    link.download = "neudata-logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    toast({ title: "Logo downloaded!", description: "Exported at 2× resolution." });
  }, [font, fontSize, fontWeight, letterSpacing, primaryColor, accentColor, textColor, iconSize, showTagline, borderThickness, toast]);

  const handleCopyCSS = useCallback(() => {
    const css = `:root {
  --logo-font: '${font}', sans-serif;
  --logo-font-size: ${fontSize}px;
  --logo-font-weight: ${fontWeight};
  --logo-letter-spacing: ${letterSpacing}px;
  --logo-primary: ${primaryColor};
  --logo-accent: ${accentColor};
  --logo-text: ${textColor};
  --logo-icon-size: ${iconSize}px;
  --logo-border: ${borderThickness}px;
}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "CSS copied!", description: "Paste into your stylesheet." });
  }, [font, fontSize, fontWeight, letterSpacing, primaryColor, accentColor, textColor, iconSize, borderThickness, toast]);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container">
        <h1 className="text-3xl font-bold text-foreground mb-2">Logo Customizer</h1>
        <p className="text-muted-foreground mb-8">
          Tweak your brand identity in real time.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          {/* LEFT — Controls */}
          <div className="space-y-6 rounded-xl border border-border bg-card p-6">
            {/* Font Family */}
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FONTS.map((f) => (
                    <SelectItem key={f} value={f} style={{ fontFamily: `'${f}', sans-serif` }}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <Label>Font Size — {fontSize}px</Label>
              <Slider min={24} max={72} step={1} value={[fontSize]} onValueChange={([v]) => setFontSize(v)} />
            </div>

            {/* Font Weight */}
            <div className="space-y-2">
              <Label>Font Weight</Label>
              <Select value={String(fontWeight)} onValueChange={(v) => setFontWeight(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {WEIGHTS.map((w) => (
                    <SelectItem key={w} value={String(w)}>{w}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Letter Spacing */}
            <div className="space-y-2">
              <Label>Letter Spacing — {letterSpacing}px</Label>
              <Slider min={-2} max={8} step={0.5} value={[letterSpacing]} onValueChange={([v]) => setLetterSpacing(v)} />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Primary</Label>
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full h-9 rounded-md cursor-pointer border border-border" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Accent</Label>
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full h-9 rounded-md cursor-pointer border border-border" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Text</Label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-9 rounded-md cursor-pointer border border-border" />
              </div>
            </div>

            {/* Icon Size */}
            <div className="space-y-2">
              <Label>Icon Size — {iconSize}px</Label>
              <Slider min={40} max={120} step={1} value={[iconSize]} onValueChange={([v]) => setIconSize(v)} />
            </div>

            {/* Tagline Toggle */}
            <div className="flex items-center justify-between">
              <Label>Tagline in Icon</Label>
              <Switch checked={showTagline} onCheckedChange={setShowTagline} />
            </div>

            {/* Border Thickness */}
            <div className="space-y-2">
              <Label>Border Thickness — {borderThickness}px</Label>
              <Slider min={1} max={6} step={0.5} value={[borderThickness]} onValueChange={([v]) => setBorderThickness(v)} />
            </div>

            {/* Background Toggle */}
            <div className="flex items-center justify-between">
              <Label>Dark Background</Label>
              <Switch checked={darkBg} onCheckedChange={setDarkBg} />
            </div>
          </div>

          {/* RIGHT — Preview */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Dark Preview</h2>
              <LogoPreview bg="dark" />
            </div>
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Light Preview</h2>
              <LogoPreview bg="light" />
            </div>

            {/* Export */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" /> Download PNG
              </Button>
              <Button variant="outline" onClick={handleCopyCSS} className="gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy CSS"}
              </Button>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCustomizer;
