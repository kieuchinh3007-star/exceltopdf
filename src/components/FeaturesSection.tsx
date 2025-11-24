import { Shield, FileCheck, Zap, Layers, Lock, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: FileCheck,
    title: "Preserve formatting perfectly",
    description: "No broken fonts, misaligned tables, lost borders, or layout issues",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Support both XLS & XLSX",
    description: "Compatible with all Microsoft Excel versions and formats",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Layers,
    title: "Auto-fit page & smart scaling",
    description: "Automatically adjusts margins for readable and print-ready PDFs",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Zap,
    title: "Fast & free conversion",
    description: "Convert in seconds with unlimited conversions, completely free",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Lock,
    title: "Secure & private",
    description: "Files automatically deleted after 30 minutes. No content stored",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Shield,
    title: "Multi-sheet support",
    description: "Merge sheets into one PDF or keep them separate as needed",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Use Excel to PDF Converter Tool
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our Excel to PDF Converter tool is designed to provide the simplest and most accurate conversion, making it perfect for reports, invoices, school assignments, and business documents.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
