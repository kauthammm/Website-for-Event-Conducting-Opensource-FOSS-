import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/event', label: 'Event Info' },
  { path: '/register', label: 'Register' },
  { path: '/prizes', label: 'Prizes' },
  { path: '/contact', label: 'Contact' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            ${mobile ? 'block py-3 px-4' : 'px-4 py-2'}
            text-sm font-medium uppercase tracking-wider
            transition-colors duration-200
            ${
              location.pathname === item.path
                ? 'text-accent border-b-2 border-accent'
                : 'text-foreground hover:text-primary'
            }
          `}
          onClick={() => mobile && setMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 armor-shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 glitch-hover">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary angular-border" />
              <span className="text-xl font-bold tracking-wider text-primary">
                HACKATHON
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLinks />
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card border-l-2 border-primary/30">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t-2 border-primary/30 bg-card battle-worn">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">
                Military Hackathon
              </h3>
              <p className="text-sm text-muted-foreground">
                Command Center for tactical innovation and strategic development.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Email: command@hackathon.mil
                <br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Military Hackathon Command Center. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
