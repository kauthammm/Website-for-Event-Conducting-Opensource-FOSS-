import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getParticipants, getSession, setSession, getTeamAllowedMission, setTeamAllowedMission, validateAnswers, deleteParticipant, deleteTeam } from '@/lib/session';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, User, Mail, Hash, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [participants, setParticipants] = useState(getParticipants());
  const [expandedParticipant, setExpandedParticipant] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const refresh = () => setParticipants(getParticipants());

  const setTeamMission = (team: string, mission: number) => {
    setTeamAllowedMission(team, mission);
    refresh();
  };

  const logout = () => {
    setSession(null);
    navigate('/');
  };

  // Export data as JSON file for offline storage
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ participants }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Parse participant answers to extract individual problem responses
  const parseAnswers = (participant: any) => {
    if (!participant.answers || participant.answers.length === 0) return {};
    
    const latestAnswer = participant.answers[participant.answers.length - 1];
    const answerText = latestAnswer.answer;
    
    // Parse the answer string (format: "1: answer1\n2: answer2\n...")
    const answerMap: Record<string, string> = {};
    const lines = answerText.split('\n');
    lines.forEach((line: string) => {
      const match = line.match(/^(\d+):\s*(.+)$/);
      if (match) {
        answerMap[match[1]] = match[2].trim();
      }
    });
    
    return answerMap;
  };

  const toggleParticipantDetails = (username: string) => {
    setExpandedParticipant(expandedParticipant === username ? null : username);
  };

  const handleDeleteParticipant = (username: string) => {
    if (window.confirm(`Are you sure you want to delete participant "${username}"?`)) {
      deleteParticipant(username);
      refresh();
    }
  };

  const handleDeleteTeam = (team: string) => {
    if (window.confirm(`Are you sure you want to delete team "${team}" and all its members?`)) {
      deleteTeam(team);
      refresh();
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Commander Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={exportData}>Export Data</Button>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>

        {/* Group participants by team */}
        {Object.entries(participants.reduce<Record<string, typeof participants>>((acc, p) => {
          const team = p.team || 'Unassigned';
          acc[team] = acc[team] || [];
          acc[team].push(p);
          return acc;
        }, {})).map(([team, members]) => (
          <Card key={team} className="border-2 border-primary mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>Team: {team} ({members.length} members)</CardTitle>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDeleteTeam(team)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Team
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Allowed up to Mission {getTeamAllowedMission(team)}</span>
                <div className="flex gap-1">
                  {[1,2,3,4].map((m) => (
                    <Button key={m} variant={getTeamAllowedMission(team) === m ? 'default' : 'secondary'} onClick={() => setTeamMission(team, m)}>
                      {m}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((p) => {
                  const participantAnswers = parseAnswers(p);
                  const hasAnswers = Object.keys(participantAnswers).length > 0;
                  const validation = hasAnswers ? validateAnswers(participantAnswers) : null;
                  const isExpanded = expandedParticipant === p.username;
                  
                  return (
                    <Card key={p.username} className="border border-muted">
                      <CardHeader className="cursor-pointer hover:bg-muted/50" onClick={() => toggleParticipantDetails(p.username)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{p.name || p.username}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {p.username}
                                </span>
                                {p.rollNumber && (
                                  <span className="flex items-center gap-1">
                                    <Hash className="h-3 w-3" />
                                    {p.rollNumber}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {hasAnswers && validation && (
                              <div className="text-sm font-medium px-3 py-1 bg-primary/10 rounded-full">
                                Score: {validation.correctCount}/10
                              </div>
                            )}
                            <Button variant="outline" size="sm">
                              {isExpanded ? 'Hide Details' : 'View Details'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDeleteParticipant(p.username)}
                              className="gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      {isExpanded && (
                        <CardContent className="pt-4">
                          {!hasAnswers ? (
                            <div className="text-center py-8 text-muted-foreground">
                              No submissions yet
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-4">Problem Submissions</h4>
                              {[1,2,3,4,5,6,7,8,9,10].map((problemNum) => {
                                const answer = participantAnswers[problemNum.toString()];
                                const feedback = validation?.feedback[problemNum.toString()];
                                
                                return (
                                  <div key={problemNum} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-semibold">Problem {problemNum}</h5>
                                      {feedback && (
                                        <div className={`flex items-center gap-2 text-sm font-medium ${feedback.correct ? 'text-green-600' : 'text-red-600'}`}>
                                          {feedback.correct ? (
                                            <>
                                              <CheckCircle className="h-4 w-4" />
                                              Correct
                                            </>
                                          ) : (
                                            <>
                                              <XCircle className="h-4 w-4" />
                                              Incorrect
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <div className="bg-muted/50 rounded p-3">
                                      <p className="text-sm font-mono">{answer || 'No answer'}</p>
                                    </div>
                                    {feedback && !feedback.correct && (
                                      <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                                        💡 {feedback.message}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              
                              {p.answers && p.answers[0] && (
                                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                                  Submitted: {new Date(p.answers[0].submittedAt).toLocaleString()}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
