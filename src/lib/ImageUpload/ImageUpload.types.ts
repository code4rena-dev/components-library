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
    /** Optional function for controlled handling of uploads. Triggered on every change to uploader. */
    onImageSelected?: (data: File | undefined) => void;
    /** Boolean indicator to trigger image upload cleanup once the upload process has finalized on the frontend. */
    hasUploaded?: boolean;
}