import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSession, setSession, ensureDemoParticipants, upsertParticipant } from '@/lib/session';

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<'admin' | 'participant'>('participant');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [team, setTeam] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ensureDemoParticipants();
    const session = getSession();
    if (session) {
      navigate(session.role === 'admin' ? '/admin' : '/home', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (role === 'admin') {
        // Admin password is admin007, username can be 'admin'
        if (password !== 'admin007') {
          throw new Error('Invalid commander password');
        }
        if (!username || username.toLowerCase() !== 'admin') {
          throw new Error('Use admin as username');
        }
        setSession({ username, role: 'admin' });
        toast({ title: 'Welcome, Commander', description: 'Redirecting to dashboard...' });
        navigate('/admin');
        return;
      }

      // Participant: special test accounts or name@fossops and 16-digit rollnumber password
      const uname = username.trim();
      const isTest = (uname === 'test1' || uname === 'test2') && password === 'test123';
      const isPattern = uname.endsWith('@fossops') && /^\d{16}$/.test(password);

      if (!isTest && !isPattern) {
        throw new Error('Invalid soldier credentials');
      }

      // Upsert participant record
      upsertParticipant({
        username: uname,
        name: uname.replace('@fossops', ''),
        rollNumber: isPattern ? password : undefined,
        team: team || 'Unassigned',
      });
      setSession({ username: uname, role: 'participant' });
      toast({ title: 'Login successful', description: 'Welcome to the battlefield...' });
      navigate('/home');
    } catch (err) {
      toast({ title: 'Login failed', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Full-screen background video section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              filter: 'contrast(1.1) brightness(0.8)',
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <source src="/log.mp4" type="video/mp4" />
            <source src="/log.webm" type="video/webm" />
          </video>
          {/* Simplified overlay for better performance */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Login Content */}
        <div className="container relative z-10 mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto">
            {/* Professional title */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-5xl font-bold text-white mb-2 tracking-wider" style={{
                textShadow: '0 0 30px rgba(255, 107, 0, 0.6), 0 0 60px rgba(255, 107, 0, 0.3)'
              }}>
                TACTICAL ACCESS
              </h1>
              <p className="text-orange-400 text-sm font-semibold tracking-[0.3em] uppercase mt-4">Authorized Personnel Only</p>
            </div>

            <Card className="border border-orange-500/20 bg-transparent backdrop-blur-sm shadow-2xl shadow-orange-500/10 animate-slide-up relative overflow-hidden">
              {/* Subtle animated border glow */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg border border-orange-500/0 shadow-[0_0_20px_rgba(255,107,0,0.3)] animate-pulse" />
              </div>
              
              {/* Minimal corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-orange-500/40" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-orange-500/40" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-orange-500/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-orange-500/40" />
              
              {/* Subtle scanning line effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-scan" />
              </div>

              <CardHeader className="relative">
                <CardTitle className="text-2xl text-white font-light tracking-[0.2em] uppercase">Access Control</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-orange-300/90 font-light uppercase tracking-widest text-xs">Role Selection</Label>
                    <RadioGroup value={role} onValueChange={(v) => setRole(v as any)} className="flex gap-4">
                      <div className="flex items-center space-x-2 bg-black/20 px-5 py-3 rounded border border-orange-500/20 hover:border-orange-500/50 hover:bg-black/30 transition-all cursor-pointer">
                        <RadioGroupItem value="participant" id="participant" className="border-orange-400 text-orange-400" />
                        <Label htmlFor="participant" className="text-white/90 cursor-pointer font-light tracking-wide">Soldier</Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-black/20 px-5 py-3 rounded border border-orange-500/20 hover:border-orange-500/50 hover:bg-black/30 transition-all cursor-pointer">
                        <RadioGroupItem value="admin" id="admin" className="border-orange-400 text-orange-400" />
                        <Label htmlFor="admin" className="text-white/90 cursor-pointer font-light tracking-wide">Commander</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-orange-300/90 font-light uppercase tracking-widest text-xs">
                      Username
                    </Label>
                    <Input 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      placeholder={role === 'admin' ? 'Enter commander username' : 'Enter username'} 
                      className="bg-black/30 border-orange-500/30 text-white placeholder:text-gray-600 focus:border-orange-500/60 focus:ring-orange-500/30 transition-all h-12 tracking-wide"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-orange-300/90 font-light uppercase tracking-widest text-xs">
                      Password
                    </Label>
                    <Input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Enter password" 
                      className="bg-black/30 border-orange-500/30 text-white placeholder:text-gray-600 focus:border-orange-500/60 focus:ring-orange-500/30 transition-all h-12 tracking-wide"
                    />
                  </div>

                  {role === 'participant' && (
                    <div className="space-y-2 animate-fade-in">
                      <Label className="text-orange-300/90 font-light uppercase tracking-widest text-xs">
                        Team Name
                      </Label>
                      <Input 
                        value={team} 
                        onChange={(e) => setTeam(e.target.value)} 
                        placeholder="Enter team name" 
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-gray-600 focus:border-orange-500/60 focus:ring-orange-500/30 transition-all h-12 tracking-wide"
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-orange-600/80 to-red-600/80 hover:from-orange-500 hover:to-red-500 text-white font-light uppercase tracking-[0.3em] py-6 text-sm shadow-lg shadow-orange-500/30 border border-orange-500/40 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                  >
                    {loading ? 'Authenticating...' : 'Enter'}
                  </Button>

                  <div className="mt-6 p-5 bg-black/20 rounded border border-orange-500/20 text-xs text-orange-200/80 space-y-2.5 font-light">
                    <p className="text-orange-400/90 uppercase tracking-widest text-[10px] mb-3 font-normal">Credentials Reference</p>
                    <p className="leading-relaxed">Commander: Username <span className="text-white font-normal">admin</span> / Password <span className="text-white font-normal">admin007</span></p>
                    <p className="leading-relaxed">Test Accounts: <span className="text-white font-normal">test1</span> or <span className="text-white font-normal">test2</span> / Password <span className="text-white font-normal">test123</span></p>
                    <p className="leading-relaxed">Soldiers: Username format <span className="text-orange-300 font-normal italic">name@fossops</span> / Password: 16-digit roll number</p>
                  </div>
                </form>
              </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
