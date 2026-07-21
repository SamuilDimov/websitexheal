# xHeal Website AWS Deployment

This runbook moves `xheal.ai` from Netlify to CloudFront while keeping the
authoritative Route 53 zone in its current AWS account.

## Account Boundaries

| Purpose | AWS account | Local profile | Region |
|---|---:|---|---|
| Website hosting | `569380617479` | `xheal-staging` | `eu-central-1` |
| `xheal.ai` DNS | `050451365515` | `xheal` | Route 53 global |
| CloudFront certificate | `569380617479` | `xheal-staging` | `us-east-1` |

Do not move the hosted zone or change its nameservers. The final cutover only
replaces the apex website A record and the `www` CNAME.

## Resource Names

Use these names unless an existing naming rule requires a different value:

| Resource | Name |
|---|---|
| S3 bucket | `xheal-website-static-569380617479` |
| Lambda function | `xheal-website-preorder` |
| Lambda alias | `live` |
| API Gateway HTTP API | `xheal-website-api` |
| CloudFront Function | `xheal-website-routing` |
| Origin Access Control | CloudFront-managed OAC `E2QPWAIQTZ4C4J` |
| GitHub deployment role | `xheal-website-github-deploy` |

Record the generated API ID, CloudFront distribution ID, and CloudFront domain.
They become GitHub Actions variables later in this runbook.

## 1. Use Basic CloudFront Metrics

The Website uses the basic aggregate operational metrics that CloudFront
publishes automatically. No client-side analytics package, tracking script,
analytics origin, or additional GitHub variable is required.

Basic metrics cover request volume, transferred bytes, and HTTP error rates.
They do not provide visitor sessions, user profiles, per-page journeys, or Web
Vitals.

To avoid additional analytics charges, do not enable CloudFront Additional
Metrics, CloudWatch RUM, standard access logging, S3 log analysis, or Athena.

## 2. Request the CloudFront Certificate

Work in AWS account `569380617479`, region `us-east-1`.

1. Open ACM and request a public certificate.
2. Use `xheal.ai` as the primary name.
3. Add `www.xheal.ai` as a second name.
4. Select DNS validation.
5. Copy the generated validation CNAME records.
6. Switch to AWS account `050451365515`.
7. Open Route 53 hosted zone `Z07696072G209B9Q0F0AS` (`xheal.ai`).
8. Add only the ACM validation CNAME records.
9. Wait for the certificate in account `569380617479` to become `Issued`.

CloudFront cannot use a certificate from another AWS account. The certificate
must be in the hosting account and in `us-east-1`, even though DNS is owned by
the other account.

## 3. Create the Private S3 Bucket

Work in AWS account `569380617479`, region `eu-central-1`.

1. Create `xheal-website-static-569380617479`.
2. Keep all four Block Public Access settings enabled.
3. Use Bucket owner enforced object ownership.
4. Enable bucket versioning.
5. Keep default SSE-S3 encryption enabled.
6. Do not enable S3 static website hosting.

The bucket policy is added after the CloudFront distribution exists.

## 4. Create the Preorder Lambda

1. Create an execution role for `xheal-website-preorder`.
2. Attach only the AWS managed `AWSLambdaBasicExecutionRole` policy.
3. Create the Lambda in `eu-central-1` with Node.js 24, arm64, 128 MB memory,
   and a 15-second timeout.
4. Do not attach the Lambda to a VPC; it needs outbound access to Resend.
5. Set reserved concurrency to `10`.
6. Generate a random 256-bit origin token and keep it in the password manager.
7. Add encrypted environment variables `RESEND_API_KEY` and `ORIGIN_TOKEN`.
8. Upload an initial zip containing
   `infra/aws/lambda/preorder/index.mjs` and `emails.mjs` at the zip root.
9. Set the handler to `index.handler`.
10. Publish version 1 and create alias `live` pointing to that version.

Do not put either secret in GitHub variables. Lambda environment variables are
encrypted at rest; access to Lambda configuration must remain restricted.

## 5. Create API Gateway

Create an HTTP API named `xheal-website-api` in `eu-central-1`.

