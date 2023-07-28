import { useMutation } from "@blitzjs/rpc";
import logout from "@/features/auth/mutations/logout";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import Link from "next/link";
import { Routes } from "@blitzjs/next";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()}>
          <strong>Login</strong>
        </Link>
      </>
    );
  }
};

export default UserInfo;
