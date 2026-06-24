export interface TechMeta {
  color: string;
  abbr: string;
}

export interface SkillGroupData {
  num: string;
  name: string;
  accent: string;
  glow: string;
  items: readonly string[];
}

export interface SkillGroupProps extends SkillGroupData {}

export interface SkillTagProps {
  label: string;
}
