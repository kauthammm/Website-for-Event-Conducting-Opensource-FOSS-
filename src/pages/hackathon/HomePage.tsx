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
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
        {/* Tactical grid background */}
        <div className="absolute inset-0 tactical-grid opacity-30" />
        
        {/* Camouflage pattern overlay */}
        <div className="absolute inset-0 camo-pattern" />

        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <div className="mb-6 inline-block">
            <div className="px-4 py-2 bg-primary/20 border border-primary rounded-sm">
              <span className="text-sm font-bold text-primary tracking-widest">
                ⚡ OPERATION ACTIVE
              </span>
            </div>
          </div>

          <h1 className="text-4xl xl:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">MILITARY HACKATHON</span>
            <br />
            <span className="text-foreground">COMMAND CENTER</span>
          </h1>

          <p className="text-lg xl:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deploy your skills in the ultimate tactical coding challenge. 
            Strategic thinking meets innovative development.
          </p>

          <div className="flex flex-col xl:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-bold uppercase tracking-wider">
                Deploy Now
              </Button>
            </Link>
            <Link to="/event">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-bold uppercase tracking-wider">
                Mission Brief
              </Button>
            </Link>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              MISSION COMMENCES IN
            </h2>
            <CountdownTimer targetDate={hackathonDate} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl xl:text-4xl font-bold text-center mb-12 text-primary">
            TACTICAL ADVANTAGES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-sm">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl xl:text-5xl font-bold mb-6 text-primary">
            READY FOR DEPLOYMENT?
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the ranks of elite developers and compete for glory. 
            Registration is now open for all operatives.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-xl font-bold uppercase tracking-wider">
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
