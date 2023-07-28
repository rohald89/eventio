import { useStringParam } from "@/utils/utils";
import type { BlitzPage } from "@blitzjs/next";

const TeamMemberPage: BlitzPage = () => {
  const id = useStringParam("id");
  return <div>{id} is the best team member</div>;
};

export default TeamMemberPage;
