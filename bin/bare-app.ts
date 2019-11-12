#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { BareAppStack } from '../lib/bare-app-stack';

const app = new cdk.App();
new BareAppStack(app, 'BareAppStack');
