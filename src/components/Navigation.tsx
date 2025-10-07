import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, Map, CheckCircle, Menu, Zap, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/add-land", label: "Add Land", icon: PlusCircle },
    { path: "/history", label: "History & Disputes", icon: History },
    { path: "/measurement", label: "Measurement Tool", icon: Zap },
    { path: "/map", label: "Map View", icon: Map },
    { path: "/verify", label: "Verify", icon: CheckCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                B
              </span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              BhumiBandhu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="flex items-center space-x-2 px-4 h-11"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-3 mt-8">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="w-full justify-start space-x-3 h-12 text-lg"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
