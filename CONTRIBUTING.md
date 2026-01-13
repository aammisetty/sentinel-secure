# Contributing to Sentinel Secure

First off, thanks for taking the time to contribute! :heart:

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them.

## Table of Contents
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Styleguides](#styleguides)

## I Have a Question
Before you ask a question, it is best to search for existing [Issues](https://github.com/aammisetty/sentinel-secure/issues) that might help you.

## I Want To Contribute

### Legal Notice
By contributing to **Sentinel Secure**, you agree that your code will be licensed under the MIT License.

### Development Setup
1.  **Fork the repo** and clone it locally.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a branch for your feature:
    ```bash
    git checkout -b feature/amazing-feature
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

### Pull Request Process
1.  Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2.  Update the `README.md` with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3.  You may merge the Pull Request in once you have the sign-off of the maintainer.

## Styleguides
* **JavaScript:** We use ES6+ syntax.
* **React:** Functional components with Hooks.
* **CSS:** Tailwind CSS utility classes. (Avoid custom CSS files where possible).
* **Logic:** All cryptographic logic must use `window.crypto` (Web Crypto API). Do NOT use `Math.random()` for security features.

## Code of Conduct
This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.