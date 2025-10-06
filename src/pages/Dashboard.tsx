import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLandRecords } from "@/hooks/useLandRecords";

const Dashboard = () => {
  const { records } = useLandRecords();
  
  const totalRecords = records.length;
  const verifiedRecords = records.filter(r => r.verified).length;
  const totalArea = records.reduce((sum, r) => sum + parseFloat(r.area || "0"), 0).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Land Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage and view all your land records</p>
          </div>
          <Link to="/add-land">
            <Button size="lg" className="mt-4 md:mt-0 h-12 px-6 rounded-xl shadow-medium">
              <Plus className="w-5 h-5 mr-2" />
              Add New Land
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-2xl shadow-soft">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">Total Land Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">{totalRecords}</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl shadow-soft">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">Verified Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{verifiedRecords}</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl shadow-soft">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">Total Area</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">{totalArea} acres</p>
            </CardContent>
          </Card>
        </div>

        {/* Land Records */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Your Land Records</h2>
          
          {records.map((record) => (
            <Card key={record.id} className="rounded-2xl shadow-soft hover:shadow-medium transition-all">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-1">{record.ownerName}</h3>
                        <p className="text-muted-foreground">Survey No: {record.surveyNumber}</p>
                      </div>
                      {record.verified ? (
                        <div className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-xl">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 bg-destructive/10 text-destructive px-4 py-2 rounded-xl">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">Pending</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Area</p>
                        <p className="text-foreground font-semibold text-lg">{record.area} acres</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Location</p>
                        <p className="text-foreground font-semibold flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-primary" />
                          {record.village}, {record.district}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <Link to={`/map?id=${record.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-11 rounded-xl">
                        View on Map
                      </Button>
                    </Link>
                    <Link to={`/verify?id=${record.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-11 rounded-xl">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {records.length === 0 && (
          <Card className="rounded-2xl shadow-soft">
            <CardContent className="p-12 text-center">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No land records yet</h3>
              <p className="text-muted-foreground mb-6">Start by adding your first land record</p>
              <Link to="/add-land">
                <Button size="lg" className="h-12 px-6 rounded-xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Land
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
