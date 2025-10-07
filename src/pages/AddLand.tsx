import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Witness {
  name: string;
  aadhar: string;
  phone: string;
}

export default function AddLand() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [witnesses, setWitnesses] = useState<Witness[]>([
    { name: "", aadhar: "", phone: "" },
    { name: "", aadhar: "", phone: "" },
  ]);

  const [formData, setFormData] = useState({
    surveyNumber: "",
    area: "",
    location: "",
    ownerName: "",
    fatherName: "",
    ownerAadhar: "",
    ownerPhone: "",
    district: "",
    state: "",
    village: "",
    pincode: "",
  });

  // Generate ULPIN-like Land ID
  const generateLandId = () => {
    const stateCode = "GJ23"; // Gujarat 2023
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${stateCode}${timestamp}${random}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only allow numbers for Aadhar fields
    if (name === "ownerAadhar" && value && !/^\d*$/.test(value)) {
      return;
    }

    // Only allow numbers for phone fields
    if (name === "ownerPhone" && value && !/^\d*$/.test(value)) {
      return;
    }

    // Only allow numbers for pincode
    if (name === "pincode" && value && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleWitnessChange = (
    index: number,
    field: keyof Witness,
    value: string,
  ) => {
    // Only allow numbers for Aadhar and phone fields
    if (
      (field === "aadhar" || field === "phone") &&
      value &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    const newWitnesses = [...witnesses];
    newWitnesses[index][field] = value;
    setWitnesses(newWitnesses);
  };

  const validateAadhar = (aadhar: string) => {
    return /^\d{12}$/.test(aadhar);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  const validatePincode = (pincode: string) => {
    return /^\d{6}$/.test(pincode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate owner Aadhar
    if (!validateAadhar(formData.ownerAadhar)) {
      toast({
        title: "Invalid Aadhar",
        description: "Owner's Aadhar must be exactly 12 digits",
        variant: "destructive",
      });
      return;
    }

    // Validate owner phone
    if (!validatePhone(formData.ownerPhone)) {
      toast({
        title: "Invalid Phone",
        description: "Phone number must be exactly 10 digits",
        variant: "destructive",
      });
      return;
    }

    // Validate pincode
    if (!validatePincode(formData.pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Pincode must be exactly 6 digits",
        variant: "destructive",
      });
      return;
    }

    // Validate both witnesses
    for (let i = 0; i < 2; i++) {
      const witness = witnesses[i];

      if (!witness.name.trim()) {
        toast({
          title: "Missing Witness Name",
          description: `Please enter name for Witness ${i + 1}`,
          variant: "destructive",
        });
        return;
      }

      if (!validateAadhar(witness.aadhar)) {
        toast({
          title: "Invalid Witness Aadhar",
          description: `Witness ${i + 1} Aadhar must be exactly 12 digits`,
          variant: "destructive",
        });
        return;
      }

      if (!validatePhone(witness.phone)) {
        toast({
          title: "Invalid Witness Phone",
          description: `Witness ${i + 1} phone must be exactly 10 digits`,
          variant: "destructive",
        });
        return;
      }
    }

    // Create land record with unique ID and Land ID
    const generatedLandId = generateLandId();
    const landRecord = {
      id: `LAND-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      landId: generatedLandId,
      ownerName: formData.ownerName,
      fatherName: formData.fatherName,
      contact: formData.ownerPhone,
      aadhar: formData.ownerAadhar,
      surveyNumber: formData.surveyNumber,
      area: formData.area,
      village: formData.village,
      district: formData.district,
      address: formData.location,
      state: formData.state,
      pincode: formData.pincode,
      verified: false,
      createdAt: new Date().toISOString(),
      ownershipHistory: [],
      disputes: [],
      documents: [],
    };

    // Save to localStorage using the correct key
    const existingRecords = JSON.parse(
      localStorage.getItem("bhumibandhu_land_records") || "[]",
    );
    existingRecords.push(landRecord);
    localStorage.setItem("bhumibandhu_land_records", JSON.stringify(existingRecords));

    toast({
      title: "Land Registered Successfully",
      description: `Your land has been registered with Land ID: ${generatedLandId}`,
    });

    // Navigate to dashboard after 2 seconds
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              Register New Land
            </CardTitle>
            <CardDescription>
              Fill in all the details to register your land on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Land Details Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  Land Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="surveyNumber">Survey Number *</Label>
                    <Input
                      id="surveyNumber"
                      name="surveyNumber"
                      value={formData.surveyNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., 123/4A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (in acres) *</Label>
                    <Input
                      id="area"
                      name="area"
                      type="number"
                      step="0.01"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.5"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Full address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="village">Village/Sector *</Label>
                    <Input
                      id="village"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      placeholder="e.g., Sector 5, Gandhinagar"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6 digits"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Owner Details Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  Owner Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Full Name *</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerAadhar">Aadhar Number *</Label>
                    <Input
                      id="ownerAadhar"
                      name="ownerAadhar"
                      value={formData.ownerAadhar}
                      onChange={handleInputChange}
                      placeholder="12 digits (numbers only)"
                      maxLength={12}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.ownerAadhar.length}/12 digits
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Phone Number *</Label>
                    <Input
                      id="ownerPhone"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      placeholder="10 digits (numbers only)"
                      maxLength={10}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.ownerPhone.length}/10 digits
                    </p>
                  </div>
                </div>
              </div>

              {/* Witnesses Section - Fixed 2 Witnesses */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-primary">
                    Witness Details (2 Required)
                  </h3>
                </div>

                {witnesses.map((witness, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-4">Witness {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`witness-${index}-name`}>
                            Full Name *
                          </Label>
                          <Input
                            id={`witness-${index}-name`}
                            value={witness.name}
                            onChange={(e) =>
                              handleWitnessChange(index, "name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`witness-${index}-aadhar`}>
                            Aadhar Number *
                          </Label>
                          <Input
                            id={`witness-${index}-aadhar`}
                            value={witness.aadhar}
                            onChange={(e) =>
                              handleWitnessChange(
                                index,
                                "aadhar",
                                e.target.value,
                              )
                            }
                            placeholder="12 digits (numbers only)"
                            maxLength={12}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            {witness.aadhar.length}/12 digits
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`witness-${index}-phone`}>
                            Phone Number *
                          </Label>
                          <Input
                            id={`witness-${index}-phone`}
                            value={witness.phone}
                            onChange={(e) =>
                              handleWitnessChange(
                                index,
                                "phone",
                                e.target.value,
                              )
                            }
                            placeholder="10 digits (numbers only)"
                            maxLength={10}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            {witness.phone.length}/10 digits
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" size="lg" className="flex-1">
                  Register Land
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
