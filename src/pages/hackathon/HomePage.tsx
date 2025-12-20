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
      {/* Hero Section with EXTREME Battlefield Background */}
      <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://miaoda-edit-image.s3cdn.medo.dev/8cxv3mixab5t/IMG-8cy6knnu3gg0.png)',
            filter: 'grayscale(40%) contrast(1.3) brightness(0.6)',
          }}
        />
        
        {/* VERY dark overlay for extreme gritty effect */}
        <div className="absolute inset-0 bg-black/90" />
        
        {/* Heavy blood splatter overlay */}
        <div className="absolute inset-0 blood-splatter opacity-80" />
        
        {/* Blood drips from top */}
        <div className="absolute inset-0 blood-drips" />
        
        {/* Heavy bullet holes */}
        <div className="absolute inset-0 bullet-holes" />
        
        {/* Shell casings scattered */}
        <div className="absolute inset-0 shell-casings" />
        
        {/* Combat grid overlay */}
        <div className="absolute inset-0 combat-grid opacity-30" />
        
        {/* Dense smoke overlay */}
        <div className="absolute inset-0 smoke-overlay" />
        
        {/* Heavy shrapnel debris */}
        <div className="absolute inset-0 shrapnel-debris opacity-70" />
        
        {/* Dust particles */}
        <div className="absolute inset-0 dust-particles" />
        
        {/* Burn marks */}
        <div className="absolute inset-0 burn-marks" />
        
        {/* Multiple explosion flashes */}
        <div className="absolute top-10 right-20 w-40 h-40 explosion-flash opacity-30" />
        <div className="absolute bottom-20 left-10 w-48 h-48 explosion-flash opacity-25" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-10 w-36 h-36 explosion-flash opacity-20" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-10 right-1/3 w-44 h-44 explosion-flash opacity-28" style={{ animationDelay: '0.5s' }} />

        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <div className="mb-6 inline-block damaged-armor blood-splatter">
            <div className="px-6 py-3 border-2 border-accent/80 bg-black/70 backdrop-blur-sm cracked-armor bullet-holes">
              <span className="text-sm font-bold text-accent tracking-widest distressed-text">
                ☠ ACTIVE WAR ZONE ☠
              </span>
            </div>
          </div>

          <h1 className="text-4xl xl:text-7xl font-black mb-6 leading-tight">
            <span className="text-accent intense-glitch-hover distressed-text">COMBAT HACKATHON</span>
            <br />
            <span className="text-foreground drop-shadow-2xl distressed-text">BATTLEFIELD COMMAND</span>
          </h1>

          <p className="text-lg xl:text-xl text-foreground/85 mb-8 max-w-2xl mx-auto drop-shadow-2xl font-medium">
            Enter the war zone. Code under fire. Only the strongest survive the battlefield.
          </p>

          <div className="flex flex-col xl:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-7 text-lg font-bold uppercase tracking-wider battle-damage-shadow border-2 border-accent/80 damaged-armor bullet-holes">
                <span className="distressed-text">⚔ Deploy to Combat</span>
              </Button>
            </Link>
            <Link to="/event">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-7 text-lg font-bold uppercase tracking-wider battle-damage-shadow bg-black/60 backdrop-blur-sm cracked-armor shell-casings">
                <span className="distressed-text">📋 Mission Intel</span>
              </Button>
            </Link>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-accent drop-shadow-2xl distressed-text">
              ⏱ COMBAT DEPLOYMENT IN
            </h2>
            <CountdownTimer targetDate={hackathonDate} />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-background war-texture blood-splatter">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl xl:text-4xl font-bold text-center mb-12 text-accent distressed-text">
            ⚡ COMBAT ADVANTAGES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 group damaged-armor bullet-holes shell-casings"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/40 opacity-60" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                <div className="absolute inset-0 blood-splatter opacity-30" />
                <div className="absolute inset-0 burn-marks opacity-20" />
                
                <CardHeader>
                  <div className="mb-4 inline-block p-4 bg-accent/25 border border-accent/50 cracked-armor blood-splatter">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-foreground distressed-text">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                
                {/* Combat grid overlay */}
                <div className="absolute inset-0 combat-grid opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Heavy shrapnel on hover */}
                <div className="absolute inset-0 shrapnel-debris opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Dust particles on hover */}
                <div className="absolute inset-0 dust-particles opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-muted via-background to-card relative overflow-hidden">
        <div className="absolute inset-0 combat-grid opacity-35" />
        <div className="absolute inset-0 smoke-overlay" />
        <div className="absolute inset-0 blood-splatter opacity-20" />
        <div className="absolute inset-0 burn-marks opacity-15" />
        <div className="absolute inset-0 dust-particles" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto damaged-armor p-12 border-2 border-accent/60 bullet-holes cracked-armor blood-splatter shell-casings">
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 text-accent intense-glitch-hover distressed-text">
              ☠ READY FOR COMBAT? ☠
            </h2>
            <p className="text-lg xl:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join the battlefield. Face the challenge. Prove your worth in the war zone. No retreat. No surrender.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-7 text-xl font-bold uppercase tracking-wider battle-damage-shadow border-2 border-accent/80 damaged-armor bullet-holes">
                <span className="distressed-text">⚔ Enter War Zone</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
