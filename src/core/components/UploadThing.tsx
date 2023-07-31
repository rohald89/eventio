import { OurFileRouter } from "@/uploadthing/uploadthing-router";
import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
