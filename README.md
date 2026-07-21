This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Band preorder environment

The static website sends `POST /api/preorder` through CloudFront to the Lambda
under `infra/aws/lambda/preorder`. The Lambda requires these encrypted
environment variables:

```bash
RESEND_API_KEY=your_resend_api_key
ORIGIN_TOKEN=a_random_value_shared_only_with_the_cloudfront_api_origin
```

Never expose either value through a `NEXT_PUBLIC_` variable or GitHub Actions.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Static production build

Create and validate the CloudFront-ready export:

```bash
npm run build
npm run validate:export
npm run validate:production
```

`npm start` serves `out/` locally through the same URL-routing function used by
CloudFront. Production deployment is handled by `.github/workflows/deploy-aws.yml`.

See [`docs/aws-static-deployment.md`](docs/aws-static-deployment.md) for the
manual AWS, GitHub, DNS cutover, and rollback steps.
