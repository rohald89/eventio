import React, { Suspense } from "react";
import { BlitzPage } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getTodos from "@/features/todos/queries/getTodos";
import { Button, Input, List, Loader, Text } from "@mantine/core";
import addTodo from "@/features/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";

const Todos = () => {
  const [todos] = useQuery(getTodos, {});

  const [title, setTitle] = React.useState("");

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Mutation successful",
        message: `created todo: ${todo.title}`,
      });
    },
  });

  return (
    <Vertical>
      <Input
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        placeholder="Enter todo title"
      />
      <Button
        onClick={async () =>
          await $addTodo({
            title,
          })
        }
      >
        Create a Todo
      </Button>
      <List>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            <Text>{todo.title}</Text>
          </List.Item>
        ))}
      </List>
    </Vertical>
  );
};

export const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Layout>
  );
};

export default TodosPage;
