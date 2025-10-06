import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Calendar, AlertCircle } from "lucide-react";

interface LandRecord {
  id: string;
  surveyNumber: string;
  area: string;
  location: string;
  ownerName: string;
  ownerAadhar: string;
  ownerPhone: string;
  district: string;
  state: string;
  pincode: string;
  witnesses: Array<{
    name: string;
    aadhar: string;
    phone: string;
  }>;
  registeredDate: string;
  status: string;
  verified: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [landRecords, setLandRecords] = useState<LandRecord[]>([]);

  // Load land records from localStorage on component mount
  useEffect(() => {
    loadLandRecords();
  }, []);

  const loadLandRecords = () => {
    const records = localStorage.getItem("landRecords");
    if (records) {
      const parsedRecords = JSON.parse(records);
      setLandRecords(parsedRecords);
    }
  };

  // Refresh data every time the component becomes visible
  useEffect(() => {
    const handleFocus = () => {
      loadLandRecords();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Land Records
            </h1>
            <p className="text-muted-foreground">
              Manage and track your registered land properties
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate("/add-land")}
            className="gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New Land
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Properties</CardDescription>
              <CardTitle className="text-3xl">{landRecords.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Verified</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {landRecords.filter((r) => r.verified).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {landRecords.filter((r) => !r.verified).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Land Records List */}
        {landRecords.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No Land Records Found
              </h3>
              <p className="text-muted-foreground mb-6">
                You haven't registered any land yet. Click the button below to
                add your first property.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/add-land")}
                className="gap-2"
              >
                <Plus className="h-5 w-5" />
                Register Your First Land
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {landRecords.map((record) => (
              <Card
                key={record.id}
                className="shadow-medium hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">
                          {record.surveyNumber}
                        </CardTitle>
                        <Badge className={getStatusColor(record.status)}>
                          {record.verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        ID: {record.id}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location Info */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {record.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {record.district}, {record.state} - {record.pincode}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Area</p>
                        <p className="text-sm text-muted-foreground">
                          {record.area} acres
                        </p>
                      </div>
                    </div>

                    {/* Owner Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Owner</p>
                        <p className="text-sm text-muted-foreground">
                          {record.ownerName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Aadhar:{" "}
                          {record.ownerAadhar.replace(
                            /(\d{4})(\d{4})(\d{4})/,
                            "$1 $2 $3",
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Phone: {record.ownerPhone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Registered:{" "}
                        {new Date(record.registeredDate).toLocaleDateString(
                          "en-IN",
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Witnesses */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium mb-2">Witnesses</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {record.witnesses.map((witness, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg"
                        >
                          <p className="font-medium text-foreground">
                            Witness {index + 1}
                          </p>
                          <p>{witness.name}</p>
                          <p>
                            Aadhar:{" "}
                            {witness.aadhar.replace(
                              /(\d{4})(\d{4})(\d{4})/,
                              "$1 $2 $3",
                            )}
                          </p>
                          <p>Phone: {witness.phone}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/verify")}
                    >
                      View Certificate
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/map")}>
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
