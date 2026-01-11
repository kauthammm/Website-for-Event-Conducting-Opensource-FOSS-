import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import CountdownTimer from '@/components/hackathon/CountdownTimer';
import { Target, Users, Trophy, Code, AlertCircle, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { getSession, setSession, getParticipants, getTeamAllowedMission, appendAnswer, validateAnswers } from '@/lib/session';

const MISSIONS = [
  { 
    id: 'mission-1', 
    num: 1, 
    title: '🎯 THE 10 TACTICAL SCENARIOS - COMPLETE THE MISSION', 
    prompt: `You've intercepted 10 encrypted tactical scenarios. Each tests your ability to strategize, optimize, and execute under pressure.

**SUBMIT ALL 10 ANSWERS TOGETHER**
Write all your solutions clearly. Show your logic. The AI is watching.

---

**PROBLEM 1: The Escape Route Pattern**
Pattern: 3km, 7km, 11km, 15km, 19km → Next THREE safehouses?

**PROBLEM 2: The Minefield Navigation**  
Grid 10-50. "Only the indivisible ones can be trusted." List safe zones.

**PROBLEM 3: The Intercepted Transmission**
Encrypted: "GNINNIOG M'I" → What is The Ghost planning?

**PROBLEM 4: The Infiltrator**
Surveillance: 2, 4, 5, 6, 4, 8, 9 → Which ID appears twice?

**PROBLEM 5: The Weapon Arsenal**
Codes: 64, 34, 25, 12, 22, 11, 90 → Sort lowest to highest threat.

**PROBLEM 6: The Formation Protocol**
Squad: 16 operatives. Perfect square possible? What about 15? Verify system.

**PROBLEM 7: The High-Priority Target**
Zones: A=3, B=7, C=2, D=9, E=1, F=6 → Which zone is critical?

**PROBLEM 8: The Coordinate Decoder**
Code: 1101 (dual-signal). Decode to standard format.

**PROBLEM 9: The Security Sequence**
Sequence: 0, 1, 1, 2, 3, 5, 8, ??? → What's 9th number? Develop algorithm.

**PROBLEM 10: The Vault Access Code**
Codes: RADAR, MISSION → Which grant access? Create verification system.` 
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [showStory, setShowStory] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'participant' | null>(null);
  const [allowedUpToMission, setAllowedUpToMission] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submissionFeedback, setSubmissionFeedback] = useState<any>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [answerAnimate, setAnswerAnimate] = useState<Record<string, boolean>>({});
  
  // Set hackathon start date (example: 30 days from now)
  const hackathonDate = new Date();
  hackathonDate.setDate(hackathonDate.getDate() + 30);

  useEffect(() => {
    const s = getSession();
    if (s) {
      setUsername(s.username);
      setRole(s.role);
      if (s.role === 'participant') {
        const p = getParticipants().find((x) => x.username === s.username);
        const allowed = getTeamAllowedMission(p?.team);
        setAllowedUpToMission(allowed);
      }
    }
  }, []);

  const logout = () => {
    setSession(null);
    setUsername(null);
    setRole(null);
    setAllowedUpToMission(1);
    setAnswers({});
    setSubmissionFeedback(null);
    setHasSubmitted(false);
    navigate('/', { replace: true });
  };

  const submitAnswer = () => {
    if (!username || Object.keys(answers).length === 0) {
      alert('Please answer all 10 problems before submitting');
      return;
    }
    
    // Validate answers
    const validation = validateAnswers(answers);
    setSubmissionFeedback(validation.feedback);
    setHasSubmitted(true);
    
    // Save the submission
    const allAnswersText = Object.entries(answers).map(([key, val]) => `${key}: ${val}`).join('\n');
    appendAnswer(username, 'mission-1', 1, allAnswersText);
  };

  const features = [
    {
      icon: Target,
      title: 'Stage Alpha: Recon Intel',
      description: 'Gather field intelligence and decode hostile signals',
    },
    {
      icon: Users,
      title: 'Stage Bravo: Unit Cohesion',
      description: 'Form disciplined squads and synchronize maneuvers',
    },
    {
      icon: Trophy,
      title: 'Stage Charlie: Asset Capture',
      description: 'Secure objectives under pressure with zero exposure',
    },
    {
      icon: Code,
      title: 'Stage Delta: Systems Breach',
      description: 'Penetrate defenses with precision tooling and tactics',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section with EXTREME Battlefield Background */}
      <section className="relative group min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Video - Shooting Commander */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              filter: 'grayscale(10%) contrast(1.15) brightness(0.85)',
            }}
          >
            <source src="/background-video.mp4" type="video/mp4" />
            <source src="/background-video.webm" type="video/webm" />
            {/* Fallback to image if video doesn't load */}
          </video>
          {/* Fallback background image if video fails to load */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://miaoda-conversation-file.s3cdn.medo.dev/user-88xff9huyhog/conv-8cxv3mixab5s/20251220/file-8cz0a2evufb4.jpg)',
              filter: 'grayscale(10%) contrast(1.15) brightness(1.0)',
            }}
          />
        </div>

        {/* Background Text Layer behind soldier */}
        <div className="absolute inset-0 z-35 pointer-events-none flex items-center justify-center">
          <div className="text-center px-8">
            <p className="text-2xl md:text-3xl xl:text-4xl text-white/40 font-semibold tracking-wide max-w-4xl mx-auto">
              Enter the war zone. Code under fire. Only the strongest survive the battlefield.
            </p>
          </div>
        </div>

        {/* Foreground Soldier Overlay - foremost; text sits behind */}
        <div className="absolute inset-0 z-60 pointer-events-none opacity-95 scale-100 transition-all duration-700 ease-out">
          <img
            src="https://miaoda-conversation-file.s3cdn.medo.dev/user-88xff9huyhog/conv-8cxv3mixab5s/20251220/file-8cz0a2evufb4.jpg"
            alt="Soldier foreground"
            className="soldier-layer w-full h-full object-cover brightness-122 contrast-140"
          />
        </div>
        
        {/* Light overlay tuned for readability while soldier stays foremost */}
        <div className="absolute inset-0 bg-black/06 transition-colors duration-300 ease-out group-hover:bg-black/04 pointer-events-none" />
        
        {/* Subtle blood splatter overlay */}
        <div className="absolute inset-0 blood-splatter opacity-15 pointer-events-none" />
        
        {/* Blood drips from top */}
        <div className="absolute inset-0 blood-drips opacity-20 pointer-events-none" />
        
        {/* Subtle bullet holes */}
        <div className="absolute inset-0 bullet-holes opacity-20 pointer-events-none" />
        
        {/* Shell casings scattered */}
        <div className="absolute inset-0 shell-casings opacity-15 pointer-events-none" />
        
        {/* Combat grid overlay */}
        <div className="absolute inset-0 combat-grid opacity-10 pointer-events-none" />
        
        {/* Light smoke overlay */}
        <div className="absolute inset-0 smoke-overlay opacity-20 pointer-events-none" />
        
        {/* Subtle shrapnel debris */}
        <div className="absolute inset-0 shrapnel-debris opacity-20 pointer-events-none" />
        
        {/* Dust particles */}
        <div className="absolute inset-0 dust-particles opacity-15 pointer-events-none" />
        
        {/* Burn marks */}
        <div className="absolute inset-0 burn-marks opacity-15 pointer-events-none" />

        {/* Red Lightning Strikes - Multiple positions */}
        <div className="absolute top-0 left-1/4 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '0s' }} />
        <div className="absolute top-0 right-1/3 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '2s' }} />
        <div className="absolute top-0 left-2/3 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '4s' }} />
        <div className="absolute top-0 right-1/4 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-0 left-1/2 w-1 h-full red-lightning opacity-0" style={{ animationDelay: '3.5s' }} />

        {/* Story Button and User Info */}
        <div className="absolute right-10 top-20 z-50 flex flex-col gap-3 items-end pointer-events-auto">
          {username && (
            <div className="flex items-center gap-3 bg-black/85 backdrop-blur-sm px-5 py-3 border border-[#FF6B00]/60 pointer-events-auto">
              <span className="text-white text-sm font-semibold tracking-wide">{username}</span>
              {role === 'admin' && (
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={() => {
                    navigate('/admin');
                  }}
                  className="pointer-events-auto cursor-pointer"
                >
                  Commander Panel
                </Button>
              )}
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => {
                  logout();
                }}
                className="pointer-events-auto cursor-pointer bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          )}
          <Button 
            onClick={() => setShowStory(!showStory)}
            className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-[#FF6B00] pointer-events-auto cursor-pointer"
          >
            {showStory ? '✕ CLOSE STORY' : '📁 MISSION BRIEF'}
          </Button>
        </div>

        {/* Running Subtitle Story Narration - Now Video Player */}
        {showStory && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 p-4">
            <div className="bg-black/95 backdrop-blur-sm rounded-lg border-2 border-[#FF6B00] shadow-2xl" style={{ width: '400px' }}>
              <div className="relative bg-black rounded aspect-video">
                <video
                  controls
                  autoPlay
                  className="w-full h-full rounded"
                  style={{ aspectRatio: '4/3' }}
                >
                  <source src="/play.MP4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-white text-center text-xs mt-2 font-bold py-2">
                ⚡ MISSION BRIEFING VIDEO
              </p>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div className="container relative z-20 mx-auto px-4 py-20 text-center flex flex-col justify-center min-h-[600px]">
          {/* Badge removed per request */}

          {/* Center logo removed per request */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none neon-orange-text" style={{ lineHeight: '1.1' }}>
            I'M GOING INN
          </h2>

          {/* Front paragraph removed; background text layer now shows this copy behind soldier */}

          <div className="flex justify-center items-center">
            {username ? (
              <a href="#missions">
                <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-10 py-7 text-lg font-bold uppercase tracking-wider battle-damage-shadow border-2 border-[#FF6B00] damaged-armor bullet-holes">
                  <span className="distressed-text">Start Missions</span>
                </Button>
              </a>
            ) : (
              <Link to="/">
                <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-10 py-7 text-lg font-bold uppercase tracking-wider battle-damage-shadow border-2 border-[#FF6B00] damaged-armor bullet-holes">
                  <span className="distressed-text">Start Missions</span>
                </Button>
              </Link>
            )}
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
            OPERATIONAL ADVANTAGES
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

      {/* Missions Section - Only visible when logged in as participant */}
      {username && role === 'participant' && (
        <section id="missions" className="py-20 bg-gradient-to-br from-muted via-background to-card relative overflow-hidden">
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
            style={{
              backgroundImage: 'url(https://miaoda-conversation-file.s3cdn.medo.dev/user-88xff9huyhog/conv-8cxv3mixab5s/20251220/file-8cywq1b8e5uo.jpg)',
              filter: 'grayscale(50%) contrast(1.4) brightness(0.6)',
            }}
          />
          
          <div className="absolute inset-0 bg-black/85" />
          <div className="absolute inset-0 combat-grid opacity-35" />
          <div className="absolute inset-0 smoke-overlay" />
          <div className="absolute inset-0 blood-splatter opacity-20" />
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl xl:text-5xl font-bold mb-4 text-[#FF6B00]">
                TACTICAL MISSION: 10 SCENARIOS
              </h2>
              <p className="text-lg text-foreground/80">
                Respond to each prompt. Feedback appears instantly after submission.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {[
                { key: 'problem-1', num: 1, title: 'Problem 1: Escape Route Pattern', desc: 'Pattern: 3km, 7km, 11km, 15km, 19km → Identify the next three safehouses.' },
                { key: 'problem-2', num: 2, title: 'Problem 2: Minefield Navigation', desc: 'Grid 10-50. Only indivisible numbers are safe. List all secure zones.' },
                { key: 'problem-3', num: 3, title: 'Problem 3: Intercepted Transmission', desc: 'Encrypted: "GNINNIOG M\'I". Decode the intent.' },
                { key: 'problem-4', num: 4, title: 'Problem 4: The Infiltrator', desc: 'Sequence: 2, 4, 5, 6, 4, 8, 9. Which ID repeats?' },
                { key: 'problem-5', num: 5, title: 'Problem 5: Weapon Arsenal', desc: 'Codes: 64, 34, 25, 12, 22, 11, 90. Sort by lowest threat level.' },
                { key: 'problem-6', num: 6, title: 'Problem 6: Formation Protocol', desc: 'Can 16 form a perfect square formation? What about 15? Provide verification.' },
                { key: 'problem-7', num: 7, title: 'Problem 7: High-Priority Target', desc: 'Zones: A=3, B=7, C=2, D=9, E=1, F=6. Identify the critical zone.' },
                { key: 'problem-8', num: 8, title: 'Problem 8: Coordinate Decoder', desc: 'Binary 1101. Convert to standard format.' },
                { key: 'problem-9', num: 9, title: 'Problem 9: Security Sequence', desc: 'Sequence: 0, 1, 1, 2, 3, 5, 8, ?. Determine the next value and rule.' },
                { key: 'problem-10', num: 10, title: 'Problem 10: Vault Access Code', desc: 'Words: RADAR, MISSION. Which are valid access codes? Define verification.' },
              ].map((problem) => (
                <div
                  key={problem.key}
                  className={`relative overflow-hidden border border-[#FF6B00]/40 bg-black/50 backdrop-blur-sm px-6 py-5 transition-transform duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/80 ${answerAnimate[problem.key] ? 'answer-animate' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-semibold text-white tracking-wide">{problem.title}</div>
                    <span className="text-xs text-black px-3 py-1 rounded bg-[#FF6B00] font-semibold">Q{problem.num}/10</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                    {problem.desc}
                  </p>

                  {!hasSubmitted || !submissionFeedback?.[problem.key] ? (
                    <div className="space-y-3">
                      <Textarea 
                        value={answers[problem.key] || ''} 
                        onChange={(e) => setAnswers(prev => ({ ...prev, [problem.key]: e.target.value }))}
                        placeholder="Type your analysis and answer..."
                        className="min-h-24 border border-[#FF6B00]/40 bg-black/40 text-base p-3 focus:border-[#FF6B00]/80"
                      />
                      <Button 
                        onClick={() => {
                          const validation = validateAnswers({ [problem.key]: answers[problem.key] || '' });
                          setSubmissionFeedback(prev => ({ ...prev, [problem.key]: validation.feedback[problem.key] }));
                          setHasSubmitted(true);
                          setAnswerAnimate(prev => ({ ...prev, [problem.key]: true }));
                          setTimeout(() => setAnswerAnimate(prev => ({ ...prev, [problem.key]: false })), 900);
                        }}
                        disabled={!answers[problem.key]?.trim()}
                        className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold py-3 text-base"
                      >
                        Submit Answer {problem.num}
                      </Button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded border ${submissionFeedback[problem.key]?.correct ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10'} answer-animate`}>
                      <div className="flex items-center gap-3 mb-2">
                        {submissionFeedback[problem.key]?.correct ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-base font-semibold text-green-300">Correct</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <span className="text-base font-semibold text-red-300">Adjust and retry</span>
                          </>
                        )}
                      </div>
                      <p className={`text-sm ${submissionFeedback[problem.key]?.correct ? 'text-green-200' : 'text-red-200'}`}>
                        {submissionFeedback[problem.key]?.message}
                      </p>

                      <Button 
                        onClick={() => {
                          const newFeedback = { ...submissionFeedback };
                          delete newFeedback[problem.key];
                          setSubmissionFeedback(newFeedback);
                          setAnswerAnimate(prev => ({ ...prev, [problem.key]: false }));
                        }}
                        className="mt-3 w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90"
                      >
                        Revise Answer
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Only visible when not logged in */}
      {!username && (
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
              <Link to="/">
                <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-12 py-7 text-xl font-bold uppercase tracking-wider battle-damage-shadow border-2 border-[#FF6B00] damaged-armor bullet-holes">
                  <span className="distressed-text">⚔ Enter War Zone</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
