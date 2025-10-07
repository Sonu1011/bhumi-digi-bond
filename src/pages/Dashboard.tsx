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
import { useLandRecords } from "@/hooks/useLandRecords";
import { seedGandhiNagarData } from "@/data/gandhiNagarData";

export default function Dashboard() {
  const navigate = useNavigate();
  const { records } = useLandRecords();

  // Seed Gandhinagar data on first load
  useEffect(() => {
    seedGandhiNagarData();
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
              <CardTitle className="text-3xl">{records.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Verified</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {records.filter((r) => r.verified).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {records.filter((r) => !r.verified).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Land Records List */}
        {records.length === 0 ? (
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
            {records.map((record) => (
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
                      <Badge className={record.verified ? "bg-green-500" : "bg-yellow-500"}>
                        {record.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <CardDescription className="text-base space-y-1">
                      <div>
                        <span className="font-semibold">Land ID:</span>{" "}
                        <span className="font-mono">{record.landId}</span>
                      </div>
                      <div className="text-xs">Internal ID: {record.id}</div>
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
                            {record.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {record.village}
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
                          Father: {record.fatherName}
                        </p>
                        {record.aadhar && (
                          <p className="text-sm text-muted-foreground">
                            Aadhar:{" "}
                            {record.aadhar.replace(
                              /(\d{4})(\d{4})(\d{4})/,
                              "$1 $2 $3",
                            )}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Phone: {record.contact}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Registered:{" "}
                        {new Date(record.createdAt).toLocaleDateString(
                          "en-IN",
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(record.disputes && record.disputes.length > 0) && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-medium mb-2 text-red-600">Disputes</p>
                      <p className="text-sm text-muted-foreground">
                        {record.disputes.length} dispute(s) recorded
                      </p>
                    </div>
                  )}

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
