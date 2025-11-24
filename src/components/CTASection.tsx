import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-orange rounded-3xl p-8 md:p-12 text-center shadow-strong animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need a fast and reliable way to convert spreadsheets?
            </h2>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Try the Excel to PDF Converter – it's free, accurate, and always available.
            </p>
            
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 shadow-medium"
            >
              Start Converting Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
