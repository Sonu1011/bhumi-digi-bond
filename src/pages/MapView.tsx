import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Satellite, Navigation } from "lucide-react";

const MapView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Map View</h1>
          <p className="text-lg text-muted-foreground">View and mark your land boundaries on satellite imagery</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-medium overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative flex items-center justify-center">
                  {/* Placeholder for map integration */}
                  <div className="text-center space-y-4">
                    <Satellite className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Map Integration Ready</h3>
                      <p className="text-muted-foreground">
                        This section will display satellite imagery with GPS boundaries
                      </p>
                    </div>
                  </div>
                  
                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="rounded-xl shadow-soft">
                      <Navigation className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-xl shadow-soft">
                      <MapPin className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Tools */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-xl h-11">
                <MapPin className="w-4 h-4 mr-2" />
                Mark Boundaries
              </Button>
              <Button variant="outline" className="rounded-xl h-11">
                <Satellite className="w-4 h-4 mr-2" />
                Satellite View
              </Button>
              <Button variant="outline" className="rounded-xl h-11">
                <Navigation className="w-4 h-4 mr-2" />
                Current Location
              </Button>
            </div>
          </div>

          {/* Land Details Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle>Land Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Owner</p>
                  <p className="text-foreground font-semibold">Ramesh Kumar</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Survey Number</p>
                  <p className="text-foreground font-semibold">123/4A</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Area</p>
                  <p className="text-foreground font-semibold">2.5 acres</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-foreground font-semibold">Village Kandivali, District Thane</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft">
              <CardHeader>
                <CardTitle>GPS Coordinates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Latitude</p>
                  <p className="text-foreground font-mono">19.0760° N</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Longitude</p>
                  <p className="text-foreground font-mono">72.8777° E</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl h-11 mt-4">
                  Update Coordinates
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Measurement Tool Sync</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your measurement device to automatically update boundaries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
