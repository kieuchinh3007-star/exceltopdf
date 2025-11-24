import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface PDFPreviewProps {
  pdfBlob: Blob | null;
}

const PDFPreview = ({ pdfBlob }: PDFPreviewProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  if (!pdfBlob || !pdfUrl) return null;

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="font-semibold mb-4">PDF Preview</h3>
      <div className="border rounded-lg overflow-hidden bg-muted">
        <iframe
          src={pdfUrl}
          className="w-full h-[600px]"
          title="PDF Preview"
        />
      </div>
    </Card>
  );
};

export default PDFPreview;
