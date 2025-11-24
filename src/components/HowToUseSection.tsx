import { Upload, Zap, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Upload your Excel file",
    description: "Drag and drop or select from your device (.xls or .xlsx)",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "The tool converts automatically",
    description: "System preserves format, borders, charts, and colors perfectly",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Download,
    title: "Download your PDF file",
    description: "Get your high-quality, print-ready PDF instantly",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const HowToUseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Use Excel to PDF Converter Tool
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Using our Excel to PDF Converter tool ensures your spreadsheet is exported into a clean, readable, and print-ready PDF.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-4 rounded-2xl ${step.bgColor} mb-6`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                
                <div className="mb-2 text-sm font-semibold text-primary">
                  Step {index + 1}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
