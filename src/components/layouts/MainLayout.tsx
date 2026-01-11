import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/event', label: 'Event Info' },
  { path: '/register', label: 'Register' },
  { path: '/prizes', label: 'Prizes' },
  { path: '/contact', label: 'Contact' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-accent/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 battle-damage-shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2 intense-glitch-hover">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo/foss-cit-logo.jpeg" 
                alt="FOSS CIT Logo" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-xl font-bold tracking-wider text-accent distressed-text">
                I'M GOING INN
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t-2 border-accent/40 bg-card war-texture">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-accent distressed-text">
                I'M GOING INN
              </h3>
              <p className="text-sm text-muted-foreground">
                Battlefield command center for tactical innovation and combat development.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-accent distressed-text">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Email: kauthampjk@gmail.com
                <br />
                Phone: 8807830345
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 I'M GOING INN Battlefield Command. All rights reserved.
            <br />
            Website creation by Bros Dont Fake Pvt Limited
          </div>
        </div>
      </footer>
    </div>
  );
}
