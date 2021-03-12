export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type UserPutRequest = User | Pick<User, "id" | "name"> | Pick<User, "id" | "avatarUrl">;

export const hasName = (user: UserPutRequest): user is User | Pick<User, "id" | "name"> => {
  return "name" in user;
};

export const hasAvatarUrl = (user: UserPutRequest): user is User | Pick<User, "id" | "name"> => {
  return "avatarUrl" in user;
};

export const EXAMPLE_USER_01: User = {
  id: "qinta",
  name: "秦太",
  avatarUrl: "/mocks/avatar01.jpg",
};

export const EXAMPLE_USER_02: User = {
  id: "qinko",
  name: "秦子",
  avatarUrl: "/mocks/avatar02.jpg",
};
