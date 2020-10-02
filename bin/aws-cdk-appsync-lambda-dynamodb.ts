#!/usr/bin/env node
require("dotenv").config();

import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { DynamoDBStack, LambdaStack, AppSyncStack } from "./../lib";

/**
 * AWS Account / Region Definition
 */
const {
  PREFIX: prefix = "[STACK PREFIX NAME]",
  STAGE: stage = "[DEPLOYMENT STAGE]",
  CDK_ACCOUNT: accountId = "[AWS ACCOUNT ID]",
  CDK_REGION: region = "ap-southeast-1",
} = process.env;

/**
 * AWS defulat ENV config Definition
 */
const env = {
  account: accountId,
  region: region,
};

const app = new cdk.App();

/**
 * Define a DynomaDB Stack
 */
const dynamodb = new DynamoDBStack(app, `${prefix}-${stage}-DynamoDBStack`, {
  env,
  prefix,
  stage,
});

/**
 * Define a Lambda Stack
 */
const lambda = new LambdaStack(app, `${prefix}-${stage}-LambdaStack`, {
  env,
  prefix,
  stage,
});

/**
 * Create AppSync Stack
 */
new AppSyncStack(app, `${prefix}-${stage}-AppSyncStack`, {
  env,
  prefix,
  stage,
  table: dynamodb.table,
  lambdaFnDS: lambda.lambdaFn,
});

app.synth();
