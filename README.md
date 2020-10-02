# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

---

# How to Run

1. Install the package && build the resource

   ```sh
   $ npm i && npm run build
   ```

2. List all Stack

   ```sh
   $ cdk list
   ```

   output:

   ```
   Appsync-Lambda-DDB-Dev-DynamoDBStack
   Appsync-Lambda-DDB-Dev-LambdaStack
   Appsync-Lambda-DDB-Dev-AppSyncStack
   ```

3. Deploy to AWS

   ```sh
   $ cdk deploy Appsync-Lambda-DDB-Dev-AppSyncStack
   ```

<!-- Reference -->
[CDK_AppSync_GraphQL_API]:https://reposhub.com/javascript/misc/dabit3-cdk-graphql-backend.html
[cdk_graphql_backend]:https://github.com/dabit3/cdk-graphql-backend
