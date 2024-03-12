import React from "react";
import { ImageUpload } from "./ImageUpload";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockDataTransfer from "./_MockDataTransfer";
import "@testing-library/jest-dom";


const defaultAltText = "Image uploader input";
const defaultArgs = {
    id: 'test-uploader',
    accept: 'image/jpeg',
    multiSelect: false,
    maxSize: 2
};

/**
 * Monkeypatch JSDOM file input to allow modification (this is a thing in the browser but
 * not in JSDOM for some reason.)
 */
const fileCache = new WeakMap();

Object.defineProperty(HTMLInputElement.prototype, 'files', {
//   set(fileList) {
//     // use the input itself as the map key to avoid collisions
//     fileCache.set(this, fileList);

    // the first time we set install a new set of getter/setter that point to the cache
    // Object.defineProperty(this, 'files', {
      get() {
        return fileCache.get(this);
      },
      set(value) {
        fileCache.set(this, value);
      },
    // });
//   },
});

// @ts-expect-error MockDataTransfer is a minimal mock
global.DataTransfer = MockDataTransfer;

Object.defineProperty(URL, 'createObjectURL', {
    value: jest.fn((file) => `http://localhost/${Buffer.from(file.name).toString('base64')}`),
});

describe("========== C4 IMAGE UPLOAD - RUNNING TESTS ==========", () => {
    test("Renders input with custom id and accepted types", () => {
        render(<ImageUpload {...defaultArgs} />);
        const input: HTMLInputElement = screen.getByAltText(defaultAltText);
        expect(input).toHaveAttribute('id', defaultArgs.id);
        expect(input).toHaveAttribute('accept', defaultArgs.accept);
    });

    test("Displays correct size limit to user", () => {
        const maxSize = 10;
        render(<ImageUpload {...defaultArgs} maxSize={maxSize} />);
        const sizeHelperMessage = screen.getByText(`Max file size: ${maxSize}MB`);
        expect(sizeHelperMessage).not.toBeNull();
    });

    // test("Triggers correct onChange event logic", async () => {
    //     const user = userEvent.setup();
    //     render(<ImageUpload {...defaultArgs} />);
    //     const file = new File(['(⌐□_□)'], "test.jpeg", { type: "image/jpeg" });
    //     const input: HTMLInputElement = screen.getByAltText(defaultAltText);
        
    //     await userEvent.upload(input, file);
    //     console.log(input.files);
    //     input = screen.getByAltText(defaultAltText);
    //     console.log(input.files)
    //     const caption = screen.getByText("1 file selected");
    //     expect(caption).not.toBeNull();
    // })


});