import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from '@/components/hackathon/CountdownTimer';
import { Target, Users, Trophy, Code } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

export default function HomePage() {
  // Set hackathon start date (example: 30 days from now)
  const hackathonDate = new Date();
  hackathonDate.setDate(hackathonDate.getDate() + 30);

  const features = [
    {
      icon: Target,
      title: 'Mission-Critical Challenges',
      description: 'Tackle real-world problems with strategic solutions',
    },
    {
      icon: Users,
      title: 'Elite Teams',
      description: 'Form tactical units with skilled operatives',
    },
    {
      icon: Trophy,
      title: 'Victory Rewards',
      description: 'Compete for substantial prize pools and recognition',
    },
    {
      icon: Code,
      title: 'Advanced Arsenal',
      description: 'Access cutting-edge tools and technologies',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section with Military Background */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://miaoda-edit-image.s3cdn.medo.dev/8cxv3mixab5t/IMG-8cy6knnu3gg0.png)',
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/75" />
        
        {/* Tactical grid overlay */}
        <div className="absolute inset-0 tactical-grid opacity-20" />
        
        {/* Desert camo pattern overlay */}
        <div className="absolute inset-0 desert-camo" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 scan-line" />

        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <div className="mb-6 inline-block armor-plate">
            <div className="px-6 py-3 border-2 border-primary/50 angular-border bg-black/40 backdrop-blur-sm">
              <span className="text-sm font-bold text-primary tracking-widest">
                ⚡ OPERATION ACTIVE
              </span>
            </div>
          </div>

          <h1 className="text-4xl xl:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            <span className="text-primary glitch-hover">MILITARY HACKATHON</span>
            <br />
            <span className="text-foreground drop-shadow-lg">COMMAND CENTER</span>
          </h1>

          <p className="text-lg xl:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium">
            Deploy your skills in the ultimate tactical coding challenge. 
            Strategic thinking meets innovative development.
          </p>

          <div className="flex flex-col xl:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-lg font-bold uppercase tracking-wider armor-shadow border-2 border-accent/50">
                Deploy Now
              </Button>
            </Link>
            <Link to="/event">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-7 text-lg font-bold uppercase tracking-wider armor-shadow bg-black/40 backdrop-blur-sm">
                Mission Brief
              </Button>
            </Link>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary drop-shadow-lg">
              MISSION COMMENCES IN
            </h2>
            <CountdownTimer targetDate={hackathonDate} />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-background battle-worn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl xl:text-4xl font-bold text-center mb-12 text-primary">
            TACTICAL ADVANTAGES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 group armor-plate"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-accent/20 angular-border" />
                
                <CardHeader>
                  <div className="mb-4 inline-block p-4 bg-primary/20 border border-primary/30 metallic-armor">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                
                {/* Tactical grid overlay */}
                <div className="absolute inset-0 tactical-grid opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-muted via-background to-card relative overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="absolute inset-0 desert-camo" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto armor-plate p-12 border-2 border-primary/30">
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 text-primary glitch-hover">
              READY FOR DEPLOYMENT?
            </h2>
            <p className="text-lg xl:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join the ranks of elite developers and compete for glory. 
              Registration is now open for all operatives.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-7 text-xl font-bold uppercase tracking-wider armor-shadow border-2 border-accent/50">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
