export type Objective = {
  id: string;
  completed: boolean;
  createdAt: string;
  endingDate: string;
  lastPhotoDate: string | null;
  notificationTime: string;
  notifications: boolean;
  principal: boolean;
  startingDate: string;
  title: string;
  totalDays: number;
  files: any[];
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
