export type IRepo = {
  id: number;
  name: string;
  stars: number;
};

export type IResponse = {
  message?: string;
  payload: IRepo[];
};
