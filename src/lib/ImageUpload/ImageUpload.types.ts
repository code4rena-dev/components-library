export interface ImageUploadProps {
    /**
     * List of image types as provided by the `ImageType` enum. Available options include:
     *  - image/gif
     *  - image/jpeg
     *  - image/png
     *  - image/webp
     */
    accept?: ImageType[];
    /** String HTML identifier for the input field. */
    id: string;
    /** The max allowed size for file uploads (in Megabytes). */
    maxSize?: number;
    /** Optional function for controlled handling of uploads. Triggered on every change to uploader. */
    onImageSelected?: (data: File | undefined) => void;
    /** Boolean indicator to trigger image upload cleanup once the upload process has finalized on the frontend. */
    hasUploaded?: boolean;
}

export enum ImageType {
    gif = "image/gif",
    jpeg = "image/jpeg",
    png = "image/png",
    webp = "image/webp"
}