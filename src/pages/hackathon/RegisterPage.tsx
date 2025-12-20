import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  team_name: z.string().min(2, 'Team name must be at least 2 characters'),
  skills: z.string().min(10, 'Please provide at least 10 characters describing your skills'),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      team_name: '',
      skills: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Store in localStorage for demo purposes
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      
      // Check if email already exists
      const emailExists = registrations.some((reg: FormData) => reg.email === data.email);
      if (emailExists) {
        toast({
          title: 'Registration Failed',
          description: 'This email is already registered. Each operative can only register once.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Add new registration
      registrations.push({
        ...data,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('registrations', JSON.stringify(registrations));
      
      setIsSuccess(true);
      toast({
        title: 'Mission Accepted! ✓',
        description: 'Your registration has been successfully deployed.',
      });

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      toast({
        title: 'Deployment Failed',
        description: 'Failed to register. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 text-primary">
              OPERATIVE REGISTRATION
            </h1>
            <p className="text-lg text-muted-foreground">
              Deploy your credentials to join the mission
            </p>
          </div>

          {/* Registration Form */}
          <Card className="border-2 border-primary relative overflow-hidden">
            {/* Tactical grid background */}
            <div className="absolute inset-0 tactical-grid opacity-10" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl text-primary">DEPLOYMENT FORM</CardTitle>
              <CardDescription>
                All fields are required for mission clearance
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    REGISTRATION COMPLETE
                  </h3>
                  <p className="text-muted-foreground">
                    Welcome to the command center. Redirecting...
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold uppercase tracking-wider">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="border-2 border-border focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold uppercase tracking-wider">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="operative@command.mil"
                              className="border-2 border-border focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="team_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold uppercase tracking-wider">
                            Team Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Alpha Squad"
                              className="border-2 border-border focus:border-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold uppercase tracking-wider">
                            Skills & Expertise
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your technical skills, programming languages, frameworks, and areas of expertise..."
                              className="border-2 border-border focus:border-primary min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-bold uppercase tracking-wider"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        'Deploy Registration'
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-muted/30 rounded-sm border-l-4 border-primary">
            <h3 className="font-bold text-foreground mb-2">⚠️ MISSION BRIEFING</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Each operative can only register once</li>
              <li>• Team formation can be adjusted before the event</li>
              <li>• Confirmation email will be sent within 24 hours</li>
              <li>• Bring valid ID for check-in on event day</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