1. Create route `POST /api/preorder`.
2. Integrate it with Lambda alias `xheal-website-preorder:live`.
3. Use payload format version `2.0`.
4. Use the `$default` stage with automatic deployment.
5. Disable CORS because browsers call the same `xheal.ai` origin through
   CloudFront.
6. Set route throttling to rate `10` and burst `20`.
7. Enable access logs containing request ID, route, status, integration status,
   and latency only.
8. Do not log request bodies, email addresses, the origin token, or headers.

Copy the API's execute-api hostname without `https://`; it is used as a
CloudFront custom origin.

## 6. Create and Publish the CloudFront Function

1. Create `xheal-website-routing` with runtime `cloudfront-js-2.0`.
2. Paste `infra/aws/cloudfront/url-router.js` as its source.
3. Test `/`, `/about`, `/about.txt`, `/bg/about`, and an unknown extensionless
   route.
4. Publish the function.

The function maps public English URLs to internal `/en` export objects, maps
Next's `.txt` navigation payloads, redirects `www` to the apex domain, and
implements historical redirects.

## 7. Create the CloudFront Distribution

Create the distribution in account `569380617479`.

### Origins

| Origin | Configuration |
|---|---|
| S3 | Bucket REST endpoint with CloudFront-managed OAC; always sign requests |
| API Gateway | Execute-api hostname, HTTPS only, minimum TLS 1.2 |

On the API Gateway origin add custom header `X-Xheal-Origin-Token` with the
same token stored in Lambda's `ORIGIN_TOKEN` variable.

### Behaviors

| Priority/path | Origin | Methods | Cache policy | Origin request policy | Function |
|---|---|---|---|---|---|
| `1 /api/*` | API Gateway | All | Managed CachingDisabled | Managed AllViewerExceptHostHeader | None |
| Default `*` | S3 | GET, HEAD | Managed CachingOptimized | None | `xheal-website-routing`, viewer request |

Do not associate the URL router with the API behavior.

### Distribution Settings

1. Leave Default root object empty; the CloudFront Function resolves `/`.
2. Enable automatic compression, HTTP/2, HTTP/3, and IPv6.
3. Redirect HTTP to HTTPS on every behavior.
4. Use TLS security policy `TLSv1.2_2021` or newer.
5. Add alternate names `xheal.ai` and `www.xheal.ai`.
6. Select the ACM certificate created in `us-east-1`.
7. Attach the AWS managed SecurityHeadersPolicy to the default behavior.
8. Add a custom error response for origin `404`: response page `/404.html`,
   response code `404`, error TTL `0`.
9. Do not map all `403` responses to HTML because that can hide API denials.
10. AWS WAF is intentionally deferred to avoid its monthly base charge. API
    Gateway throttling, the CloudFront origin token, and Resend idempotency
    provide the initial abuse controls. Monitor API and Resend usage closely.

Do not change public DNS yet. The distribution's generated CloudFront domain is
used for the first deployment and validation.

## 8. Add the S3 Bucket Policy

