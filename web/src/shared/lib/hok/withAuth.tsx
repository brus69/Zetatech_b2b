/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUnit } from "effector-react";
import { useRouter } from "next/router";

import { NProgress } from "../../ui/NProgress";
import { NextPageWithLayout } from "@/pages/_app";
import { $user, $fetchInitialUserFinished, fetchInitialUserFx } from "@/api";

export const withAuth = <T,>(Component: NextPageWithLayout<T>) => {
  const Auth = (props: any) => {
    const router = useRouter();

    const { user, loading, isFinished } = useUnit({
      user: $user,
      isFinished: $fetchInitialUserFinished,
      loading: fetchInitialUserFx.pending,
    });

    if (loading || !isFinished) return <NProgress loading />;

    if (!user) {
      router.replace("/");
      return null;
    }

    return <Component {...props} />;
  };

  Auth.Layout = Component.Layout;

  return Auth;
};
