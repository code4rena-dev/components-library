import React, { ChangeEvent, DragEvent, useCallback, useEffect, useRef, useState } from "react";

import "./ImageUpload.scss";
import { Icon } from "../Icon";
import clsx from "clsx";
import { ImageUploadProps } from "./ImageUpload.types";

/**
 * A custom image upload input component with support for drag & drop
 * as well as multi-file upload by providing the `multiSelect` prop.
 * 
 * By default, this component can be used as an uncontrolled input and all uploaded files
 * can be retrieved on form submission. For further control however, you can pass an optional function
 * to the `onImageSelected` prop.
 * 
 * @param accept - String value indicating all the accepted file types (separated by a comma). Options include:
 *  - image/apng
 *  - image/avif
 *  - image/gif
 *  - image/jpeg
 *  - image/png
 *  - image/svg+xml
 *  - image/webp
 * @param id - String HTML identifier for the input field.
 * @param maxSize - The max allowed size for file uploads (in Megabytes).
 * @param onImageSelected - Optional function for controlled handling of uploads. Triggered on every change to uploader.
 * @param hasUploaded - Boolean indicator to trigger image upload cleanup once the upload process has finalized on the frontend.
 */
export const ImageUpload = ({
    accept = "image/png, image/jpeg",
    id,
    maxSize = 2,
    onImageSelected,
    hasUploaded = false
}: ImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const maxSizeInBytes = maxSize * 1024 * 1024;
    const [dragActive, setDragActive] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>();
    const [error, setError] = useState<string>();

    /**
     * Cleans up input field and all related state.
     */
    const clearInput = () => {
        setPreviews([]);
        setUploadedImages([]);
        if (onImageSelected) {
            onImageSelected(undefined);
        }
        if (inputRef.current) {
            inputRef.current.files = null;
        }
    }

    /**
     * Confirms whether a file is valid or not by checking the file type
     * against the `accept` prop and the file size against the `maxSize` prop.
     * 
     * @param file - File to be validated.
     * @param acceptedFiles - Array of previously accepted files to be updated on valid file. 
     * @param declinedFiles - Array of previously declined files to be updated on invalid file.
     * @param acceptedPreviews - Array of previously generated preview urls for each accepted file.
     */
    const isValidFile = (file: File | null, acceptedFiles: File[], declinedFiles: File[], acceptedPreviews: string[]) => {
        if (file == null) return false;

        if (!accept.includes(file.type) || file.size > maxSizeInBytes) {
            declinedFiles.push(file);
            return false;
        } else {
            acceptedFiles.push(file);
            acceptedPreviews.push(URL.createObjectURL(file));
            return true;
        }
    }

    /**
     * onChange event handler for the input field, triggered on every file selection
     * interaction with the input.
     * 
     * @param e - Change event information.
     */
    const onImageChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const acceptedFiles: File[] = [];
        const declinedFiles: File[] = [];
        const acceptedPreviews: string[] = [];
        const dt = new DataTransfer();
        setError(undefined);

        if (!files || files.length === 0) {
            clearInput();
        } else {
            Array.from(files).forEach((file) => {
                const valid = isValidFile(file, acceptedFiles, declinedFiles, acceptedPreviews);
                if (valid) {
                    dt.items.add(file);
                }
            })
            
            if (onImageSelected) {
                onImageSelected(acceptedFiles[0]);
            }
            setUploadedImages(acceptedFiles);
            setPreviews(acceptedPreviews);
            if (inputRef.current) {
                inputRef.current.files = dt.files;
            }

            if (declinedFiles.length > 0) {
                setError(`${declinedFiles.length > 1
                    ? `${declinedFiles.length} files`
                    : 'File'} could not be loaded. Check for the correct file type and size (max size: ${maxSize}MB)`);
            }
        }
    }

    /**
     * onDrop event handler in order to support drag & drop functionality.
     * Notifies when the dragged item has been released over the target view.
     * 
     * @param e - Drag event information.
     */
    const onDrop = (e: DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDragActive(false);
        setError(undefined);
        const acceptedFiles: File[] = [];
        const declinedFiles: File[] = [];
        const acceptedPreviews: string[] = [];
        const dt = new DataTransfer();

        if (e.dataTransfer.files) {
            for (const file of Object.values(e.dataTransfer.files)) {
                    const valid = isValidFile(file, acceptedFiles, declinedFiles, acceptedPreviews);
                    if (valid) {
                        dt.items.add(file);
                    }
            }
        }

        if (onImageSelected) {
            onImageSelected(acceptedFiles[0]);
        }
        setUploadedImages(acceptedFiles);
        setPreviews(acceptedPreviews);
        if (inputRef.current) {
            inputRef.current.files = dt.files.length ? dt.files : null;
        }

        if (declinedFiles.length > 0) {
            setError(`${declinedFiles.length > 1
                ? `${declinedFiles.length} files`
                : 'File'} could not be loaded. Check for the correct file type and size (max size: ${maxSize}MB)`);
        }
    }

    /**
     * onDragOver event handler in order to support drag & drop functionality.
     * Notifies when the dragged item has been dragged over the target view.
     * 
     * @param e - Drag event information
     */
    const onDragOver = (e: DragEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        if (!dragActive) {
            setDragActive(true);
        }
    }

    /**
     * onDragLeave event handler in order to support drag & drop functionality.
     * Notifies when the dragged item has left the target view.
     * 
     * @param e - Drag event information
     */
    const onDragLeave = (e: DragEvent<HTMLInputElement>) => {
        if (dragActive) {
            setDragActive(false);
        }
    }

    useEffect(() => {
        if (hasUploaded) {
            clearInput();
        }
    }, [hasUploaded])

    return <div className="c4imgupload--wrapper">
        {previews && previews.length > 0 && <div className="c4imgupload--preview">
            <div className="preview">
                <img
                    className="img"
                    alt="Uploaded file preview"
                    src={previews[0]}
                />
                <div className="cutout">
                    <div className="left" />
                    <div className="center" />
                    <div className="right" />
                </div>
            </div>
            {uploadedImages && uploadedImages.length > 0 && <div className="file-name">
                <p>{uploadedImages[0].name}</p>
            </div>}
        </div>}
        <div className='c4imgupload'>
            <div
                className={clsx(
                    "c4imgupload--dragindicator",
                    dragActive && 'active'
                )}
            />
            <div className={clsx(
                'c4imgupload--container',
                dragActive && 'active'
            )}>
                <input
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    id={id}
                    name={id}
                    alt="Image uploader input"
                    ref={inputRef}
                    className='c4imgupload--input'
                    multiple={false}
                    type="file"
                    accept={accept}
                    onClick={() => setError(undefined)}
                    onChange={onImageChanged}
                />
                <Icon name="image" size="large" />
                <p data-testid="upload-caption" className="c4imgupload--caption">
                    Drag and drop here or <strong>select file</strong>.
                </p> 
            </div>
        </div>
        {error && <p className="c4imgupload--error">{error}</p>}
    </div>
}