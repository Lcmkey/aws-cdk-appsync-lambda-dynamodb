import {
  Construct,
  Stack,
  StackProps,
  Expiration,
  Duration,
  CfnOutput,
} from "@aws-cdk/core";
import {
  GraphqlApi,
  FieldLogLevel,
  Schema,
  AuthorizationType,
} from "@aws-cdk/aws-appsync";
import { Table } from "@aws-cdk/aws-dynamodb";
import { Function } from "@aws-cdk/aws-lambda";

interface AppSyncStackStackProps extends StackProps {
  readonly prefix: string;
  readonly stage: string;
  readonly table: Table;
  readonly lambdaFnDS: Function;
}

class AppSyncStack extends Stack {
  constructor(scope: Construct, id: string, props: AppSyncStackStackProps) {
    super(scope, id, props);

    /**
     * Get var from props
     */
    const { prefix, stage, table, lambdaFnDS } = props;

    /**
     * Define App-Sync API
     */
    const api = new GraphqlApi(this, "Graphql-API", {
      name: `${prefix}-${stage}-Graphql-API`,
      schema: Schema.fromAsset("graphql/schema.graphql"),
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: `${prefix}-${stage}-API-Key`,
            expires: Expiration.after(Duration.days(365)),
            description: "api key desc",
          },
        },
        // additionalAuthorizationModes: [],
      },
      xrayEnabled: true,
    });

    /**
     * Create Data Source
     */
    const dataSource = api.addLambdaDataSource(`DataSource`, lambdaFnDS);

    /**
     * Create resolvers to match GraphQL operations in schema
     */
    dataSource.createResolver({
      typeName: "Query",
      fieldName: "getNoteById",
    });

    dataSource.createResolver({
      typeName: "Query",
      fieldName: "listNotes",
    });

    dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createNote",
    });

    dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteNote",
    });

    dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "updateNote",
    });

    /**
     * Wnable the Lambda Function to access the DynamoDB table (using IAM)
     */
    table.grantFullAccess(lambdaFnDS);

    /**
     * Add Lambda Env Variable
     */
    lambdaFnDS.addEnvironment("NOTES_TABLE", table.tableName);

    /**
     * Cfn Ouput
     */
    new CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });
    new CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });
    new CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}

export { AppSyncStack };
