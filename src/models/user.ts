import type { UserPutRequest, UserType } from "src/types/types";

export const hasName = (user: UserPutRequest): user is UserType | Pick<UserType, "id" | "name"> => {
  return "name" in user;
};

export const hasAvatarUrl = (user: UserPutRequest): user is UserType | Pick<UserType, "id" | "avatarUrl"> => {
  return "avatarUrl" in user;
};

export const EXAMPLE_USER_01: UserType = {
  id: "qinta",
  name: "秦太",
  avatarUrl: "/mocks/avatar01.jpg",
  accountId: "qinta",
  enabledQinMemo: true,
};

export const EXAMPLE_USER_02: UserType = {
  id: "qinko",
  name: "秦子",
  avatarUrl: "/mocks/avatar02.jpg",
  accountId: "qinko",
  enabledQinMemo: true,
};
