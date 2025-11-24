import { useState } from "react";
import { Upload, FileSpreadsheet, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
    toast({
      title: "File uploaded successfully",
      description: "Converting your Excel file to PDF...",
    });
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-accent-foreground/10 mb-6">
            <span className="text-sm font-medium text-accent-foreground">
              ✨ Free Online Tool
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Excel to PDF Converter –{" "}
            <span className="text-primary">Free Online Tool</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Convert Excel files (.xls, .xlsx) to high-quality PDF in seconds. Free, fast, and keeps your original formatting perfectly intact.
          </p>

          {/* Upload Box */}
          <Card
            className={`p-8 md:p-12 border-2 border-dashed transition-all duration-300 ${
              isDragging
                ? "border-primary bg-accent scale-[1.02]"
                : "border-border hover:border-primary/50 hover:shadow-medium"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Icons */}
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-success/10">
                  <FileSpreadsheet className="w-8 h-8 text-success" />
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="p-4 rounded-2xl bg-destructive/10">
                  <FileText className="w-8 h-8 text-destructive" />
                </div>
              </div>

              {/* Upload Text */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <p className="text-lg font-semibold">
                    Drop your Excel file here or click to upload
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supports .xls and .xlsx files
                </p>
              </div>

              {/* Upload Button */}
              <Button size="lg" className="min-w-[200px]">
                Convert Excel to PDF
              </Button>

              {/* Settings Toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>{showSettings ? "Hide" : "Show"} conversion options</span>
              </button>

              {/* Optional Settings */}
              {showSettings && (
                <div className="w-full max-w-md pt-6 border-t border-border space-y-4 animate-slide-up">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="page-size">Page Size</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger id="page-size">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="letter">Letter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="orientation">Orientation</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger id="orientation">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="portrait">Portrait</SelectItem>
                          <SelectItem value="landscape">Landscape</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="merge-sheets" className="cursor-pointer">
                        Merge all sheets into one PDF
                      </Label>
                      <Switch id="merge-sheets" />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <p className="text-xs text-muted-foreground">
                🔒 We don't store your files. Auto-delete after 30 minutes.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
