import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useMemo, useState } from 'react';
import { appendAnswer, getParticipants, getSession, getTeamAllowedMission, setSession } from '@/lib/session';
import { useNavigate } from 'react-router-dom';

const MISSIONS = [
  { id: 'mission-1', title: 'Mission 1: Recon', prompt: 'Gather intel on potential vulnerabilities in a sample app.' },
  { id: 'mission-2', title: 'Mission 2: Defense', prompt: 'Design countermeasures for the top two risks you found.' },
  { id: 'mission-3', title: 'Mission 3: Response', prompt: 'Write an incident response plan for a data breach scenario.' },
  { id: 'mission-4', title: 'Mission 4: Postmortem', prompt: 'Summarize lessons learned and prevention steps.' },
];

export default function MissionsPage() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const [allowedUpToMission, setAllowedUpToMission] = useState(1);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== 'participant') {
      navigate('/', { replace: true });
      return;
    }
    setUsername(s.username);
    const p = getParticipants().find((x) => x.username === s.username);
    const allowed = getTeamAllowedMission(p?.team);
    setAllowedUpToMission(allowed);
    setActiveMissionIndex(Math.max(0, Math.min(allowed - 1, MISSIONS.length - 1)));
  }, [navigate]);

  const canSubmit = useMemo(() => activeMissionIndex + 1 <= allowedUpToMission, [activeMissionIndex, allowedUpToMission]);
  const mission = MISSIONS[activeMissionIndex];

  const submit = () => {
    const s = getSession();
    if (!s) return;
    if (!answer.trim()) return;
    appendAnswer(s.username, mission.id, activeMissionIndex + 1, answer.trim());
    setAnswer('');
  };

  const logout = () => { setSession(null); navigate('/'); };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Missions</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm">Signed in as <strong>{username}</strong></span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>

        <Card className="border-2 border-primary mb-6">
          <CardHeader>
            <CardTitle>Mission Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Commander has granted access up to <strong>Mission {allowedUpToMission}</strong>.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {MISSIONS.map((m, i) => (
            <Button key={m.id} variant={activeMissionIndex === i ? 'default' : 'secondary'} onClick={() => setActiveMissionIndex(i)} disabled={i + 1 > allowedUpToMission}>
              {m.title}
            </Button>
          ))}
        </div>

        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>{mission.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{mission.prompt}</div>
              <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Your answer…" className="min-h-32" />
              <Button onClick={submit} disabled={!canSubmit}>Submit</Button>
              {!canSubmit && (
                <div className="text-xs text-muted-foreground">Commander has not granted access to this mission yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
