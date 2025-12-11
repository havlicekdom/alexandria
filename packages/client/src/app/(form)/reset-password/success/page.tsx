import SuccessMessage from "components/common/SuccessMessage";
import routes from "constants/routes";
import Link from "next/link";

export default function ResetPasswordSuccess() {
  return (
    <SuccessMessage>
        Password reset successfully! You can now use your new password to log back in
        { ' ' }
        <Link href={routes.login}>here</Link>
        .
    </SuccessMessage>
  );
}
