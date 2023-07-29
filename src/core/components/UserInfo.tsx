import getTodos from "@/features/todos/queries/getTodos";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useQuery } from "@blitzjs/rpc";
import { List, Loader, Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { Suspense } from "react";

const Todos = () => {
  const [todos] = useQuery(getTodos, {
    search: "",
  });

  return (
    <List>
      {todos.map((todo) => (
        <List.Item key={todo.id}>
          <Text>{todo.title}</Text>
        </List.Item>
      ))}
    </List>
  );
};

const UserInfo = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  return (
    <>
      <Vertical>
        <Suspense fallback={<Loader />}>
          <Todos />
        </Suspense>
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Vertical>
    </>
  );
};
export default UserInfo;