Replace `DISTRIBUTION_ID` in this policy, then apply it to the private bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontReadObjects",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::xheal-website-static-569380617479/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::569380617479:distribution/DISTRIBUTION_ID"
        }
      }
    },
    {
      "Sid": "AllowCloudFrontMissingObjectChecks",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::xheal-website-static-569380617479",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::569380617479:distribution/DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

The `ListBucket` permission allows S3 to return 404 rather than 403 for missing
objects. It does not expose object listings publicly because it is restricted
to the one distribution.

## 9. Create the GitHub Deployment Role

The GitHub OIDC provider already exists in account `569380617479`. Create role
`xheal-website-github-deploy` with this trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::569380617479:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:xheal/xheal-website:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Attach this least-privilege inline policy after replacing the distribution ID:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListWebsiteBucket",
      "Effect": "Allow",
      "Action": ["s3:GetBucketLocation", "s3:ListBucket"],
      "Resource": "arn:aws:s3:::xheal-website-static-569380617479"
    },
    {
      "Sid": "DeployWebsiteObjects",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::xheal-website-static-569380617479/*"
    },
    {
      "Sid": "DeployPreorderLambda",
      "Effect": "Allow",
      "Action": [
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "lambda:UpdateAlias",
        "lambda:UpdateFunctionCode"
      ],
      "Resource": [
        "arn:aws:lambda:eu-central-1:569380617479:function:xheal-website-preorder",
        "arn:aws:lambda:eu-central-1:569380617479:function:xheal-website-preorder:*"
      ]
    },
    {
      "Sid": "PublishWebsiteRouter",
      "Effect": "Allow",
      "Action": [
        "cloudfront:DescribeFunction",
        "cloudfront:PublishFunction",
        "cloudfront:UpdateFunction"
      ],
      "Resource": "arn:aws:cloudfront::569380617479:function/xheal-website-routing"
    },
    {
      "Sid": "InvalidateWebsiteDistribution",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::569380617479:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

## 10. Configure GitHub Variables

In `xheal/xheal-website`, open Settings, Secrets and variables, Actions,
Variables. Add:

| Variable | Value |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | Role ARN from step 9 |
| `AWS_S3_BUCKET` | `xheal-website-static-569380617479` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | New distribution ID |
| `AWS_CLOUDFRONT_DOMAIN` | Generated domain without `https://` |
| `AWS_CLOUDFRONT_FUNCTION_NAME` | `xheal-website-routing` |
| `AWS_LAMBDA_FUNCTION_NAME` | `xheal-website-preorder` |

## 11. Deploy and Validate Before DNS

1. Run the `Deploy to AWS` workflow manually from the `main` branch.
2. Confirm all source, infrastructure, static-export, and Chromium tests pass.
3. Confirm the workflow uploads S3, publishes Lambda and the CloudFront
   Function, invalidates CloudFront, and runs deployed validation.
4. Open the generated CloudFront domain and test `/`, `/about`, `/bg`,
   `/bg/about`, `/smart-devices`, a blog article, and an unknown route.
5. Submit one controlled preorder and confirm both Resend emails arrive.
6. Confirm the deployment workflow's preorder smoke test receives HTTP 400 for
   an empty payload without sending email.
7. After test traffic, confirm basic request and error metrics appear under the
   CloudFront distribution's Monitoring tab.

The workflow runs hourly at minute 17 so future-dated blog posts become visible
within approximately one hour of their publication time.

## 12. Cut Over Route 53

Work in DNS account `050451365515`, hosted zone
`Z07696072G209B9Q0F0AS`.

Current rollback values:

| Record | Current value |
|---|---|
| `xheal.ai` A | `75.2.60.5`, TTL 300 |
| `www.xheal.ai` CNAME | `xheal.netlify.app`, TTL 300 |

Make only these website changes:

1. Replace the apex A record with an Alias A to the CloudFront distribution.
2. Add an apex Alias AAAA to the same distribution.
3. Replace the `www` CNAME with Alias A and Alias AAAA records to CloudFront.
4. For a cross-account distribution that is absent from the selector, enter
   its generated CloudFront domain manually. CloudFront's alias hosted zone ID
   is `Z2FDTNDATAQYW2`.
5. Do not change NS, SOA, MX, TXT, DKIM, SPF, authentication, API, or any other
   records.

Immediately after DNS changes, verify both apex and `www` over IPv4 and IPv6,
the certificate, the `www` website-page redirect, and `/api/preorder` through
`https://xheal.ai`. The CloudFront Function redirects `www` website pages to
`xheal.ai`; API requests should originate from the already-redirected apex
pages.

## 13. Bake, Roll Back, and Remove Netlify

Monitor the site, preorder Lambda errors, API Gateway status, CloudFront 4xx/5xx
rates, and basic CloudFront request metrics for at least several days.

To roll back, restore the apex A record to `75.2.60.5`, restore the `www` CNAME
to `xheal.netlify.app`, and remove the new website AAAA aliases. DNS TTL is 300
seconds.

After the bake period:

1. Disable Netlify builds and deploy hooks.
2. Remove `xheal.ai` and `www.xheal.ai` from the Netlify site.
3. Keep the Netlify site for one additional short rollback window if desired.
4. Delete the Netlify site when rollback is no longer required.

There are no Netlify packages, forms, functions, or configuration files in this
repository to remove.
