import type { NextPage } from "next";
import { ProfileSetting } from "src/components/shared/ProfileSetting";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Settings: NextPage = () => {
  return <ProfileSetting user={user} />;
};

export default Settings;
