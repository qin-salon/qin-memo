export type UserType = {
  id: string;
  userName: string;
  accountName: string;
  avatarUrl: string;
  enabledQinMemo: boolean;
};

export const isUserType = (data: any): data is UserType => {
  return data.id !== undefined;
};
