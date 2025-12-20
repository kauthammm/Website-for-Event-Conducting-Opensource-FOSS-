import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const faqs = [
    {
      question: 'Who can participate in the hackathon?',
      answer: 'The hackathon is open to all developers, designers, and tech enthusiasts aged 18 and above. Students, professionals, and hobbyists are all welcome to participate.',
    },
    {
      question: 'Do I need to have a team to register?',
      answer: 'You can register as an individual or as a team. If you register individually, we will help you find team members during the team formation session at the event.',
    },
    {
      question: 'What should I bring to the event?',
      answer: 'Bring your laptop, chargers, valid ID, and any other hardware you might need. We will provide WiFi, power outlets, meals, and beverages throughout the event.',
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No, registration is completely free. All participants will receive free meals, swag, and access to mentors and workshops.',
    },
    {
      question: 'Can I work on an existing project?',
      answer: 'No, all projects must be started from scratch during the hackathon. However, you can use existing libraries, frameworks, and APIs.',
    },
    {
      question: 'What if I need to leave early?',
      answer: 'While we encourage participants to stay for the entire duration, we understand emergencies happen. Please inform the organizers if you need to leave early.',
    },
    {
      question: 'Will there be mentors available?',
      answer: 'Yes, we will have experienced mentors from various tech domains available throughout the event to help guide your projects.',
    },
    {
      question: 'How will projects be judged?',
      answer: 'Projects will be evaluated based on innovation (30%), technical excellence (25%), impact (25%), and presentation (20%).',
    },
    {
      question: 'Can I participate remotely?',
      answer: 'This is an in-person event. Remote participation is not available to ensure the best collaborative experience.',
    },
    {
      question: 'What happens after I register?',
      answer: 'You will receive a confirmation email within 24 hours with additional details about the event, including what to bring and the exact schedule.',
    },
  ];

  const contacts = [
    {
      icon: Mail,
      title: 'Email',
      value: 'command@hackathon.mil',
      description: 'General inquiries and support',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Emergency contact during event',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Tech Command Center',
      description: 'Building A, 123 Innovation Drive',
    },
    {
      icon: MessageSquare,
      title: 'Discord',
      value: 'discord.gg/hackathon',
      description: 'Join our community server',
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4 text-primary">
            CONTACT & SUPPORT
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Command center communications and frequently asked questions
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <Card
              key={index}
              className="border-2 border-border hover:border-primary transition-colors"
            >
              <CardHeader>
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-sm">
                  <contact.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{contact.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-foreground mb-1">{contact.value}</p>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              FREQUENTLY ASKED QUESTIONS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Support Hours */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-muted/30 rounded-sm border-l-4 border-primary">
            <h3 className="font-bold text-foreground mb-2">📞 SUPPORT HOURS</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>• Saturday - Sunday: 10:00 AM - 4:00 PM</li>
              <li>• During Event: 24/7 Support Available</li>
            </ul>
          </div>

          <div className="p-6 bg-muted/30 rounded-sm border-l-4 border-accent">
            <h3 className="font-bold text-foreground mb-2">⚡ EMERGENCY CONTACT</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Event Day Hotline: +1 (555) 999-0000</li>
              <li>• Medical Emergency: Dial 911</li>
              <li>• Security: Contact on-site personnel</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
