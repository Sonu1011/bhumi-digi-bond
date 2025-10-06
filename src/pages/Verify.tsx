import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Verify = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Verification Details</h1>
            <p className="text-lg text-muted-foreground">View complete land ownership verification</p>
          </div>

          {/* Verification Status */}
          <Card className="rounded-2xl shadow-medium mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-1">Verified Record</h2>
                    <p className="text-muted-foreground">Last verified on 15 Jan 2024</p>
                  </div>
                </div>
                <Badge className="text-base px-4 py-2 bg-primary">
                  Government Verified
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card className="rounded-2xl shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Owner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Owner</p>
                  <p className="text-lg font-semibold text-foreground">Ramesh Kumar</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Father's Name</p>
                  <p className="text-lg font-semibold text-foreground">Mohan Kumar</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Registration Date</p>
                  <p className="text-lg font-semibold text-foreground">12 March 2020</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Registration Number</p>
                  <p className="text-lg font-semibold text-foreground font-mono">REG/2020/1234</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Land Details */}
          <Card className="rounded-2xl shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Land Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Survey Number</p>
                  <p className="text-lg font-semibold text-foreground">123/4A</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Land Area</p>
                  <p className="text-lg font-semibold text-foreground">2.5 acres</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Village</p>
                  <p className="text-lg font-semibold text-foreground">Kandivali</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">District</p>
                  <p className="text-lg font-semibold text-foreground">Thane</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Full Address</p>
                <p className="text-foreground">Village Kandivali, Taluka Dahanu, District Thane, Maharashtra 401602</p>
              </div>
            </CardContent>
          </Card>

          {/* Valuation */}
          <Card className="rounded-2xl shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Property Valuation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Valuation</p>
                  <p className="text-2xl font-bold text-primary">₹45,00,000</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Purchase Price (2020)</p>
                  <p className="text-2xl font-bold text-foreground">₹38,00,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Witnesses */}
          <Card className="rounded-2xl shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Witnesses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div>
                    <p className="font-semibold text-foreground">Suresh Patil</p>
                    <p className="text-sm text-muted-foreground">Witness 1</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div>
                    <p className="font-semibold text-foreground">Anjali Sharma</p>
                    <p className="text-sm text-muted-foreground">Witness 2</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Verified
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Government Integration Status */}
          <Card className="rounded-2xl shadow-soft mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Government Records</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Bhulekh Database</p>
                    <p className="text-sm text-muted-foreground">Synced on 15 Jan 2024</p>
                  </div>
                </div>
                <Badge className="bg-primary">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">DILRMP Database</p>
                    <p className="text-sm text-muted-foreground">Pending verification</p>
                  </div>
                </div>
                <Badge variant="outline">In Progress</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 h-14 rounded-xl text-lg shadow-medium">
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </Button>
            <Button size="lg" variant="outline" className="flex-1 h-14 rounded-xl text-lg">
              <Share2 className="w-5 h-5 mr-2" />
              Share Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
