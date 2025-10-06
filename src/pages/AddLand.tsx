import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MapPin, Upload } from "lucide-react";
import { useLandRecords } from "@/hooks/useLandRecords";

const AddLand = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addRecord } = useLandRecords();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapturingGPS, setIsCapturingGPS] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    fatherName: "",
    contact: "",
    aadhar: "",
    surveyNumber: "",
    area: "",
    village: "",
    district: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    // Special validation for Aadhar - only allow 12 numeric digits
    if (id === "aadhar") {
      const numericValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData(prev => ({ ...prev, [id]: numericValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const captureGPS = () => {
    setIsCapturingGPS(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "GPS not supported",
        description: "Your device doesn't support GPS location.",
        variant: "destructive",
      });
      setIsCapturingGPS(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        toast({
          title: "GPS captured successfully",
          description: "Location coordinates have been added.",
        });
        setIsCapturingGPS(false);
      },
      (error) => {
        toast({
          title: "GPS capture failed",
          description: error.message || "Unable to get your location. Please enter manually.",
          variant: "destructive",
        });
        setIsCapturingGPS(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Aadhar if provided
    if (formData.aadhar && formData.aadhar.length !== 12) {
      toast({
        title: "Invalid Aadhar",
        description: "Aadhar number must be exactly 12 digits.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      addRecord({
        ownerName: formData.ownerName,
        fatherName: formData.fatherName,
        contact: formData.contact,
        aadhar: formData.aadhar || undefined,
        surveyNumber: formData.surveyNumber,
        area: formData.area,
        village: formData.village,
        district: formData.district,
        address: formData.address,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
      });

      toast({
        title: "Land record added successfully",
        description: "Your land details have been saved.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save land record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fatherName" className="text-base">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
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
                        value={formData.contact}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="aadhar" className="text-base">Aadhar Number (12 digits)</Label>
                      <Input
                        id="aadhar"
                        value={formData.aadhar}
                        onChange={handleInputChange}
                        placeholder="Enter 12 digit Aadhar"
                        maxLength={12}
                        className="h-12 rounded-xl"
                      />
                      {formData.aadhar && formData.aadhar.length !== 12 && (
                        <p className="text-sm text-destructive">Aadhar must be exactly 12 digits</p>
                      )}
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
                        value={formData.surveyNumber}
                        onChange={handleInputChange}
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
                        value={formData.area}
                        onChange={handleInputChange}
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
                        value={formData.village}
                        onChange={handleInputChange}
                        placeholder="Enter village name"
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-base">District *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={handleInputChange}
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
                      value={formData.address}
                      onChange={handleInputChange}
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
                        value={formData.latitude}
                        onChange={handleInputChange}
                        placeholder="e.g., 19.0760"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="longitude" className="text-base">Longitude</Label>
                      <Input
                        id="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                        placeholder="e.g., 72.8777"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={captureGPS}
                    disabled={isCapturingGPS}
                    className="w-full md:w-auto h-12 rounded-xl"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {isCapturingGPS ? "Capturing..." : "Capture GPS from Device"}
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
