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
  files: any[];
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
}
