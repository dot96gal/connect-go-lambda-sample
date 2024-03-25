import * as cdk from "aws-cdk-lib";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new DockerImageFunction(this, "connect-go-lambda", {
      code: DockerImageCode.fromImageAsset("../lambda", {
        file: "docker/Dockerfile",
        platform: Platform.LINUX_AMD64,
        exclude: ["cdk"],
      }),
      memorySize: 128,
      timeout: Duration.seconds(30),
    });

    const apiGw = new HttpApi(this, "connect-go-apigw", {
      apiName: "connect-go-apigw",
      defaultIntegration: new HttpLambdaIntegration(
        "connect-go-lambda-integration",
        lambda,
      ),
    });

    new CfnOutput(this, "ApiEndpoint", { value: apiGw.apiEndpoint });
  }
}
