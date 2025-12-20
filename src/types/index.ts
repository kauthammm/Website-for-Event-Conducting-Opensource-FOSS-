export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  team_name: string;
  skills: string;
  created_at: string;
}

export interface RegistrationInput {
  name: string;
  email: string;
  team_name: string;
  skills: string;
}
