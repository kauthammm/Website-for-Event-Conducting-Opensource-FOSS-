import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Briefcase } from 'lucide-react';

export default function PrizesPage() {
  const prizes = [
    {
      rank: '1st Place',
      icon: Trophy,
      amount: '$10,000',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent',
      perks: [
        'Grand Champion Trophy',
        'Premium tech package',
        'Mentorship program access',
        'Featured on platform',
      ],
    },
    {
      rank: '2nd Place',
      icon: Medal,
      amount: '$5,000',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      perks: [
        'Silver Medal',
        'Tech gadget bundle',
        'Industry networking event',
        'Certificate of excellence',
      ],
    },
    {
      rank: '3rd Place',
      icon: Award,
      amount: '$2,500',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary',
      perks: [
        'Bronze Medal',
        'Software licenses',
        'Online course access',
        'Recognition certificate',
      ],
    },
  ];

  const specialAwards = [
    {
      title: 'Best Innovation',
      prize: '$1,000',
      description: 'Most creative and original solution',
    },
    {
      title: 'Best Design',
      prize: '$1,000',
      description: 'Outstanding user interface and experience',
    },
    {
      title: 'Best Technical Implementation',
      prize: '$1,000',
      description: 'Superior code quality and architecture',
    },
    {
      title: 'People\'s Choice',
      prize: '$500',
      description: 'Voted by event participants',
    },
  ];

  const sponsors = [
    {
      name: 'TechCorp Industries',
      tier: 'Platinum Sponsor',
      contribution: 'Main prize pool contributor',
    },
    {
      name: 'CodeForce Solutions',
      tier: 'Gold Sponsor',
      contribution: 'Special awards sponsor',
    },
    {
      name: 'Innovation Labs',
      tier: 'Silver Sponsor',
      contribution: 'Tech equipment provider',
    },
    {
      name: 'DevTools Inc.',
      tier: 'Bronze Sponsor',
      contribution: 'Software licenses',
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4 text-primary">
            VICTORY REWARDS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Total prize pool of $20,000+ in cash and rewards
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <Card
              key={index}
              className={`border-2 ${prize.borderColor} relative overflow-hidden hover:shadow-lg transition-all duration-300`}
            >
              {/* Background pattern */}
              <div className={`absolute inset-0 ${prize.bgColor} opacity-50`} />
              <div className="absolute inset-0 tactical-grid opacity-20" />

              <CardHeader className="relative z-10 text-center">
                <div className={`mx-auto mb-4 p-4 ${prize.bgColor} rounded-sm inline-block`}>
                  <prize.icon className={`h-12 w-12 ${prize.color}`} />
                </div>
                <CardTitle className="text-2xl mb-2">{prize.rank}</CardTitle>
                <div className={`text-4xl font-black ${prize.color}`}>
                  {prize.amount}
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2">
                  {prize.perks.map((perk, perkIndex) => (
                    <li key={perkIndex} className="flex items-start gap-2">
                      <span className={`flex-shrink-0 w-5 h-5 ${prize.bgColor} ${prize.color} rounded-sm flex items-center justify-center text-xs font-bold`}>
                        ✓
                      </span>
                      <span className="text-sm text-foreground">{perk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Awards */}
        <Card className="mb-12 border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              SPECIAL RECOGNITION AWARDS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialAwards.map((award, index) => (
                <div
                  key={index}
                  className="p-6 bg-muted/30 rounded-sm border-l-4 border-primary hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{award.title}</h3>
                    <span className="text-xl font-black text-accent">{award.prize}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{award.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sponsors */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">STRATEGIC PARTNERS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border-2 border-border rounded-sm hover:border-primary transition-colors"
                >
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {sponsor.name}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-sm uppercase tracking-wider">
                      {sponsor.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{sponsor.contribution}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-muted/30 rounded-sm border-l-4 border-accent">
          <h3 className="font-bold text-foreground mb-2">💰 PRIZE DISTRIBUTION</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• All prizes will be distributed within 30 days of event completion</li>
            <li>• Winners must provide valid identification and tax information</li>
            <li>• Prizes are non-transferable and cannot be exchanged for cash</li>
            <li>• Special awards are independent of main prizes</li>
            <li>• Teams must be present at awards ceremony to claim prizes</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
