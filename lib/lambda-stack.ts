import { Construct, Stack, StackProps } from "@aws-cdk/core";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";

interface LambdaStackStackProps extends StackProps {
  readonly prefix: string;
  readonly stage: string;
}

class LambdaStack extends Stack {
  public readonly lambdaFn: Function;

  constructor(scope: Construct, id: string, props: LambdaStackStackProps) {
    super(scope, id, props);

    /**
     * Get var from props
     */
    const { prefix, stage } = props;

    /**
     * Create Lambda Function
     */
    const lambdaFn = new Function(this, `AppSync-API-Handler`, {
      functionName: `${prefix}-${stage}-AppSync-API-Handler`,
      runtime: Runtime.NODEJS_12_X,
      handler: "app.handler",
      code: Code.fromAsset("dist/src/lambda"),
      memorySize: 256,
    });

    /**
     * Assign to gloabal var
     */
    this.lambdaFn = lambdaFn;
  }
}

export { LambdaStack };
