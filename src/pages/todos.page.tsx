import { BlitzPage } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getTodos from "@/features/todos/queries/getTodos";
import { Button, Checkbox, Input, List, Text } from "@mantine/core";
import addTodo from "@/features/todos/mutations/addTodo";
import { Horizontal, Vertical } from "mantine-layout-components";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import toggleTodo from "@/features/todos/mutations/toggleTodo";
import cleanCompleted from "@/features/todos/mutations/cleanCompleted";
import { ReactFC } from "types";
import { PromiseReturnType } from "blitz";
import { useForm, zodResolver } from "@mantine/form";
import { TodoFormType, TodoInput } from "@/features/todos/schema";

type TodosType = PromiseReturnType<typeof getTodos>;
type TodoType = TodosType[0];

const Todo: ReactFC<{
  todo: TodoType;
}> = ({ todo }) => {
  const [$toggleTodo, { isLoading }] = useMutation(toggleTodo);
  return (
    <Horizontal>
      <Checkbox
        disabled={isLoading}
        checked={todo.done}
        onChange={async () => {
          await $toggleTodo({ id: todo.id });
        }}
      />
      <Text>{todo.title}</Text>
    </Horizontal>
  );
};

const Todos = () => {
  const user = useCurrentUser();
  const [todos] = useQuery(getTodos, {});
  const [$addTodo, { isLoading }] = useMutation(addTodo);
  const [$cleanCompleted] = useMutation(cleanCompleted);

  const form = useForm<TodoFormType>({
    validate: zodResolver(TodoInput),
  });

  const onSubmit = async (values: TodoFormType) => {
    await $addTodo(values);
  };

  return (
    <Vertical>
      {user && <Text>Hello {user.name}, here are your todos: </Text>}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Input {...form.getInputProps("title")} placeholder="Enter todo title" />
        <Button loading={isLoading} type="submit">
          Create a Todo
        </Button>
      </form>
      <Button onClick={async () => $cleanCompleted({})}>Clean completed</Button>
      <List>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </List>
    </Vertical>
  );
};

export const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Todos />
    </Layout>
  );
};

export default TodosPage;
