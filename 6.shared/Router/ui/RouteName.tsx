import { Route } from "../model";

interface Props {
  route: Route;
}

function RouteName({ route }: Props) {
  return !route.hideTitle ? (
    <h1 className="text-3xl font-semibold text-center my-8">{route.name}</h1>
  ) : null;
}

RouteName.displayName = "RouteName";

export default RouteName;
