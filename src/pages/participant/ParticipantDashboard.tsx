import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { appendAnswer, getSession, setSession, getParticipants } from '@/lib/session';
import { useNavigate } from 'react-router-dom';

type Task = { id: string; title: string; prompt: string };

const TASKS: Task[] = [
  { id: 'task-1', title: 'Network Defense', prompt: 'Describe steps to secure a web app from SQL injection.' },
  { id: 'task-2', title: 'Forensics', prompt: 'Explain how to analyze a suspicious binary safely.' },
  { id: 'task-3', title: 'Reverse Engineering', prompt: 'Outline how to identify obfuscated code sections.' },
];

export default function ParticipantDashboard() {
  const [answer, setAnswer] = useState('');
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const [allowed, setAllowed] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== 'participant') {
      navigate('/', { replace: true });
      return;
    }
    const p = getParticipants().find((x) => x.username === s.username);
    setAllowed(!!p?.allowed);
  }, [navigate]);

  const submit = () => {
    const s = getSession();
    if (!s) return;
    if (!answer.trim()) return;
    appendAnswer(s.username, taskId, answer.trim());
    setAnswer('');
  };

  const logout = () => {
    setSession(null);
    navigate('/');
  };

  const currentTask = TASKS.find((t) => t.id === taskId)!;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Soldier Area</h1>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>

        <Card className="border-2 border-primary mb-6">
          <CardHeader>
            <CardTitle>Level Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={allowed ? 'text-green-500' : 'text-red-500'}>
              {allowed ? 'You are allowed to proceed to next level.' : 'Awaiting commander approval.'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {TASKS.map((t) => (
                <Button key={t.id} variant={taskId === t.id ? 'default' : 'secondary'} onClick={() => setTaskId(t.id)}>
                  {t.title}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{currentTask.prompt}</div>
              <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Your answer…" className="min-h-32" />
              <Button onClick={submit}>Submit Answer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
