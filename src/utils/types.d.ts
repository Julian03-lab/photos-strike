export type IFile = {
  createdAt?: string;
  url?: string;
  empty?: boolean;
  isPlaceholder?: boolean;
  unlocked?: boolean;
  bigView?: boolean;
  id?: string;
};

export type Objective = {
  id: string;
  completed: boolean;
  createdAt: string;
  endingDate: string;
  lastPhotoDate: string | null;
  principal: boolean;
  startingDate: string;
  title: string;
  totalDays: number;
  files: IFile[];
  viewed?: boolean;
};

export type addObjectivesProps = {
  objective: string;
  startingDate: string;
  endingDate: string;
  notificationTime: string;
  // frecuency: number;
  completed?: boolean;
  notifications?: boolean;
};

export interface IUser {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  notificationTime?: string | null;
  points: number;
  gender?: string;
  birthday?: string;
  country?: string;
}

export type Option = {
  label: string;
  value: string;
  principal: boolean;
  finished: boolean;
};
