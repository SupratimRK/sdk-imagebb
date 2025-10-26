import { ImgbbUploadOptions, Root } from "./interface";

const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

type imgbbUploadType = (options: ImgbbUploadOptions) => Promise<Root>;

/**
 * Upload an image to ImgBB
 * @param options - Upload configuration options
 * @returns Promise resolving to the upload response
 * @throws {Error} When upload fails or API returns an error
 * @example
 * ```typescript
 * const result = await imgbbUpload({
 *   key: 'your-api-key',
 *   image: fileFromInput,
 *   name: 'my-image',
 *   expiration: 600
 * });
 * console.log(result.data.url);
 * ```
 */
const imgbbUpload: imgbbUploadType = async ({
  key,
  image,
  expiration,
  name,
}: ImgbbUploadOptions): Promise<Root> => {
  // Input validation
  if (!key || typeof key !== "string" || key.trim() === "") {
    throw new Error("ImgBB API key is required and must be a non-empty string");
  }

  if (!image || !(image instanceof File)) {
    throw new Error("Image must be a valid File object");
  }

  // Validate image file
  const validImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];
  
  if (validImageTypes.indexOf(image.type) === -1) {
    throw new Error(
      `Invalid image type: ${image.type}. Supported types: JPEG, PNG, GIF, BMP, WEBP`
    );
  }

  // Validate expiration (60 to 15552000 seconds according to ImgBB docs)
  if (expiration !== undefined && expiration !== null) {
    if (typeof expiration !== "number" || expiration < 60 || expiration > 15552000) {
      throw new Error(
        "Expiration must be a number between 60 and 15552000 seconds"
      );
    }
  }

  try {
    // Build query parameters
    const params: Record<string, string> = {
      key: key.trim(),
    };

    if (expiration) {
      params.expiration = expiration.toString();
    }

    if (name && typeof name === "string" && name.trim() !== "") {
      params.name = name.trim();
    }

    // Create FormData
    const formData = new FormData();
    formData.append("image", image);

    // Make API request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let response: Response;
    try {
      response = await fetch(`${IMGBB_API_URL}?${new URLSearchParams(params)}`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        // If parsing error response fails, use default message
      }
      throw new Error(`ImgBB API error: ${errorMessage}`);
    }

    // Parse response
    const data: Root = await response.json();

    // Validate response structure
    if (!data.success || !data.data) {
      throw new Error("Invalid response from ImgBB API");
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Upload timed out after 30 seconds");
      }
      
      // Re-throw validation errors and API errors as-is
      if (error.message.indexOf("ImgBB") !== -1 || error.message.indexOf("Invalid") !== -1 || 
          error.message.indexOf("required") !== -1 || error.message.indexOf("Expiration") !== -1) {
        throw error;
      }
      
      // Wrap network errors
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Unknown error type
    console.error("Unexpected ImgBB API error:", error);
    throw new Error("An unexpected error occurred during image upload");
  }
};

export { imgbbUpload };
export default imgbbUpload;
