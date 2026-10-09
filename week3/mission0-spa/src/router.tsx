import React, { useState } from "react";
import type { LinkProps } from "./types/LinkProps";
import type { RoutesProps } from "./types/RoutesProps";
import type { RouteProps } from "./types/RouteProps";

let setPathState: ((path: string) => void) | null = null;
window.addEventListener("popstate", () => {
  if (setPathState) {
    setPathState(window.location.pathname);
  }
});

/*
Function Components (함수형 Component)
: js 함수로 UI를 만드는 방식 
- React.FC 로 자료형 표기
*/

export const Routes: React.FC<RoutesProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // state 변경 함수 저장 (전역에서 사용 가능)
  setPathState = setCurrentPath;

  const routesArray = React.Children.toArray(children).filter(
    (child) => React.isValidElement<RouteProps>(child) && child.props.path
  ) as React.ReactElement<RouteProps>[];

  const route = routesArray.find((r) => r.props.path === currentPath);

  if (route) {
    const Component = route.props.component;
    return <Component />;
  }

  return null;
};

// Route 컴포넌트 (단순히 props를 전달)
export const Route: React.FC<RouteProps> = () => null;

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={to} onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </a>
  );
};