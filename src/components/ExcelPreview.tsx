import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExcelPreviewProps {
  workbook: any; // XLSX workbook
}

const ExcelPreview = ({ workbook }: ExcelPreviewProps) => {
  if (!workbook) return null;

  return (
    <Card className="p-4 animate-fade-in">
      <h3 className="font-semibold mb-4">Excel Preview</h3>
      
      <Tabs defaultValue={workbook.SheetNames[0]} className="w-full">
        <TabsList className="mb-4">
          {workbook.SheetNames.map((sheetName: string) => (
            <TabsTrigger key={sheetName} value={sheetName}>
              {sheetName}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {workbook.SheetNames.map((sheetName: string) => {
          const worksheet = workbook.Sheets[sheetName];
          const data = (window as any).XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][];
          
          return (
            <TabsContent key={sheetName} value={sheetName}>
              <ScrollArea className="h-[400px] w-full border rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      {data.length > 0 && (
                        <tr className="bg-muted">
                          {data[0].map((cell: any, colIndex: number) => (
                            <th
                              key={colIndex}
                              className="border border-border p-2 text-left font-semibold sticky top-0 bg-muted"
                            >
                              {cell}
                            </th>
                          ))}
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {data.slice(1).map((row: any[], rowIndex: number) => (
                        <tr key={rowIndex} className="hover:bg-accent/50">
                          {row.map((cell: any, colIndex: number) => (
                            <td key={colIndex} className="border border-border p-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default ExcelPreview;
