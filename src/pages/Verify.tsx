import { useState, useMemo } from "react";
// Import all necessary UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  User,
  Users,
  MapPin,
} from "lucide-react";

// NOTE: Since you mentioned the replacement caused issues, I'll temporarily define a mock useToast
// to ensure the component renders even if the external hook file is missing or misconfigured.
// If you have a working `useToast` at "@/hooks/use-toast", you can delete this mock.
const useToast = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { toast: (options: any) => console.log("Toast Called:", options) };
};

// Interface must match the structure saved in AddLand.tsx
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

export default function Verify() {
  const [searchId, setSearchId] = useState("");
  const [landRecord, setLandRecord] = useState<LandRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchId.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a Land ID to search.",
        variant: "destructive",
      });
      setLandRecord(null);
      return;
    }

    setIsSearching(true);
    // Simulate API delay for better UX
    setTimeout(() => {
      // Use '[]' as default to safely parse if key is empty
      const records = JSON.parse(
        localStorage.getItem("landRecords") || "[]",
      ) as LandRecord[];
      const found = records.find(
        (record) =>
          record.id.trim().toUpperCase() === searchId.trim().toUpperCase(),
      );

      if (found) {
        setLandRecord(found);
        toast({
          title: "Record Found",
          description: `Details for ID: ${found.id} are displayed.`,
        });
      } else {
        setLandRecord(null);
        toast({
          title: "Record Not Found",
          description: `No land record found with ID: ${searchId.trim()}`,
          variant: "destructive",
        });
      }
      setIsSearching(false);
    }, 500); // Small delay
  };

  const getStatusBadge = useMemo(() => {
    if (!landRecord) return null;
    if (landRecord.verified) {
      return (
        <Badge className="text-base px-4 py-2 bg-primary hover:bg-primary/90">
          Government Verified
        </Badge>
      );
    }
    return (
      <Badge
        variant="secondary"
        className="text-base px-4 py-2 bg-yellow-500/10 text-yellow-600 border-yellow-500/30 hover:bg-yellow-500/20"
      >
        Verification Pending
      </Badge>
    );
  }, [landRecord]);

  const downloadCertificate = () => {
    if (!landRecord) {
      toast({
        title: "Error",
        description: "No record is currently loaded to download.",
        variant: "destructive",
      });
      return;
    }

    const formattedAadhar = (aadhar: string) =>
      aadhar.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
    const formattedPhone = (phone: string) =>
      phone.replace(/(\d{5})(\d{5})/, "$1-$2");
    const registeredDate = new Date(
      landRecord.registeredDate,
    ).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Construct the certificate content
    const certificateContent = `╔═════════════════════════════════════════════════════════════════╗
║                      BHUMIBANDHU LAND RECORD                      ║
║                    CERTIFICATE OF REGISTRATION                    ║
╚═════════════════════════════════════════════════════════════════╝

--- GENERAL DETAILS ---
Registration ID:      ${landRecord.id}
Registration Date:    ${registeredDate}
Verification Status:  ${landRecord.verified ? "VERIFIED" : "PENDING"}

--- OWNER DETAILS ---
Owner Name:           ${landRecord.ownerName}
Owner Aadhar:         ${formattedAadhar(landRecord.ownerAadhar)}
Owner Phone:          ${formattedPhone(landRecord.ownerPhone)}

--- LAND DETAILS ---
Survey Number:        ${landRecord.surveyNumber}
Area:                 ${landRecord.area} acres
Location:             ${landRecord.location}
District:             ${landRecord.district}
State:                ${landRecord.state} - ${landRecord.pincode}

--- WITNESS DETAILS ---
${landRecord.witnesses
  .map(
    (w, i) =>
      `Witness ${i + 1} Name:       ${w.name}
Witness ${i + 1} Aadhar:     ${formattedAadhar(w.aadhar)}
Witness ${i + 1} Phone:      ${formattedPhone(w.phone)}`,
  )
  .join("\n")}

--- OFFICIAL STAMP ---
This is a digital, blockchain-registered land record.
Authenticity can be verified using the unique Registration ID on our portal.
`;

    // Create a Blob from the certificate string
    const blob = new Blob([certificateContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `Land_Certificate_${landRecord.surveyNumber}_${landRecord.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up

    toast({
      title: "Download Started",
      description: `Certificate for ${landRecord.surveyNumber} is downloading.`,
    });
  };

  const LandRecordDisplay = () => {
    if (!landRecord) {
      return (
        <Card className="text-center py-12 bg-card">
          <CardContent>
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Search for a Land Record
            </h3>
            <p className="text-muted-foreground">
              Enter the unique Registration ID in the box above to view its
              details.
            </p>
          </CardContent>
        </Card>
      );
    }

    const formattedAadhar = (aadhar: string) =>
      aadhar.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
    const registeredDate = new Date(
      landRecord.registeredDate,
    ).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <>
        {/* Verification Status */}
        <Card
          className={`rounded-2xl shadow-medium mb-6 ${landRecord.verified ? "border-primary/20 bg-primary/5" : "border-yellow-500/20 bg-yellow-500/5"}`}
        >
          <CardContent className="p-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-2xl ${landRecord.verified ? "bg-primary" : "bg-yellow-500/70"} flex items-center justify-center`}
              >
                {landRecord.verified ? (
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-foreground" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-1">
                  {landRecord.verified
                    ? "Verified Record"
                    : "Pending Verification"}
                </h2>
                <p className="text-muted-foreground">
                  Registered on {registeredDate}
                </p>
              </div>
            </div>
            {getStatusBadge}
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card className="rounded-2xl shadow-soft mb-6">
          <CardHeader className="flex flex-row items-center space-x-3">
            <User className="h-6 w-6 text-accent-foreground" />
            <CardTitle className="text-2xl">Owner Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Current Owner
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {landRecord.ownerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Aadhar Number
                </p>
                <p className="text-lg font-semibold text-foreground font-mono">
                  {formattedAadhar(landRecord.ownerAadhar)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Phone Number
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {landRecord.ownerPhone}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Registration ID
                </p>
                <p className="text-lg font-semibold text-foreground font-mono">
                  {landRecord.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Land Details */}
        <Card className="rounded-2xl shadow-soft mb-6">
          <CardHeader className="flex flex-row items-center space-x-3">
            <MapPin className="h-6 w-6 text-accent-foreground" />
            <CardTitle className="text-2xl">Land Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Survey Number
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {landRecord.surveyNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Land Area</p>
                <p className="text-lg font-semibold text-foreground">
                  {landRecord.area} acres
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  District / State
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {landRecord.district}, {landRecord.state}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Pincode</p>
                <p className="text-lg font-semibold text-foreground">
                  {landRecord.pincode}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Full Address / Location
              </p>
              <p className="text-foreground">{landRecord.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Witnesses */}
        <Card className="rounded-2xl shadow-soft mb-6">
          <CardHeader className="flex flex-row items-center space-x-3">
            <Users className="h-6 w-6 text-accent-foreground" />
            <CardTitle className="text-2xl">Witnesses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {landRecord.witnesses.map((witness, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted rounded-xl border border-muted-foreground/10"
                >
                  <p className="font-semibold text-foreground mb-1">
                    Witness {index + 1}: {witness.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aadhar: {formattedAadhar(witness.aadhar)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Phone: {witness.phone}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            className="flex-1 h-14 rounded-xl text-lg shadow-medium"
            onClick={downloadCertificate}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Certificate
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 h-14 rounded-xl text-lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            View Map Boundary (Placeholder)
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Record Verification Portal
            </h1>
            <p className="text-lg text-muted-foreground">
              Search and view complete land ownership verification details
            </p>
          </div>

          {/* Search Bar */}
          <Card className="rounded-2xl shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Search Land Record</CardTitle>
              <CardDescription>
                Enter the unique Registration ID to pull up the record.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full space-x-4">
                <Input
                  type="text"
                  placeholder="Enter Land Registration ID (e.g., LAND-1700...)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="h-12 text-base"
                  disabled={isSearching}
                />
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="h-12 w-28 shrink-0"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    "Searching..."
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <LandRecordDisplay />
        </div>
      </div>
    </div>
  );
}
