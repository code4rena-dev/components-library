[![Jest](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml/badge.svg)](https://github.com/code4rena-dev/components-library/actions/workflows/test-runner.yml)

# Code4rena Components Library

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
