# Sharetribe Flex documentation

This repository contains the source code for the Sharetribe Flex
documentation site a.k.a. Flex Docs.

The site is running at: https://www.sharetribe.com/docs/

## Quick start

Clone the repository:

    git clone git@github.com:sharetribe/flex-docs.git

Change to the project directory:

    cd flex-docs/

Install packages:

    yarn

Start development server:

    yarn run dev

Open browser at http://localhost:8000

## Known issues

If you change Gatsby plugins, add articles, rename article URL slugs,
or switch between dev and prod servers, sometimes you need to clear
the Gatsby cache:

    yarn run clean

## Documentation

For more information, see the [internal documentation](docs/README.md).

The documentation contains information for both writing articles for
the site as well as developing the site itself.

## License

This project is licensed under the terms of Apache License, Version 2.0.

See the [LICENSE](LICENSE) file.
