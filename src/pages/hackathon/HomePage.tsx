import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from '@/components/hackathon/CountdownTimer';
import { Target, Users, Trophy, Code } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

export default function HomePage() {
  const [showStory, setShowStory] = useState(false);
  
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
        {/* Background Image - Tactical Soldier with Rifle - FULLY VISIBLE */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://miaoda-conversation-file.s3cdn.medo.dev/user-88xff9huyhog/conv-8cxv3mixab5s/20251220/file-8cz0a2evufb4.jpg)',
            filter: 'grayscale(10%) contrast(1.15) brightness(1.0)',
          }}
        />
        
        {/* Very light overlay to maintain readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Subtle blood splatter overlay */}
        <div className="absolute inset-0 blood-splatter opacity-15" />
        
        {/* Blood drips from top */}
        <div className="absolute inset-0 blood-drips opacity-20" />
        
        {/* Subtle bullet holes */}
        <div className="absolute inset-0 bullet-holes opacity-20" />
        
        {/* Shell casings scattered */}
        <div className="absolute inset-0 shell-casings opacity-15" />
        
        {/* Combat grid overlay */}
        <div className="absolute inset-0 combat-grid opacity-10" />
        
        {/* Light smoke overlay */}
        <div className="absolute inset-0 smoke-overlay opacity-20" />
        
        {/* Subtle shrapnel debris */}
        <div className="absolute inset-0 shrapnel-debris opacity-20" />
        
        {/* Dust particles */}
        <div className="absolute inset-0 dust-particles opacity-15" />
        
        {/* Burn marks */}
        <div className="absolute inset-0 burn-marks opacity-15" />

        {/* Red Lightning Strikes - Multiple positions */}
        <div className="absolute top-0 left-1/4 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '0s' }} />
        <div className="absolute top-0 right-1/3 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '2s' }} />
        <div className="absolute top-0 left-2/3 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '4s' }} />
        <div className="absolute top-0 right-1/4 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-0 left-1/2 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '3.5s' }} />

        {/* Story Button */}
        <div className="absolute right-10 top-20 z-20">
          <Button 
            onClick={() => setShowStory(!showStory)}
            className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-[#FF6B00]"
          >
            {showStory ? '✕ CLOSE STORY' : '📁 MISSION BRIEF'}
          </Button>
        </div>

        {/* Running Subtitle Story Narration */}
        {showStory && (
          <div className="absolute bottom-0 left-0 right-0 z-30 py-4 bg-black/80 backdrop-blur-sm overflow-hidden">
            <div className="running-subtitle">
              <span className="text-[#FF6B00] font-bold">[ CLASSIFIED - MISSION BRIEFING - OPERATION CODE STORM ]</span> ⚡ ALERT: The year is 2025. Digital warfare has escalated beyond all predictions. Our intelligence network has detected a massive coordinated cyber attack targeting global infrastructure. Enemy forces are mobilizing. Time is critical. <span className="text-[#FF6B00] font-bold">COMMAND DIRECTIVE:</span> Assemble the world's most elite hackers, programmers, and digital warriors for an unprecedented combat operation. <span className="text-[#FF6B00] font-bold">YOUR MISSION OBJECTIVES:</span> [1] Infiltrate enemy systems and identify vulnerabilities. [2] Deploy innovative code-based countermeasures. [3] Neutralize hostile AI algorithms before they breach our defenses. [4] Collaborate with your tactical squad to secure digital supremacy. [5] Complete all objectives within the combat window. <span className="text-[#FF6B00] font-bold">⚠ CRITICAL WARNING:</span> This is NOT a simulation. This is NOT a drill. Enemy engagement is imminent. Casualties are expected. Only the most skilled will survive the digital battlefield. Failure means total system collapse. <span className="text-[#FF6B00] font-bold">THREAT LEVEL: DEFCON 1</span> ⚡ All combat units must report to deployment stations immediately. The fate of the entire digital infrastructure rests on your shoulders. Every line of code matters. Every second counts. <span className="text-[#FF6B00] font-bold">RULES OF ENGAGEMENT:</span> Code with precision. Think like the enemy. Adapt or perish. No retreat. No surrender. Victory is the ONLY acceptable outcome. <span className="text-[#FF6B00] font-bold">FINAL TRANSMISSION:</span> You have been chosen because you are the best. Prove it. The world is watching. The enemy is waiting. Your mission begins NOW. Code or die. Fight or fall. Win or lose everything. <span className="text-[#FF6B00] font-bold">[ END CLASSIFIED TRANSMISSION - GOOD LUCK SOLDIER ]</span> ⚡⚡⚡
            </div>
          </div>
        )}

        {/* Hero content */}
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <div className="mb-6 inline-block damaged-armor blood-splatter">
            <div className="px-6 py-3 border-2 border-[#FF6B00] bg-black/80 backdrop-blur-sm cracked-armor bullet-holes">
              <span className="text-sm font-bold text-[#FF6B00] tracking-widest">
                ☠ ACTIVE WAR ZONE ☠
              </span>
            </div>
          </div>

          <h1 className="text-4xl xl:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
            <span className="text-[#FF6B00] intense-glitch-hover">COMBAT HACKATHON</span>
            <br />
            <span className="text-white drop-shadow-2xl distressed-text">BATTLEFIELD COMMAND</span>
          </h1>

          <p className="text-lg xl:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-2xl font-medium">
            Enter the war zone. Code under fire. Only the strongest survive the battlefield.
          </p>

          <div className="flex flex-col xl:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-10 py-7 text-lg font-bold uppercase tracking-wider battle-damage-shadow border-2 border-[#FF6B00] damaged-armor bullet-holes">
                <span className="distressed-text">⚔ Deploy to Combat</span>
              </Button>
            </Link>
            <Link to="/event">
              <Button size="lg" variant="outline" className="border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-10 py-7 text-lg font-bold uppercase tracking-wider battle-damage-shadow bg-black/60 backdrop-blur-sm cracked-armor shell-casings">
                <span className="distressed-text">📋 Mission Intel</span>
              </Button>
            </Link>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-[#FF6B00] drop-shadow-2xl">
              ⏱ COMBAT DEPLOYMENT IN
            </h2>
            <CountdownTimer targetDate={hackathonDate} />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-background war-texture blood-splatter relative overflow-hidden">
        {/* Background Image Layer - Desert Soldier */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://miaoda-conversation-file.s3cdn.medo.dev/user-88xff9huyhog/conv-8cxv3mixab5s/20251220/file-8cz0e0h3y77k.png)',
            filter: 'grayscale(40%) contrast(1.3) brightness(0.7)',
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />
        
        {/* Combat effects */}
        <div className="absolute inset-0 bullet-holes opacity-60" />
        <div className="absolute inset-0 shell-casings opacity-50" />
        <div className="absolute inset-0 smoke-overlay" />
        <div className="absolute inset-0 dust-particles opacity-60" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl xl:text-4xl font-bold text-center mb-12 text-[#FF6B00]">
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
        {/* Background Image Layer - Third Military Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: 'url(https://miaoda-conversation-file.s3cdn.medo.dev/user-88xff9huyhog/conv-8cxv3mixab5s/20251220/file-8cywq1b8e5uo.jpg)',
            filter: 'grayscale(50%) contrast(1.4) brightness(0.6)',
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/85" />
        
        <div className="absolute inset-0 combat-grid opacity-35" />
        <div className="absolute inset-0 smoke-overlay" />
        <div className="absolute inset-0 blood-splatter opacity-20" />
        <div className="absolute inset-0 burn-marks opacity-15" />
        <div className="absolute inset-0 dust-particles" />
        <div className="absolute inset-0 bullet-holes opacity-50" />
        <div className="absolute inset-0 shell-casings opacity-40" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto damaged-armor p-12 border-2 border-[#FF6B00]/60 bullet-holes cracked-armor blood-splatter shell-casings">
            <h2 className="text-3xl xl:text-5xl font-bold mb-6 text-[#FF6B00] intense-glitch-hover">
              ☠ READY FOR COMBAT? ☠
            </h2>
            <p className="text-lg xl:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join the battlefield. Face the challenge. Prove your worth in the war zone. No retreat. No surrender.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-7 text-xl font-bold uppercase tracking-wider battle-damage-shadow border-2 border-[#FF6B00] damaged-armor bullet-holes">
                <span className="distressed-text">⚔ Enter War Zone</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
