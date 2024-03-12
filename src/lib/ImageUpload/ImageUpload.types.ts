export interface ImageUploadProps {
    /**
     * String value indicating all the accepted file types (separated by a comma). Options include:
     *  - image/apng
     *  - image/avif
     *  - image/gif
     *  - image/jpeg
     *  - image/png
     *  - image/svg+xml
     *  - image/webp
     */
    accept?: string;
    /** String HTML identifier for the input field. */
    id: string;
    /** The max allowed size for file uploads (in Megabytes). */
    maxSize?: number;
    /** Boolean indicator to determine whether multi file upload should be accepted or not. */
    multiSelect?: boolean;
    /** Optional function for controlled handling of uploads. Triggered on every change to uploader. */
    onImageSelected?: (data: File[] | File | undefined) => void;
}