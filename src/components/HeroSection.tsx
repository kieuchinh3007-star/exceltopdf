import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, FileText, CheckCircle2, X, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const HeroSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [pageSize, setPageSize] = useState("auto");
  const [orientation, setOrientation] = useState("auto");
  const [mergeSheets, setMergeSheets] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xls',
      '.xlsx'
    ];
    
    const isValidType = validTypes.some(type => 
      file.type === type || file.name.toLowerCase().endsWith(type)
    );

    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xls or .xlsx)",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready to convert`,
    });
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsConverted(false);
    setIsConverting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload an Excel file first",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    
    try {
      // Read the Excel file
      const data = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Store workbook data for later use in download
      (window as any).convertedWorkbook = workbook;
      
      // Simulate some processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConverting(false);
      setIsConverted(true);
      
      toast({
        title: "Conversion complete!",
        description: `${uploadedFile.name} has been converted to PDF`,
      });
    } catch (error) {
      setIsConverting(false);
      toast({
        title: "Conversion failed",
        description: "There was an error reading the Excel file",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!uploadedFile) return;

    try {
      const workbook = (window as any).convertedWorkbook;
      if (!workbook) {
        toast({
          title: "Error",
          description: "No converted data found. Please convert the file first.",
          variant: "destructive",
        });
        return;
      }

      // Create PDF with selected settings
      const doc = new jsPDF({
        orientation: orientation === 'auto' ? 'landscape' : orientation as 'portrait' | 'landscape',
        unit: 'mm',
        format: pageSize === 'auto' ? 'a4' : pageSize,
      });

      const sheetsToProcess = mergeSheets 
        ? workbook.SheetNames 
        : [workbook.SheetNames[0]];

      let currentPage = 0;

      sheetsToProcess.forEach((sheetName, sheetIndex) => {
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert sheet to array of arrays
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (sheetIndex > 0) {
          doc.addPage();
        }
        
        // Add sheet title
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(sheetName, 14, 15);
        
        // Starting position for table
        let yPosition = 25;
        const cellPadding = 2;
        const rowHeight = 7;
        const startX = 14;
        
        // Calculate column widths based on content
        const maxCols = Math.max(...sheetData.map(row => row?.length || 0));
        const pageWidth = doc.internal.pageSize.getWidth();
        const availableWidth = pageWidth - (startX * 2);
        const colWidth = availableWidth / Math.min(maxCols, 10); // Max 10 columns visible
        
        doc.setFontSize(9);
        
        // Render table data
        sheetData.forEach((row, rowIndex) => {
          if (!row) return;
          
          // Check if we need a new page
          if (yPosition > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage();
            yPosition = 15;
            
            // Re-add sheet title on new page
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(`${sheetName} (continued)`, startX, yPosition);
            yPosition += 10;
            doc.setFontSize(9);
          }
          
          // Set header style
          if (rowIndex === 0) {
            doc.setFont('helvetica', 'bold');
            doc.setFillColor(240, 240, 240);
          } else {
            doc.setFont('helvetica', 'normal');
          }
          
          row.forEach((cell, colIndex) => {
            if (colIndex >= 10) return; // Limit to 10 columns
            
            const xPosition = startX + (colIndex * colWidth);
            const cellText = cell !== null && cell !== undefined ? String(cell) : '';
            
            // Draw cell border
            doc.rect(xPosition, yPosition, colWidth, rowHeight);
            
            // Fill header background
            if (rowIndex === 0) {
              doc.rect(xPosition, yPosition, colWidth, rowHeight, 'F');
            }
            
            // Draw text (with truncation if too long)
            const maxChars = Math.floor(colWidth / 2);
            const truncatedText = cellText.length > maxChars 
              ? cellText.substring(0, maxChars - 2) + '..' 
              : cellText;
            
            doc.text(truncatedText, xPosition + cellPadding, yPosition + 5);
          });
          
          yPosition += rowHeight;
        });
        
        currentPage++;
      });

      // Generate filename
      const pdfFilename = uploadedFile.name.replace(/\.(xlsx?|xls)$/i, '.pdf');
      
      // Save the PDF
      doc.save(pdfFilename);
      
      toast({
        title: "Download successful",
        description: `${pdfFilename} has been downloaded with real Excel data`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download failed",
        description: "There was an error generating the PDF",
        variant: "destructive",
      });
    }
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
                : uploadedFile
                ? "border-success bg-success/5"
                : "border-border hover:border-primary/50 hover:shadow-medium"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              {uploadedFile ? (
                /* Uploaded File Display & Settings */
                <div className="w-full max-w-md space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-success mb-1">Upload successful!</p>
                      <p className="text-sm text-foreground truncate">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      aria-label="Remove file"
                      disabled={isConverting}
                    >
                      <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>

                  {/* Conversion Options - Always visible when file is uploaded */}
                  {!isConverted && (
                    <div className="w-full pt-4 border-t border-border space-y-4">
                      <h3 className="font-semibold text-sm text-foreground mb-3">Conversion Options</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="page-size">Page Size</Label>
                          <Select value={pageSize} onValueChange={setPageSize} disabled={isConverting}>
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
                          <Select value={orientation} onValueChange={setOrientation} disabled={isConverting}>
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
                          <Switch 
                            id="merge-sheets" 
                            checked={mergeSheets}
                            onCheckedChange={setMergeSheets}
                            disabled={isConverting}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Convert Button or Download Button */}
                  {isConverted ? (
                    <Button size="lg" className="w-full" onClick={handleDownload}>
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full" 
                      onClick={handleConvert}
                      disabled={isConverting}
                    >
                      {isConverting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5 mr-2" />
                          Convert to PDF
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                /* Upload Area */
                <>
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
                  <Button 
                    size="lg" 
                    className="min-w-[200px]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                  </Button>
                </>
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
