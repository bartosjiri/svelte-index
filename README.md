<div align="center">
  <a href="https://svelteindex.com" target="_blank"><img src="static/meta/favicon.svg" alt="Repository logo" style="height: 64px;" /></a>
  <p><strong>Svelte Index</strong></p>
</div>
<hr />

## Contributing

To contribute to the directory, open an issue using one of the following templates:

- [Submit a new company](https://github.com/bartosjiri/svelte-index/issues/new?template=new-company.yml)
- [Request an update or removal](https://github.com/bartosjiri/svelte-index/issues/new?template=update-request.yml)

Svelte Index is a curated list of companies. Listings are based on subjective criteria, including company size and the impact and reach of their Svelte projects. Submissions may be rejected without explanation; however, contributors are encouraged to resubmit at a later time.

<hr/>

## Requirements

- [Node.js](https://nodejs.org/) >= 20

## Development

1. Install project dependencies:

   ```sh
   pnpm i
   ```

2. Run the application in development mode:

   ```sh
   pnpm run dev
   ```

## Deployment

#### Using providers with SvelteKit supports

1. Deploy the application using a provider of your preference with SvelteKit support.
2. Configure the required environment variables based on the `.env.example` file.

#### Self-hosting

1. Configure the required environment variables based on the `.env.example` file.
2. Follow the SvelteKit's [Node server deployment documentation](https://kit.svelte.dev/docs/adapter-node).
