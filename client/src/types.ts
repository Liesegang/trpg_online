export interface Parameter {
  name: string;
  value: number;
}

export interface Status {
  name: string;
  value: number;
}
export interface Skill {
  name: string;
  value: number;
}

export interface Character {
  id: string;
  name: string;
  transform: string;
  parameter: Parameter[];
  status: Status[];
  skill: Skill[];
}
