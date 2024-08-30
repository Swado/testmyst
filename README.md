This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

bun dev

## Run Docker surrealdb

docker run --rm --pull always -p 8000:8000 -v $(pwd)/database:/database surrealdb/surrealdb:latest start --auth --user root --pass root file:/database/testmyst.db
