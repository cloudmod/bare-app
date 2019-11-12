import { Stack, Construct, StackProps, Aws } from '@aws-cdk/core';
// Import your modules here

import { SimpleAuth } from '@cloudmod/simple-auth';
import { PolymorphicStorage } from '@cloudmod/polymorphic-storage'
import { SimpleCicd, SourceType } from '@cloudmod/simple-cicd';

export class BareAppStack extends Stack {
  // Declare your module instances here
  /** @returns the simple authentication module */
  public readonly simpleAuth: SimpleAuth;

  /** @returns the polymorphic storage module */
  public readonly polymorphicStorage: PolymorphicStorage;

  public readonly simpleCicd: SimpleCicd;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const region = Aws.REGION;
    const accountId = Aws.ACCOUNT_ID

    // Initialize your modules here
    
    // Initialize simple auth
    this.simpleAuth = new SimpleAuth(this, 'SimpleAuth');
    
    // Initialize polymorphic storage
    this.polymorphicStorage = new PolymorphicStorage(this, 'PolymorphicStorage');
    
    // Initialize CICD
    this.simpleCicd = new SimpleCicd(this, 'SimpleCicd', {
      accountOwner: 'cloudmod',
      branchName: 'master',
      repositoryName: 'bare-app',
      sourceType: SourceType.GITHUB,
      oauthSecretArn: `arn:aws:secretsmanager:${region}:${accountId}:secret:cloudmod/automation-vQrKf2`
    });
  }
}
