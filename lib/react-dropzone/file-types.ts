import type { Accept } from "react-dropzone";

// ============================
// 📚 TYPES & ENUMS
// ============================

/** High-level file category group */
export enum FileCategory {
  IMAGE = "image",
  DOCUMENT = "document",
  AUDIO = "audio",
  VIDEO = "video",
  ARCHIVE = "archive",
  CODE = "code",
}

/** Mapping of MIME → extensions, matches Dropzone’s Accept type */
export type FileAcceptMap = Accept;

/** Union of all known MIME strings */
export type FileMime = keyof typeof ALL_ACCEPT;

/** All known extensions (e.g. ".png", ".mp4") */
export type FileExtension = (typeof ALL_EXTENSIONS)[number];

/** Structured metadata shape for comparing or validating */
export interface FileTypeInfo {
  category: FileCategory;
  mime: FileMime;
  extensions: FileExtension[];
}

// ============================
// 🖼️ IMAGE TYPES
// ============================

export const JPEG = [".jpeg", ".jpg"];
export const PNG = [".png"];
export const GIF = [".gif"];
export const WEBP = [".webp"];
export const AVIF = [".avif"];
export const APNG = [".apng"];
export const SVG = [".svg"];
export const BMP = [".bmp"];
export const TIFF = [".tif", ".tiff"];
export const ICO = [".ico"];
export const HEIC = [".heic"];
export const HEIF = [".heif"];

export const IMAGE_ACCEPT = {
  "image/jpeg": JPEG,
  "image/png": PNG,
  "image/gif": GIF,
  "image/webp": WEBP,
  "image/avif": AVIF,
  "image/apng": APNG,
  "image/svg+xml": SVG,
  "image/bmp": BMP,
  "image/tiff": TIFF,
  "image/x-icon": ICO,
  "image/heic": HEIC,
  "image/heif": HEIF,
} as const;

// ============================
// 📄 DOCUMENT TYPES
// ============================

export const PDF = [".pdf"];
export const WORD = [".doc", ".docx"];
export const EXCEL = [".xls", ".xlsx"];
export const POWERPOINT = [".ppt", ".pptx"];
export const TEXT = [".txt"];
export const RTF = [".rtf"];
export const CSV = [".csv"];
export const ODT = [".odt"];
export const ODS = [".ods"];
export const ODP = [".odp"];
export const MARKDOWN = [".md"];

export const DOCUMENT_ACCEPT = {
  "application/pdf": PDF,
  "application/msword": WORD,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    WORD,
  "application/vnd.ms-excel": EXCEL,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": EXCEL,
  "application/vnd.ms-powerpoint": POWERPOINT,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    POWERPOINT,
  "text/plain": TEXT,
  "text/csv": CSV,
  "application/rtf": RTF,
  "application/vnd.oasis.opendocument.text": ODT,
  "application/vnd.oasis.opendocument.spreadsheet": ODS,
  "application/vnd.oasis.opendocument.presentation": ODP,
  "text/markdown": MARKDOWN,
} as const;

// ============================
// 🎵 AUDIO TYPES
// ============================

export const MP3 = [".mp3"];
export const WAV = [".wav"];
export const OGG = [".ogg"];
export const AAC = [".aac"];
export const FLAC = [".flac"];
export const M4A = [".m4a"];

export const AUDIO_ACCEPT = {
  "audio/mpeg": MP3,
  "audio/wav": WAV,
  "audio/ogg": OGG,
  "audio/aac": AAC,
  "audio/flac": FLAC,
  "audio/mp4": M4A,
} as const;

// ============================
// 🎬 VIDEO TYPES
// ============================

export const MP4 = [".mp4"];
export const WEBM = [".webm"];
export const OGV = [".ogv"];
export const MOV = [".mov"];
export const AVI = [".avi"];
export const MKV = [".mkv"];
export const WMV = [".wmv"];
export const FLV = [".flv"];

export const VIDEO_ACCEPT = {
  "video/mp4": MP4,
  "video/webm": WEBM,
  "video/ogg": OGV,
  "video/quicktime": MOV,
  "video/x-msvideo": AVI,
  "video/x-matroska": MKV,
  "video/x-ms-wmv": WMV,
  "video/x-flv": FLV,
} as const;

// ============================
// 🗜️ ARCHIVE / COMPRESSED
// ============================

export const ZIP = [".zip"];
export const RAR = [".rar"];
export const TAR = [".tar"];
export const GZ = [".gz"];
export const TGZ = [".tgz"];
export const BZ2 = [".bz2"];
export const SEVENZ = [".7z"];

export const ARCHIVE_ACCEPT = {
  "application/zip": ZIP,
  "application/x-rar-compressed": RAR,
  "application/x-tar": TAR,
  "application/gzip": GZ,
  "application/x-7z-compressed": SEVENZ,
  "application/x-bzip2": BZ2,
} as const;

// ============================
// 🧩 COMBINED ACCEPT GROUPS
// ============================

export const ALL_ACCEPT = {
  ...IMAGE_ACCEPT,
  ...DOCUMENT_ACCEPT,
  ...AUDIO_ACCEPT,
  ...VIDEO_ACCEPT,
  ...ARCHIVE_ACCEPT,
} as const;

export const ALL_EXTENSIONS = [...Object.values(ALL_ACCEPT).flat()] as const;

// ============================
// ⚙️ GROUPED SHORTCUT MAPS
// ============================

/**
 * Category → Accept mapping for quick Dropzone use.
 * Example:
 *   accept={CATEGORY_ACCEPT.image}
 */
export const CATEGORY_ACCEPT: Record<FileCategory, FileAcceptMap> = {
  [FileCategory.IMAGE]: IMAGE_ACCEPT,
  [FileCategory.DOCUMENT]: DOCUMENT_ACCEPT,
  [FileCategory.AUDIO]: AUDIO_ACCEPT,
  [FileCategory.VIDEO]: VIDEO_ACCEPT,
  [FileCategory.ARCHIVE]: ARCHIVE_ACCEPT,
  [FileCategory.CODE]: {},
};

/**
 * Wildcard mapping for Dropzone shorthand usage like:
 *   accept={{ "image/*": [".png", ".jpg"] }}
 */
export const WILDCARD_ACCEPT = {
  "image/*": Object.values(IMAGE_ACCEPT).flat(),
  "video/*": Object.values(VIDEO_ACCEPT).flat(),
  "audio/*": Object.values(AUDIO_ACCEPT).flat(),
  "application/*": Object.values(DOCUMENT_ACCEPT).flat(),
  "*/*": ALL_EXTENSIONS,
} as const;
