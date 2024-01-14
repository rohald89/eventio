import React from 'react';
import { Vertical } from "mantine-layout-components";
import { Button, Select } from "@mantine/core";
import { EmailList } from "@/features/email/types";
import { useMutation } from "@blitzjs/rpc";
import sendBulkEmail from "@/features/email/mutations/sendBulkEmail";

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" },
];

export const AdminPageEmailTab = () => {
  const [list, setList] = React.useState<EmailList>(EmailList.Marketing)
  const [$sendBulkEmail] = useMutation(sendBulkEmail)
  return (
    <Vertical>
      <Select
        label="Choose email list"
        placeholder="Pick one"
        data={options}
        value={list}
        onChange={(value) => {
          setList(value as EmailList)
        }}
      />
      <Button onClick={() => {
        $sendBulkEmail({ list })
      }}>Send bulk Email</Button>
    </Vertical>
  );
}