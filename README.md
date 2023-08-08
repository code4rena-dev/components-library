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

All the components in this package can be accessed through named imports. For a full list of available components, take a look at our [Storybook](components-library-wine.vercel.app)

```
import { Alert } from "@code4rena/components-library";

<Alert {...args} />
```
