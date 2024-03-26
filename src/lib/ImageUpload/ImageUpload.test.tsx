import React from "react";
import { ImageUpload } from "./ImageUpload";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockDataTransfer from "./_MockDataTransfer";
import "@testing-library/jest-dom";
import { ImageType } from "./ImageUpload.types";


const defaultAltText = "Image uploader input";
const defaultArgs = {
    id: 'test-uploader',
    accept: [ImageType.jpeg],
    multiSelect: false,
    maxSize: 2
};

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
        expect(input).toHaveAttribute('accept', defaultArgs.accept.join(", "));
    });

    test("Triggers correct onChange event logic on valid uploads", async () => {
        const fileCache = new WeakMap();
        const user = userEvent.setup();
        render(<ImageUpload {...defaultArgs} accept={[ImageType.jpeg]} />);
        const input: HTMLInputElement = screen.getByAltText(defaultAltText);
        const file = new File(['(⌐□_□)'], "test.jpeg", { type: "image/jpeg" });
        
        Object.defineProperty(input, 'files', {
            configurable: true,
            get() {
                return fileCache.get(this);
            },
            set(fileList) {
                fileCache.set(this, fileList);
            }
        });
        
        // Test for file upload logic
        await act(() => user.upload(input, file));
        expect(input.files).toHaveLength(1);
        // Test for no file upload logic
        await act(() => user.upload(input, []));
        expect(input.files).toHaveLength(0);
        const caption = screen.getByTestId('upload-caption');
        expect(caption).not.toBeNull();
    })

    test("Triggers correct onChange event logic on invalid uploads", async () => {
        const fileCache = new WeakMap();
        const user = userEvent.setup();
        render(<ImageUpload {...defaultArgs} maxSize={0} />);
        const input: HTMLInputElement = screen.getByAltText(defaultAltText);
        const file = new File(['(⌐□_□)'], "test.jpeg", { type: "image/jpeg" });

        Object.defineProperty(input, 'files', {
            configurable: true,
            get() {
                return fileCache.get(this);
            },
            set(fileList) {
                fileCache.set(this, fileList);
            }
        });

        // Test for error message on invalid file upload
        await act(() => user.upload(input, file));
        expect(input.files).toHaveLength(1);
        const error = screen.getByText("File could not be loaded. Check for the correct file type and size (max size: 0MB)");
        expect(error).not.toBeNull();
    });

    test("Triggers correct drag and drop event logic on valid uploads", async () => {
        const fileCache = new WeakMap();
        const onImageSelected = jest.fn();
        render(<ImageUpload {...defaultArgs} onImageSelected={onImageSelected} />);
        const input: HTMLInputElement = screen.getByAltText(defaultAltText);
        const file = new File(['(⌐□_□)'], "test.jpeg", { type: "image/jpeg" });

        Object.defineProperty(input, 'files', {
            configurable: true,
            get() {
                return fileCache.get(this);
            },
            set(fileList) {
                fileCache.set(this, fileList);
            }
        });

        // FireEvent to test dataTransfer with items prop
        // Only .drop event is necessary, however other drag events
        // are for uncovered lines of code, to ensure functions are properly triggered.
        fireEvent.dragOver(input);
        fireEvent.dragLeave(input);
        fireEvent.dragOver(input);
        fireEvent.dragEnd(input);
        fireEvent.drop(input, {
            dataTransfer: {
                files: [file]
            }
        });

        // Way to check if drop function has been called, as the onImageSelected prop is called inside it.
        expect(input.files).not.toBeNull();
        expect(input.files?.length).toBe(1);
        expect(onImageSelected).toHaveBeenCalled();
    });

    test("Triggers correct drag and drop event logic on invalid uploads", async () => {
        const fileCache = new WeakMap();
        // Set accepted type to png only but provide a jpeg to make it invalid
        render(<ImageUpload {...defaultArgs} accept={[ImageType.png]} />);
        const input: HTMLInputElement = screen.getByAltText(defaultAltText);
        const file = new File(['(⌐□_□)'], "test.jpeg", { type: "image/jpeg" });

        Object.defineProperty(input, 'files', {
            configurable: true,
            get() {
                return fileCache.get(this);
            },
            set(fileList) {
                fileCache.set(this, fileList);
            }
        });

        // FireEvent to test dataTransfer with items prop
        fireEvent.drop(input, {
            dataTransfer: {
                files: [file]
            }
        });

        // If file is invalid, input.files will be null
        expect(input.files).toBeNull();
    });
});