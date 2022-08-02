#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TimeTrackerServerlessApp01Stack } from '../lib/time-tracker-serverless-app-01-stack';

const app = new cdk.App();
new TimeTrackerServerlessApp01Stack(app, 'TimeTrackerServerlessApp01Stack');
