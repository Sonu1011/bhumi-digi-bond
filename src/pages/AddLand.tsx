import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MapPin, Upload } from "lucide-react";

const AddLand = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Land record added successfully",
        description: "Your land details have been saved and will be verified soon.",
      });
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Add Land Record</h1>
            <p className="text-lg text-muted-foreground">Enter your land details to create a digital record</p>
          </div>

          <Card className="rounded-2xl shadow-medium">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl">Land Information</CardTitle>
              <CardDescription className="text-base">
                Fill in the details below. Fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Owner Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Owner Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="text-base">Owner Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="Enter full name"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fatherName" className="text-base">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        placeholder="Enter father's name"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-base">Contact Number *</Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="Enter mobile number"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="aadhar" className="text-base">Aadhar Number</Label>
                      <Input
                        id="aadhar"
                        placeholder="XXXX XXXX XXXX"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Land Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Land Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="surveyNumber" className="text-base">Survey Number *</Label>
                      <Input
                        id="surveyNumber"
                        placeholder="e.g., 123/4A"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="area" className="text-base">Land Area (acres) *</Label>
                      <Input
                        id="area"
                        type="number"
                        step="0.01"
                        placeholder="e.g., 2.5"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="village" className="text-base">Village *</Label>
                      <Input
                        id="village"
                        placeholder="Enter village name"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-base">District *</Label>
                      <Input
                        id="district"
                        placeholder="Enter district name"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base">Full Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter complete address including taluka and state"
                      required
                      className="min-h-24 rounded-xl"
                    />
                  </div>
                </div>

                {/* GPS Coordinates */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    GPS Coordinates
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="latitude" className="text-base">Latitude</Label>
                      <Input
                        id="latitude"
                        placeholder="e.g., 19.0760"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="longitude" className="text-base">Longitude</Label>
                      <Input
                        id="longitude"
                        placeholder="e.g., 72.8777"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full md:w-auto h-12 rounded-xl">
                    <MapPin className="w-5 h-5 mr-2" />
                    Capture GPS from Device
                  </Button>
                </div>

                {/* Documents */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">Documents</h3>
                  
                  <div className="space-y-4">
                    <Button type="button" variant="outline" className="w-full h-16 rounded-xl justify-start text-left">
                      <Upload className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">Upload Land Documents</p>
                        <p className="text-sm text-muted-foreground">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1 h-14 rounded-xl text-lg shadow-medium"
                  >
                    {isSubmitting ? "Saving..." : "Save Land Record"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 h-14 rounded-xl text-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddLand;
