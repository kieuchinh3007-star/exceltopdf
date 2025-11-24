import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is the Excel to PDF Converter tool free to use?",
    answer: "Yes. The Excel to PDF Converter tool on LetsMetrix.com is completely free with no sign-up required.",
  },
  {
    question: "Will the Excel to PDF Converter change my formatting?",
    answer: "No. The tool preserves your original Excel layout including fonts, colors, borders, merged cells, and charts.",
  },
  {
    question: "Are my files safe when using the Excel to PDF Converter?",
    answer: "Absolutely. Files are processed securely and automatically deleted within 30 minutes.",
  },
  {
    question: "Can I convert multiple sheets with the Excel to PDF Converter tool?",
    answer: "Yes. You can choose to merge all sheets into a single PDF or export them individually.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FAQ – Excel to PDF Converter Tool
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4 animate-slide-up">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border border-border shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
