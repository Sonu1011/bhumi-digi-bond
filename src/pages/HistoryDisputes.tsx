import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, History, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useLandRecords, LandRecord, DisputeRecord } from "@/hooks/useLandRecords";
import { seedGandhiNagarData } from "@/data/gandhiNagarData";

export default function HistoryDisputes() {
  const { records } = useLandRecords();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState<LandRecord[]>([]);

  useEffect(() => {
    // Seed data if empty
    seedGandhiNagarData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRecords(records);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = records.filter(
        (record) =>
          record.landId.toLowerCase().includes(query) ||
          record.surveyNumber.toLowerCase().includes(query) ||
          record.ownerName.toLowerCase().includes(query) ||
          record.village.toLowerCase().includes(query)
      );
      setFilteredRecords(filtered);
    }
  }, [searchQuery, records]);

  const getDisputeStatusColor = (status: DisputeRecord['status']) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500";
      case "Pending":
        return "bg-red-500";
      case "No Dispute":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDisputeIcon = (status: DisputeRecord['status']) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <History className="h-10 w-10 text-primary" />
            Land History & Disputes
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse 30-40 years of historical land records from Gandhinagar
          </p>
          <p className="text-sm text-muted-foreground italic mt-1">
            Your Land. Your Legacy. Digitally Secured.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Land Records
            </CardTitle>
            <CardDescription>
              Search by Land ID, Survey Number, Owner Name, or Village
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="search">Search Query</Label>
              <Input
                id="search"
                placeholder="e.g., GJ23000001AB2C, GN-45/12, Meera Patel, Sector 5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {filteredRecords.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Records Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query or clear filters
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="shadow-medium">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {record.surveyNumber}
                        <Badge className={record.verified ? "bg-green-500" : "bg-yellow-500"}>
                          {record.verified ? "Verified" : "Pending"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        Land ID: <span className="font-mono font-semibold">{record.landId}</span>
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">
                        {record.village}, {record.district} - {record.area} acres
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="ownership" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="ownership">Ownership History</TabsTrigger>
                      <TabsTrigger value="disputes">Disputes</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>

                    {/* Ownership History Tab */}
                    <TabsContent value="ownership" className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lg">Current Owner</h4>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="font-medium text-foreground">{record.ownerName}</p>
                          <p className="text-sm text-muted-foreground">Father: {record.fatherName}</p>
                          <p className="text-sm text-muted-foreground">Contact: {record.contact}</p>
                        </div>
                      </div>

                      {record.ownershipHistory && record.ownershipHistory.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg">Previous Owners</h4>
                          <div className="space-y-2">
                            {record.ownershipHistory.map((history, idx) => (
                              <div key={idx} className="bg-muted/30 p-4 rounded-lg flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{history.owner}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {history.from} - {history.to}
                                  </p>
                                  {history.documentRef && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Doc: {history.documentRef}
                                    </p>
                                  )}
                                </div>
                                <History className="h-5 w-5 text-primary" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    {/* Disputes Tab */}
                    <TabsContent value="disputes" className="space-y-4">
                      {!record.disputes || record.disputes.length === 0 ? (
                        <div className="text-center py-8">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                          <p className="text-lg font-semibold text-green-600">No Disputes</p>
                          <p className="text-sm text-muted-foreground">
                            This land has a clean record with no disputes
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {record.disputes.map((dispute, idx) => (
                            <div key={idx} className="bg-muted/30 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold flex items-center gap-2">
                                  {getDisputeIcon(dispute.status)}
                                  {dispute.type} Dispute
                                </h5>
                                <Badge className={getDisputeStatusColor(dispute.status)}>
                                  {dispute.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {dispute.description}
                              </p>
                              <div className="text-xs text-muted-foreground space-y-1">
                                <p>Filed: {dispute.filedDate || `${dispute.year}`}</p>
                                {dispute.resolutionDate && (
                                  <p>Resolved: {dispute.resolutionDate}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    {/* Documents Tab */}
                    <TabsContent value="documents" className="space-y-4">
                      {!record.documents || record.documents.length === 0 ? (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">No documents uploaded</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {record.documents.map((doc, idx) => (
                            <div key={idx} className="bg-muted/30 p-4 rounded-lg flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  {doc.uploadDate && (
                                    <p className="text-xs text-muted-foreground">
                                      Uploaded: {doc.uploadDate}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
