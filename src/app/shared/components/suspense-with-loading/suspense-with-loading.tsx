import { PropsWithChildren, Suspense } from "react";
import { Spinner } from "../spinner/spinner";

export function SuspenseWithSpinner({ children }: PropsWithChildren<{}>) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
