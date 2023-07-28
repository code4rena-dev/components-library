[![Jest](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml/badge.svg)](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml)

# Code4rena Components Library

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
If you want to make use of [Storybook actions](https://storybook.js.org/docs/angular/essentials/actions) for a specific component, please refer to the `Button.stories.tsx` file. The recommendation is to pass the event handler function directly to the Story component as opposed to passing it through _ComponentName.args_. Passing the event handler function through the **args** parameter may not log the event in the `Actions` tab of the Story's dashboard.

## Testing
For testing, we are using [Jest](https://jestjs.io/docs/getting-started) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To maintain the standards, test files should be named `componentName.test.tsx` and be placed inside the component folder for which the test relates to.


## Publishing to NPM
