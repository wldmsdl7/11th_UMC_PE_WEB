export interface Cast {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  gender: number;
  popularity: number;
  cast_id?: number;
  order?: number;
}

export interface Crew {
  id: number;
  name: string;
  original_name: string;
  job: string;
  department: string;
  profile_path: string | null;
  gender: number;
  popularity: number;
  credit_id: string;
}

export interface Credit {
  id: number;
  cast: Cast[];
  crew: Crew[];
}