import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import TaskList  from "./components/TaskList";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
    {
        path: '/task-list',
        element: <TaskList />
    }
];

export default AppRoutes;
