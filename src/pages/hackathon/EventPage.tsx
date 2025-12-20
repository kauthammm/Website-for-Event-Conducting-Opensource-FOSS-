import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, Award, Shield } from 'lucide-react';

export default function EventPage() {
  const schedule = [
    { time: '09:00 AM', event: 'Registration & Check-in', description: 'Operatives report for duty' },
    { time: '10:00 AM', event: 'Opening Ceremony', description: 'Mission briefing and keynote address' },
    { time: '11:00 AM', event: 'Hacking Begins', description: 'Teams deploy to their stations' },
    { time: '01:00 PM', event: 'Lunch Break', description: 'Tactical refueling' },
    { time: '06:00 PM', event: 'Checkpoint Review', description: 'Progress assessment and guidance' },
    { time: '08:00 PM', event: 'Dinner Break', description: 'Evening rations' },
    { time: '11:59 PM', event: 'Submission Deadline', description: 'Final deployment of solutions' },
    { time: '12:30 AM', event: 'Judging Period', description: 'Command evaluation' },
    { time: '02:00 AM', event: 'Awards Ceremony', description: 'Victory recognition' },
  ];

  const rules = [
    'Teams must consist of 2-5 members',
    'All code must be original work created during the event',
    'Open source libraries and frameworks are permitted',
    'Projects must be submitted before the deadline',
    'Teams must present their solution to judges',
    'Decisions of the judging panel are final',
  ];

  const themes = [
    {
      title: 'Cybersecurity Defense',
      description: 'Develop innovative security solutions for critical infrastructure protection',
      icon: Shield,
    },
    {
      title: 'Tactical Communication',
      description: 'Create secure, efficient communication systems for field operations',
      icon: Users,
    },
    {
      title: 'Strategic Intelligence',
      description: 'Build AI-powered analytics tools for strategic decision-making',
      icon: Award,
    },
  ];

  const criteria = [
    { category: 'Innovation', weight: '30%', description: 'Originality and creativity of the solution' },
    { category: 'Technical Excellence', weight: '25%', description: 'Code quality, architecture, and implementation' },
    { category: 'Impact', weight: '25%', description: 'Potential real-world application and value' },
    { category: 'Presentation', weight: '20%', description: 'Clarity and effectiveness of demonstration' },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4 text-primary">
            EVENT INTELLIGENCE
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete mission briefing and operational parameters
          </p>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-primary">
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">January 20-21, 2026</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Tech Command Center, Building A</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">24 Hours Non-Stop</p>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <Card className="mb-12 border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">MISSION TIMELINE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col xl:flex-row xl:items-center gap-4 p-4 bg-muted/30 rounded-sm border-l-4 border-primary"
                >
                  <div className="xl:w-32 font-bold text-primary">{item.time}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{item.event}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenge Themes */}
        <Card className="mb-12 border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">CHALLENGE SECTORS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themes.map((theme, index) => (
                <div key={index} className="p-6 bg-card border-2 border-border rounded-sm hover:border-primary transition-colors">
                  <theme.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-foreground">{theme.title}</h3>
                  <p className="text-muted-foreground">{theme.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rules */}
        <Card className="mb-12 border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">RULES OF ENGAGEMENT</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-sm flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Judging Criteria */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">EVALUATION CRITERIA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criteria.map((item, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-sm">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{item.category}</h3>
                    <span className="text-primary font-bold">{item.weight}</span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
