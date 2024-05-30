import { RaceDetails } from "./components/RaceDetails";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/race-details',
    element: <RaceDetails />
  }
];

export default AppRoutes;
