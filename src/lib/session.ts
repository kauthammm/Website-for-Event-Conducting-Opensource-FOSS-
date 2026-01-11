type Role = 'admin' | 'participant';

export type ParticipantRecord = {
  username: string; // e.g., test1 or john@fossops
  name?: string; // display name
  rollNumber?: string; // 16-digit
  team?: string;
  answers?: Array<{ taskId: string; mission: number; answer: string; submittedAt: string }>;
};

export type Session = {
  username: string;
  role: Role;
};

const LS_SESSION_KEY = 'session';
const LS_PARTICIPANTS_KEY = 'participants';
const LS_TEAMCFG_KEY = 'teamConfigs';

export type TeamConfig = {
  team: string;
  allowedMission: number; // 1..4
};

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(LS_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session | null) {
  if (!session) {
    localStorage.removeItem(LS_SESSION_KEY);
  } else {
    localStorage.setItem(LS_SESSION_KEY, JSON.stringify(session));
  }
}

export function getParticipants(): ParticipantRecord[] {
  try {
    const raw = localStorage.getItem(LS_PARTICIPANTS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveParticipants(list: ParticipantRecord[]) {
  localStorage.setItem(LS_PARTICIPANTS_KEY, JSON.stringify(list));
}

export function upsertParticipant(p: ParticipantRecord) {
  const list = getParticipants();
  const idx = list.findIndex((x) => x.username === p.username);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...p };
  } else {
    list.push({ ...p, answers: p.answers ?? [] });
  }
  saveParticipants(list);
}

export function appendAnswer(username: string, taskId: string, mission: number, answer: string) {
  const list = getParticipants();
  const idx = list.findIndex((x) => x.username === username);
  if (idx < 0) return;
  const entry = list[idx];
  const answers = entry.answers ?? [];
  answers.push({ taskId, mission, answer, submittedAt: new Date().toISOString() });
  entry.answers = answers;
  list[idx] = entry;
  saveParticipants(list);
}

export function getTeamConfigs(): TeamConfig[] {
  try {
    const raw = localStorage.getItem(LS_TEAMCFG_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function setTeamConfigs(cfgs: TeamConfig[]) {
  localStorage.setItem(LS_TEAMCFG_KEY, JSON.stringify(cfgs));
}

export function getTeamAllowedMission(team?: string): number {
  if (!team) return 1;
  const cfg = getTeamConfigs().find((c) => c.team === team);
  return cfg?.allowedMission ?? 1;
}

export function setTeamAllowedMission(team: string, mission: number) {
  const cfgs = getTeamConfigs();
  const idx = cfgs.findIndex((c) => c.team === team);
  if (idx >= 0) {
    cfgs[idx] = { ...cfgs[idx], allowedMission: mission };
  } else {
    cfgs.push({ team, allowedMission: mission });
  }
  setTeamConfigs(cfgs);
}
export function deleteParticipant(username: string) {
  const list = getParticipants();
  const filtered = list.filter((p) => p.username !== username);
  saveParticipants(filtered);
}

export function deleteTeam(team: string) {
  const list = getParticipants();
  const filtered = list.filter((p) => p.team !== team);
  saveParticipants(filtered);
  
  // Also remove team config
  const cfgs = getTeamConfigs();
  const filteredCfgs = cfgs.filter((c) => c.team !== team);
  setTeamConfigs(filteredCfgs);
}
// Seed demo accounts test1/test2 for convenience
export function ensureDemoParticipants() {
  const list = getParticipants();
  const seeds: ParticipantRecord[] = [
    { username: 'test1', name: 'Test User 1', rollNumber: '0000000000000001', team: 'Bikers', answers: [] },
    { username: 'test2', name: 'Test User 2', rollNumber: '0000000000000002', team: 'Bikers', answers: [] },
  ];
  let changed = false;
  seeds.forEach((s) => {
    if (!list.some((x) => x.username === s.username)) {
      list.push(s);
      changed = true;
    }
  });
  if (changed) saveParticipants(list);
  // default team allowed mission = 1
  setTeamAllowedMission('Bikers', 1);
}

// Answer validation function
export function validateAnswers(answers: Record<string, string>): { 
  isCorrect: boolean; 
  feedback: Record<string, { correct: boolean; message: string }>;
} {
  const feedback: Record<string, { correct: boolean; message: string }> = {};
  let allCorrect = true;

  // Problem 1: The Escape Route Pattern - Next 3 should be 23km, 27km, 31km
  const ans1 = answers['problem-1']?.toLowerCase().trim() || '';
  feedback['problem-1'] = {
    correct: ans1.includes('23') && ans1.includes('27') && ans1.includes('31'),
    message: ans1.includes('23') && ans1.includes('27') && ans1.includes('31') 
      ? '✅ Correct! Pattern identified: +4km each time' 
      : '❌ Incorrect. Pattern: 3, 7, 11, 15, 19... (+4 each time) → Next: 23, 27, 31'
  };
  if (!feedback['problem-1'].correct) allCorrect = false;

  // Problem 2: The Minefield Navigation - Prime numbers from 10-50
  const ans2 = answers['problem-2']?.toLowerCase().trim() || '';
  const primes = ['11', '13', '17', '19', '23', '29', '31', '37', '41', '43', '47'];
  const hasPrimes = primes.some(p => ans2.includes(p));
  feedback['problem-2'] = {
    correct: hasPrimes && ans2.length > 20,
    message: hasPrimes && ans2.length > 20
      ? '✅ Correct! Prime numbers are indivisible (safe zones)'
      : '❌ Incorrect. "Indivisible" means prime numbers: 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47'
  };
  if (!feedback['problem-2'].correct) allCorrect = false;

  // Problem 3: The Intercepted Transmission - Reverse of "GNINNIOG M'I" = "I'M GOING IN"
  const ans3 = answers['problem-3']?.toUpperCase().trim() || '';
  feedback['problem-3'] = {
    correct: ans3.includes("I'M GOING") || ans3.includes("IM GOING"),
    message: ans3.includes("I'M GOING") || ans3.includes("IM GOING")
      ? '✅ Correct! Reversed message: "I\'M GOING IN"'
      : '❌ Incorrect. Reverse "GNINNIOG M\'I" → "I\'M GOING IN"'
  };
  if (!feedback['problem-3'].correct) allCorrect = false;

  // Problem 4: The Infiltrator - Duplicate ID is 4
  const ans4 = answers['problem-4']?.trim() || '';
  feedback['problem-4'] = {
    correct: ans4.includes('4'),
    message: ans4.includes('4')
      ? '✅ Correct! ID 4 appears twice in the surveillance log'
      : '❌ Incorrect. Look for the duplicate: [2, 4, 5, 6, 4, 8, 9] → ID 4 appears twice'
  };
  if (!feedback['problem-4'].correct) allCorrect = false;

  // Problem 5: The Weapon Arsenal - Sorted: 11, 12, 22, 25, 34, 64, 90
  const ans5 = answers['problem-5']?.toLowerCase().trim() || '';
  feedback['problem-5'] = {
    correct: ans5.includes('11') && ans5.includes('90') && (ans5.indexOf('11') < ans5.indexOf('90')),
    message: ans5.includes('11') && ans5.includes('90') && (ans5.indexOf('11') < ans5.indexOf('90'))
      ? '✅ Correct! Sorted order: 11, 12, 22, 25, 34, 64, 90'
      : '❌ Incorrect. Sort from lowest to highest threat: 11, 12, 22, 25, 34, 64, 90'
  };
  if (!feedback['problem-5'].correct) allCorrect = false;

  // Problem 6: The Formation Protocol - 16 is perfect square (4x4), 15 is not
  const ans6 = answers['problem-6']?.toLowerCase().trim() || '';
  feedback['problem-6'] = {
    correct: ans6.includes('16') && ans6.includes('yes') && ans6.includes('15') && ans6.includes('no'),
    message: ans6.includes('16') && ans6.includes('yes') && ans6.includes('15') && ans6.includes('no')
      ? '✅ Correct! 16 = 4×4 (yes), 15 cannot form perfect square (no)'
      : '❌ Incorrect. 16 operatives can form 4×4 square (YES). 15 cannot (NO). √16=4, √15≈3.87'
  };
  if (!feedback['problem-6'].correct) allCorrect = false;

  // Problem 7: The High-Priority Target - Zone D (Level 9) is highest
  const ans7 = answers['problem-7']?.toUpperCase().trim() || '';
  feedback['problem-7'] = {
    correct: ans7.includes('ZONE D') || ans7.includes('D'),
    message: ans7.includes('ZONE D') || ans7.includes('D')
      ? '✅ Correct! Zone D has the highest threat level (9)'
      : '❌ Incorrect. Zone D (Level 9) > Zone B (7) > Zone F (6) > Zone A (3) > Zone C (2) > Zone E (1)'
  };
  if (!feedback['problem-7'].correct) allCorrect = false;

  // Problem 8: The Coordinate Decoder - 1101 binary = 13 decimal
  const ans8 = answers['problem-8']?.trim() || '';
  feedback['problem-8'] = {
    correct: ans8.includes('13') || ans8.includes('1101'),
    message: ans8.includes('13') || ans8.includes('1101')
      ? '✅ Correct! Binary 1101 = 13 in decimal (8+4+0+1)'
      : '❌ Incorrect. Binary to decimal: 1101 = 1×8 + 1×4 + 0×2 + 1×1 = 13'
  };
  if (!feedback['problem-8'].correct) allCorrect = false;

  // Problem 9: The Security Sequence - Fibonacci, next is 13
  const ans9 = answers['problem-9']?.trim() || '';
  feedback['problem-9'] = {
    correct: ans9.includes('13'),
    message: ans9.includes('13')
      ? '✅ Correct! Fibonacci sequence: 0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13'
      : '❌ Incorrect. Each number = sum of previous two. 5+8 = 13. Fibonacci sequence!'
  };
  if (!feedback['problem-9'].correct) allCorrect = false;

  // Problem 10: The Vault Access Code - RADAR is palindrome, MISSION is not
  const ans10 = answers['problem-10']?.toUpperCase().trim() || '';
  feedback['problem-10'] = {
    correct: ans10.includes('RADAR') && ans10.includes('YES') && ans10.includes('MISSION') && ans10.includes('NO'),
    message: ans10.includes('RADAR') && ans10.includes('YES') && ans10.includes('MISSION') && ans10.includes('NO')
      ? '✅ Correct! RADAR is palindrome (access=YES). MISSION is not (access=NO)'
      : '❌ Incorrect. RADAR reads same forward/backward (YES). MISSION does not (NO). Check palindromes!'
  };
  if (!feedback['problem-10'].correct) allCorrect = false;

  return { isCorrect: allCorrect, feedback };
}
