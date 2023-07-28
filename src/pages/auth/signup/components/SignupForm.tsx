import { FORM_ERROR } from "src/core/components/Form";
import signup from "@/features/auth/mutations/signup";
import { useMutation } from "@blitzjs/rpc";
import { Vertical } from "mantine-layout-components";
import { useForm } from "@mantine/form";
import { Button, PasswordInput, TextInput, Title } from "@mantine/core";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);

  let onSubmit = async (values) => {
    try {
      await signupMutation(values);
      props.onSuccess?.();
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return { email: "This email is already being used" };
      } else {
        return { [FORM_ERROR]: error.toString() };
      }
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/i.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <Vertical>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name..."
          {...form.getInputProps("name")}
        />

        <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />

        <Button type="submit">Submit</Button>
      </form>
    </Vertical>
  );
};

export default SignupForm;
