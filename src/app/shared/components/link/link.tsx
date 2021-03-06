import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

export function Link(props: LinkProps) {
  return (
    <ReactRouterLink
      style={{ textDecoration: "none", color: "inherit" }}
      {...props}
    />
  );
}
