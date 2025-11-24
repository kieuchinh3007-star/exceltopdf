import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface PDFPreviewProps {
  pdfBlob: Blob | null;
}

const PDFPreview = ({ pdfBlob }: PDFPreviewProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (pdfBlob) {
      try {
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);
        setIsLoading(false);
        
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (err) {
        setError("Failed to load PDF preview");
        setIsLoading(false);
      }
    }
  }, [pdfBlob]);

  if (!pdfBlob) return null;

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="font-semibold mb-4">PDF Preview</h3>
      <div className="border rounded-lg overflow-hidden bg-muted relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-destructive">
            {error}
          </div>
        )}
        {pdfUrl && !error && (
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-[600px]"
            aria-label="PDF Preview"
          >
            <embed
              src={pdfUrl}
              type="application/pdf"
              className="w-full h-[600px]"
            />
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                Your browser does not support PDF preview.
              </p>
              <p className="text-sm text-muted-foreground">
                Click the Download button below to view the PDF.
              </p>
            </div>
          </object>
        )}
      </div>
    </Card>
  );
};

export default PDFPreview;
