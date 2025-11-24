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
          <div className="w-full h-[600px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground text-center px-6">
              Trình duyệt của bạn đang chặn PDF trong khung nhúng.
              <br />
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Mở PDF trong tab mới
              </a>
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PDFPreview;
