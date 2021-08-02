export type UserType = {
  id: string;
  name: string;
  avatarUrl: string;
  accountId: string;
  enabledQinMemo: boolean;
};

export const isUserType = (data: any): data is UserType => {
  return data.id !== undefined;
};
