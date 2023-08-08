[![Jest](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml/badge.svg)](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml)

# Code4rena Components Library

## Using Components in your project

Start by installing the components library in your project:

```
npm install @code4rena/components-library
```

Next, to ensure that all the components have the appropriate styling, import the library's css file in your application's wrapping Layout or in any page/component wrapping your application where you would normally import global styling.
```
import "@code4rena/components-library/dist/style.css";
```

All the components in this package can be accessed through named imports. For a full list of available components, take a look at our [Storybook](https://components-library-wine.vercel.app)

```
import { Alert } from "@code4rena/components-library";

<Alert {...args} />
```

## Run Storybook
Storybook will run on [http://localhost:6006](http://localhost:6006)

```
npm run storybook
```
OR
```
yarn storybook
```

### Storybook Actions
If you want to make use of [Storybook actions](https://storybook.js.org/docs/angular/essentials/actions) for a specific component, please refer to the `Input.stories.tsx` file. The recommendation is to pass the event handler function directly to the Story component as opposed to passing it through _ComponentName.args_. Passing the event handler function through the **args** parameter may not log the event in the `Actions` tab of the Story's dashboard.

## Testing
For testing, we are using [Jest](https://jestjs.io/docs/getting-started) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To maintain the standards, test files should be named `componentName.test.tsx` and be placed inside the component folder for which the test relates to.

To run tests you can use the command below (please ensure all tests are passing before creating your PRs)
```
npm test
```
OR
```
yarn test
```

## Publishing to NPM

A GitHub Action has been developed to help automate package releases. All that you will need to do is:

1. Make sure to increase the `version` field in the **package.json**
2. On the GitHub repo's home page, navigate to the righthand side and click on **Create a new release**
3. Give the release a `title` and `description` outlining the changes made in the release
4. Choose/Create a **tag** corresponding to the new version that was added in the package.json in **step 1**
5. Once the details are filled out, submit the release. You will get taken to a confirmation page. This process will automatically trigger the GitHub action that will publish the package to npm. 
