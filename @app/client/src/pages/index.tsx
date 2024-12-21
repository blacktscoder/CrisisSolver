import { Button, Col, Divider, Row, Typography, Form } from "antd";
import * as React from "react";
const { Text, Title, Paragraph } = Typography;
import { SharedLayout } from "@app/components";
import { useSharedQuery } from "@app/graphql";
import { NextPage } from "next";

// Convenience helper
const Li = ({ children, ...props }: any) => (
  <li {...props}>
    <Typography>{children}</Typography>
  </li>
);

const Home: NextPage = () => {
  const query = useSharedQuery();
  return (
    <SharedLayout title="" query={query}>
      <Row justify="space-between" gutter={32}>
        <Col xs={24} sm={16}>
          <Title data-cy="homepage-header">Welcome to the CrisiSolver</Title>
          <Paragraph>
            This project can serve as a basis for your own project. We&apos;ve
            added many features that most projects require, but you&apos;re free
            to remove them or replace them with whatever you need.
          </Paragraph>

          <Title level={4}>Main Features</Title>
          <Paragraph>
            If the page hangs this is likely because the Next server was
            restarted. Please reload the page.
          </Paragraph>
          <Title level={4}>What we all about?</Title>
          <Paragraph>
            We use <code>graphile-migrate</code> in this project to manage
            database migrations; this allows you to change the database very
            rapidly by just editing the current migration file:{" "}
            <code>migrations/current.sql</code>. This file should be written in
            an idempotent manner so that it can be ran repeatedly without
            causing issues.
          </Paragraph>

          <Title level={4}>Realtime</Title>
          <Paragraph>
            We&apos;ve configured PostGraphile with{" "}
            <Text code>@graphile/pg-pubsub</Text> to enable realtime events from
            the DB; and Apollo is configured to consume them. For example, if
            you register with email/password you may notice the red dot at the
            top right indicating that you need to verify your email. If you
            verify your email in another tab (or even another browser) you
            should notice that this dot disappears. Realtime ✨🌈
          </Paragraph>
        </Col>
        <Col xs={24} sm={8}>
          <Title level={4}>Blog Post on Crisis Resolver</Title>
          <Paragraph>
            We use <code>graphile-migrate</code> in this project to manage
            database migrations; this allows you to change the database very
            rapidly by just editing the current migration file:{" "}
            <code>migrations/current.sql</code>. This file should be written in
            an idempotent manner so that it can be ran repeatedly without
            causing issues.
          </Paragraph>

          <Paragraph>Thank you! 🙏</Paragraph>
        </Col>
      </Row>
    </SharedLayout>
  );
};

export default Home;
