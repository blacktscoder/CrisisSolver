import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useSharedQuery } from "@app/graphql";

// GraphQL Mutation
const CREATE_ALLOCATION = gql`
  mutation CreateAllocation($input: CreateAllocationInput!) {
    createAllocation(input: $input) {
      allocation {
        id
        resourceId
        requestId
        allocatedQuantity
        status
      }
    }
  }
`;

const CreateAllocationForm = () => {
  const query = useSharedQuery();

  const [createAllocation, { loading }] = useMutation(CREATE_ALLOCATION);

  const onFinish = async (values: any) => {
    try {
      const { data } = await createAllocation({
        variables: {
          input: {
            allocation: {
              resourceId: values.resourceId,
              requestId: values.requestId,
              allocatedQuantity: values.allocatedQuantity,
              status: values.status,
            },
          },
        },
      });
      message.success("Allocation created successfully!");
      console.log(data.createAllocation.allocation);
    } catch (error) {
      message.error("Failed to create allocation");
      console.error(error);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Form.Item
        label="Resource ID"
        name="resourceId"
        rules={[{ required: true, message: "Please enter a resource ID" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Request ID"
        name="requestId"
        rules={[{ required: true, message: "Please enter a request ID" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Allocated Quantity"
        name="allocatedQuantity"
        rules={[
          { required: true, message: "Please enter an allocated quantity" },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select a status" }]}
      >
        <Select>
          <Select.Option value="in_progress">In Progress</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="canceled">canceled</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Allocation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAllocationForm;
