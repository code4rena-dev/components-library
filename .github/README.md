[![Jest](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml/badge.svg)](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml)

# Code4rena Components Library

## Testing Components Locally
To test the changes you make to your components in a more applicable scenario than storybook, you can install your local repository in any project as if it were already a published package in NPM. You can do so by following the steps below:

1) run `npm run build` on the components library project
2) run `npm install <path_to_local_components_library_folder>` from the project in which you want to test the library

The install command is a one-time-operation. If you make further changes to the library after running the command, all you need to do is run `npm run build` again to see the changes propagated in your other project.

## Using Components in your project

### 1. Installing the library
Start by installing the components library in your project:

```
npm install @code4rena/components-library
```

### 2. Component Styling
Next, to ensure that all the components have the appropriate styling, **import the library's styles** into your application. This can be done in one of two ways:

1. If you have a global CSS/SCSS file, you can import the custom styles using the CSS import rule into that global file.
```
@import "@code4rena/components-library/styles"
```
2. Another option is to import it in any layout/page/component which wraps your entire web application; in doing so, you make sure the styling bubbles down to all pages of the application using the library's components.
```
import "@code4rena/components-library/styles";
```

### 3. Importing Components
All the components in this package can be accessed through named imports. For a full list of available components, take a look at our [Storybook](https://components-library-wine.vercel.app)

```
import { Alert } from "@code4rena/components-library";

<Alert {...args} />
```

### 4. Typescript Support
All components in this library have TypeScript support. Types for all complex component props are also named exports available through the `/types` subdirectory (see example below):
```
import { ButtonSize, ButtonType, ButtonVariant } from "@code4rena/components-library/types";

<Button
    label="Sample Button"
    type={ButtonType.BUTTON}
    variant={ButtonVariant.SECONDARY}
    size={ButtonSize.NARROW}
/>
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
