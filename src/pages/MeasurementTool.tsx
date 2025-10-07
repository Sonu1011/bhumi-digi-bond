import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Bluetooth, Wifi, MapPin, Tablet, Satellite, XCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define all the regional land measurement units
const regionalUnits = {
    'North India': [
        { unit: 'Bigha (Varies)', approx: '≈ 27,000 sq ft (UP)' },
        { unit: 'Biswa (Varies)', approx: 'Sub-unit of Bigha' },
        { unit: 'Kanal', approx: '5,445 sq ft' },
        { unit: 'Marla', approx: '272.25 sq ft' },
        { unit: 'Gaj', approx: '9 sq ft (1 Square Yard)' },
    ],
    'East India': [
        { unit: 'Decimal', approx: '435.6 sq ft (1/100th Acre)' },
        { unit: 'Katha (Varies)', approx: '≈ 720 to 1,361 sq ft' },
        { unit: 'Chatak', approx: 'Smaller unit (West Bengal)' },
    ],
    'West India': [
        { unit: 'Guntha', approx: '1,089 sq ft' },
        { unit: 'Bigha (Varies)', approx: 'Used in Rajasthan/Gujarat' },
    ],
    'South India': [
        { unit: 'Cent', approx: '435.6 sq ft (1/100th Acre)' },
        { unit: 'Ground', approx: '2,400 sq ft (Tamil Nadu)' },
        { unit: 'Ankanam', approx: 'Small unit (Andhra Pradesh)' },
    ],
    'Standard': [
        { unit: 'Square Meter (sq m)', approx: 'Standard International Unit' },
        { unit: 'Acre', approx: '43,560 sq ft' },
        { unit: 'Hectare', approx: '10,000 sq m' },
    ]
};

type ConnectionType = 'Bluetooth' | 'WiFi' | null;

export default function MeasurementTool() {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionType>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [deviceData, setDeviceData] = useState<any>(null);
    const { toast } = useToast();

    const handleConnect = (type: ConnectionType) => {
        setConnectionStatus(type);
        setDeviceData(null); // Clear old data
        toast({
            title: `Attempting ${type} Connection...`,
            description: `Searching for compatible GPS/RTK devices.`,
        });

        // Simulate connection latency
        setTimeout(() => {
            if (Math.random() > 0.1) {
                toast({
                    title: "Device Connected",
                    description: `Successfully linked via ${type}. Ready to capture data.`,
                    variant: "default",
                });
            } else {
                setConnectionStatus(null);
                toast({
                    title: "Connection Failed",
                    description: `Could not establish a link via ${type}. Try again.`,
                    variant: "destructive",
                });
            }
        }, 2000);
    };

    const handleCapture = () => {
        if (!connectionStatus) {
            toast({
                title: "No Device Connected",
                description: "Please connect a device via Bluetooth or Wi-Fi first.",
                variant: "destructive",
            });
            return;
        }

        setIsCapturing(true);
        toast({
            title: "Data Capture in Progress...",
            description: "Receiving live boundary and photo data from the field device.",
        });

        // Simulate data stream and collection
        setTimeout(() => {
            const capturedData = {
                timestamp: new Date().toISOString(),
                deviceId: `RTK-GH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                parcelCount: Math.floor(Math.random() * 3) + 1,
                measuredArea: (Math.random() * 5 + 1).toFixed(3), // 1 to 6 acres
                unit: 'Acre',
                coordinates: 8, // Number of boundary points captured
                witnessesConfirmed: 2,
            };
            setDeviceData(capturedData);
            setIsCapturing(false);

            toast({
                title: "Capture Complete",
                description: `Successfully captured ${capturedData.parcelCount} parcel(s) with ${capturedData.measuredArea} acres of data.`,
                variant: "default",
            });
        }, 3500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-start mb-8 border-b pb-4">
                    <Zap className="h-8 w-8 text-primary mr-3" />
                    <h1 className="text-4xl font-bold text-foreground">
                        Field Measurement Integration
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: Connection and Control */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="shadow-medium">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <Tablet className="h-6 w-6 text-primary" />
                                    Device Connection
                                </CardTitle>
                                <CardDescription>
                                    Select a method to connect your portable measurement tool.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button
                                    className="w-full h-12 gap-3 transition-transform duration-300 hover:scale-[1.01]"
                                    onClick={() => handleConnect('Bluetooth')}
                                    disabled={connectionStatus === 'Bluetooth' || isCapturing}
                                    variant={connectionStatus === 'Bluetooth' ? 'default' : 'outline'}
                                >
                                    <Bluetooth className="h-5 w-5" />
                                    {connectionStatus === 'Bluetooth' ? 'Connected via Bluetooth' : 'Connect via Bluetooth'}
                                </Button>
                                <Button
                                    className="w-full h-12 gap-3 transition-transform duration-300 hover:scale-[1.01]"
                                    onClick={() => handleConnect('WiFi')}
                                    disabled={connectionStatus === 'WiFi' || isCapturing}
                                    variant={connectionStatus === 'WiFi' ? 'default' : 'outline'}
                                >
                                    <Wifi className="h-5 w-5" />
                                    {connectionStatus === 'WiFi' ? 'Connected via Wi-Fi' : 'Connect via Wi-Fi'}
                                </Button>
                                
                                <div className="pt-4 border-t mt-4">
                                    <Button
                                        className="w-full h-12 gap-3 text-lg font-semibold"
                                        onClick={handleCapture}
                                        disabled={!connectionStatus || isCapturing}
                                    >
                                        <Satellite className="h-5 w-5" />
                                        {isCapturing ? 'Capturing Data...' : 'Start Data Capture'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Connection Status Box */}
                        <Card className="shadow-medium">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Current Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`p-4 rounded-lg flex items-center gap-3 ${connectionStatus 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {connectionStatus ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                    <p className="font-semibold">
                                        {connectionStatus 
                                            ? `Live: Connected via ${connectionStatus}` 
                                            : 'Disconnected. Ready to connect.'}
                                    </p>
                                </div>
                                {deviceData && (
                                    <div className="mt-4 pt-4 border-t dark:border-muted/50 text-sm space-y-1">
                                        <p><strong>Device ID:</strong> {deviceData.deviceId}</p>
                                        <p><strong>Last Sync:</strong> {new Date(deviceData.timestamp).toLocaleTimeString()}</p>
                                        <p><strong>Parcels Captured:</strong> {deviceData.parcelCount}</p>
                                        <p><strong>Total Area:</strong> {deviceData.measuredArea} {deviceData.unit}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Column 2 & 3: Measurement Units and Explanation */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-medium">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    Supported Land Measurement Units
                                </CardTitle>
                                <CardDescription>
                                    BhumiBandhu supports native regional units for seamless data integration.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {Object.entries(regionalUnits).map(([region, units]) => (
                                    <div key={region}>
                                        <h3 className="text-xl font-semibold mb-3 text-primary border-b pb-1">
                                            {region}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {units.map((u, i) => (
                                                <div key={i} className="p-3 bg-muted/50 rounded-lg">
                                                    <p className="font-medium text-foreground">{u.unit}</p>
                                                    <p className="text-sm text-muted-foreground">{u.approx}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
