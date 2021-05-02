import type { NextPage } from "next";
import { ProfileForm } from "src/components/shared/ProfileForm";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Settings: NextPage = () => {
  return <ProfileForm user={user} />;
};

export default Settings;
