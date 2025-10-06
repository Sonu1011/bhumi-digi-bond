import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Smartphone, Globe } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-medium mb-4">
            <MapPin className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Your Land. Your Legacy.<br />
            <span className="text-primary">Digitally Secured.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            BhumiBandhu bridges the gap between rural landowners and modern technology, 
            bringing transparency and trust to land ownership.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl shadow-medium hover:shadow-lg transition-all">
                Get Started
              </Button>
            </Link>
            <Link to="/add-land">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl">
                Add Your Land
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Verified Records"
            description="Integrated with Bhulekh and DILRMP for government-verified data"
          />
          <FeatureCard
            icon={<MapPin className="w-8 h-8" />}
            title="GPS Mapping"
            description="Precise land boundaries with satellite imagery and GPS coordinates"
          />
          <FeatureCard
            icon={<Smartphone className="w-8 h-8" />}
            title="Offline Access"
            description="Works in low-connectivity areas with automatic sync"
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8" />}
            title="Multi-language"
            description="Available in English and regional languages for easy access"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto bg-card rounded-3xl shadow-medium p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to secure your land digitally?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of landowners who trust BhumiBandhu for their land management needs.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="text-lg h-14 px-8 rounded-xl shadow-medium">
              Start Managing Your Land
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default Landing;
