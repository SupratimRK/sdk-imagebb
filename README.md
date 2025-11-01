# 🖼️ sdk-imagebb

[![npm version](https://img.shields.io/npm/v/sdk-imagebb.svg)](https://www.npmjs.com/package/sdk-imagebb)
[![npm downloads](https://img.shields.io/npm/dm/sdk-imagebb.svg)](https://www.npmjs.com/package/sdk-imagebb)
[![JSR](https://jsr.io/badges/@supratimrk/sdk-imagebb)](https://jsr.io/@supratimrk/sdk-imagebb)
[![JSR Score](https://jsr.io/badges/@supratimrk/sdk-imagebb/score)](https://jsr.io/@supratimrk/sdk-imagebb)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)
[![React 18](https://img.shields.io/badge/React-18%2B-61dafb.svg)](https://reactjs.org/)

> **Modern, lightweight TypeScript library for uploading images to ImgBB API with full React 18 & 19 support**

> ⚠️ **Disclaimer**: This is an **unofficial SDK** for ImgBB. This project is not affiliated with, endorsed by, or sponsored by ImgBB. It is an independent, community-maintained library built for educational and practical purposes.

A powerful and easy-to-use image uploader for ImgBB with zero dependencies. Perfect for React applications, vanilla JavaScript, and TypeScript projects. Features promise-based async/await interface, automatic error handling, and configurable expiration settings.

##  Features

-  **Modern & Lightweight** - Zero external dependencies, uses native browser/Node.js APIs
-  **TypeScript First** - Full type safety and IntelliSense support
-  **React 18 & 19 Compatible** - Works seamlessly with latest React versions
-  **Promise-based** - Clean async/await interface
-  **Type-safe** - Complete TypeScript definitions included
-  **Browser Ready** - Works in all modern browsers
-  **Fast & Reliable** - Direct API integration with ImgBB
-  **Configurable** - Optional image name and expiration settings
-  **Error Handling** - Built-in error handling and logging

## 📦 Installation

### npm
```bash
npm install sdk-imagebb
```

### yarn
```bash
yarn add sdk-imagebb
```

### pnpm
```bash
pnpm add sdk-imagebb
```

### JSR (Deno/Node.js)
```bash
# Using npm/pnpm/yarn
npx jsr add @supratimrk/sdk-imagebb

# Using Deno
deno add @supratimrk/sdk-imagebb

# Using import maps
{
  "imports": {
    "@supratimrk/sdk-imagebb": "jsr:@supratimrk/sdk-imagebb@^1.0.2"
  }
}
```

## 🚀 Publishing

This package is published to both **npm** and **JSR** registries:

- **npm**: `npm install sdk-imagebb`
- **JSR**: `npx jsr add @supratimrk/sdk-imagebb` or `deno add @supratimrk/sdk-imagebb`

##  Getting Started

### 1. Get Your ImgBB API Key

1. Create a free account at [ImgBB](https://imgbb.com/)
2. Navigate to the [API documentation page](https://api.imgbb.com/)
3. Generate your API key

> ⚠️ **Security Warning**: Never expose your ImgBB API key in frontend/client-side code. API keys should be kept secret and only used in server-side environments. For web applications, implement image uploads through your backend API to prevent key exposure.

### 2. Basic Usage

```typescript
import { imgbbUpload } from "sdk-imagebb";

// Simple upload
const uploadImage = async (file: File) => {
  try {
    const response = await imgbbUpload({
      key: "your-api-key",
      image: file,
    });
    
    console.log("Image URL:", response.data.url);
    console.log("Display URL:", response.data.display_url);
    console.log("Delete URL:", response.data.delete_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### 3. React Example

```tsx
import React, { useState } from "react";
import { imgbbUpload } from "sdk-imagebb";

const ImageUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await imgbbUpload({
        key: process.env.IMGBB_API_KEY!,
        image: file,
        name: file.name,
      });
      
      setImageUrl(response.data.display_url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUploader;
```

> **Note**: This React example assumes you're using a framework like Next.js where `process.env` variables are securely handled on the server-side. For client-side only React applications, implement the upload logic in your backend API to keep the API key secure.

### 4. Node.js Example

```typescript
import { imgbbUpload } from "sdk-imagebb";
import { readFileSync } from "fs";
import { resolve } from "path";

const uploadImageFromFile = async (filePath: string) => {
  try {
    // Read the image file from disk
    const imageBuffer = readFileSync(resolve(filePath));
    
    // Create a File-like object for Node.js (requires Node.js 20+)
    const file = new File([imageBuffer], "image.jpg", { type: "image/jpeg" });
    
    const response = await imgbbUpload({
      key: process.env.IMGBB_API_KEY!,
      image: file,
      name: "node-upload-example",
      expiration: 3600, // 1 hour
    });
    
    console.log("Upload successful!");
    console.log("Image URL:", response.data.url);
    console.log("Display URL:", response.data.display_url);
    console.log("Delete URL:", response.data.delete_url);
    
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

// Usage
uploadImageFromFile("./path/to/your/image.jpg")
  .then((data) => console.log("Image uploaded:", data.url))
  .catch((error) => console.error("Error:", error));
```

> **Note**: The `File` API is available in Node.js 20+. For Node.js 18, you'll need to use a polyfill or alternative approach for creating File objects.

### 5. Deno Example

```typescript
import { imgbbUpload } from "@supratimrk/sdk-imagebb";

// Read the image file from disk
const imageBuffer = await Deno.readFile("./path/to/your/image.jpg");

// Create a File-like object for Deno
const file = new File([imageBuffer], "image.jpg", { type: "image/jpeg" });

const response = await imgbbUpload({
  key: Deno.env.get("IMGBB_API_KEY")!,
  image: file,
  name: "deno-upload-example",
  expiration: 3600, // 1 hour
});

console.log("Upload successful!");
console.log("Image URL:", response.data.url);
```

### 6. Vanilla JavaScript Example

```javascript
import { imgbbUpload } from "sdk-imagebb";

// HTML: <input type="file" id="fileInput" accept="image/*">

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const response = await imgbbUpload({
      key: 'your-api-key', // Never expose in production! Use backend instead
      image: file,
      name: file.name,
    });

    console.log('Upload successful!');
    console.log('Image URL:', response.data.url);
    
    // Display the uploaded image
    const img = document.createElement('img');
    img.src = response.data.display_url;
    document.body.appendChild(img);
  } catch (error) {
    console.error('Upload failed:', error.message);
    alert('Failed to upload image');
  }
});
```

### 7. Advanced Usage with Options

```typescript
import { imgbbUpload } from "sdk-imagebb";

const uploadWithOptions = async (file: File) => {
  const response = await imgbbUpload({
    key: "your-api-key",
    image: file,
    name: "custom-image-name", // Optional: Custom name for the image
    expiration: 600, // Optional: Auto-delete after 600 seconds (10 minutes)
  });

  return response;
};
```

##  Supported Formats & Limitations

### Supported Image Formats

sdk-imagebb supports all major image formats accepted by ImgBB:

- **JPEG/JPG** - `.jpg`, `.jpeg`
- **PNG** - `.png`
- **GIF** - `.gif` (including animated)
- **BMP** - `.bmp`
- **WEBP** - `.webp`

### File Size & Expiration Limits

| Limit Type | Value | Description |
|------------|-------|-------------|
| **Max File Size** | 32 MB | Maximum image file size (free tier) |
| **Min Expiration** | 60 seconds | Minimum auto-deletion time |
| **Max Expiration** | 15,552,000 seconds | Maximum auto-deletion time (~180 days) |
| **Default Expiration** | None | Images are permanent unless specified |

> **Note**: File size limits may vary based on your ImgBB account type. Free accounts support up to 32MB per image.

### API Rate Limits

ImgBB enforces rate limits to ensure fair usage:

- **Free Tier**: Standard rate limits apply (exact limits not publicly documented)
- **Request Frequency**: Avoid making excessive requests in short periods
- **Concurrent Uploads**: Limit concurrent uploads to avoid throttling
- **Best Practice**: Implement exponential backoff for failed requests

> **Tip**: If you hit rate limits, consider implementing a queue system for batch uploads or upgrading your ImgBB account.

##  API Reference

### `imgbbUpload(options: ImgbbUploadOptions): Promise<Root>`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | `string` |  Yes | Your ImgBB API key |
| `image` | `File` |  Yes | The image file to upload (from file input) |
| `name` | `string` |  No | Custom name for the uploaded image |
| `expiration` | `number` |  No | Auto-deletion time in seconds (e.g., 600 for 10 minutes) |

#### Response Type

```typescript
interface Root {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}
```

#### Example Response

```json
{
  "data": {
    "id": "2ndCYJK",
    "title": "c1f64245afb2",
    "url_viewer": "https://ibb.co/2ndCYJK",
    "url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
    "display_url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
    "width": "1920",
    "height": "1080",
    "size": "42",
    "time": "1552042565",
    "expiration": "600",
    "image": {
      "filename": "c1f64245afb2.gif",
      "name": "c1f64245afb2",
      "mime": "image/gif",
      "extension": "gif",
      "url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif"
    },
    "thumb": {
      "filename": "c1f64245afb2.gif",
      "name": "c1f64245afb2",
      "mime": "image/gif",
      "extension": "gif",
      "url": "https://i.ibb.co/2ndCYJK/c1f64245afb2.gif"
    },
    "medium": {
      "filename": "c1f64245afb2.gif",
      "name": "c1f64245afb2",
      "mime": "image/gif",
      "extension": "gif",
      "url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif"
    },
    "delete_url": "https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c"
  },
  "success": true,
  "status": 200
}
```

## 🛡️ Error Handling

The library includes comprehensive error handling with descriptive error messages to help you debug issues quickly.

### Common Errors

#### Invalid API Key
```typescript
// Error: ImgBB API key is required and must be a non-empty string
await imgbbUpload({ key: "", image: file });
```

#### Invalid File Type
```typescript
// Error: Invalid image type: application/pdf. Supported types: JPEG, PNG, GIF, BMP, WEBP
await imgbbUpload({ key: "your-key", image: pdfFile });
```

#### Invalid Expiration
```typescript
// Error: Expiration must be a number between 60 and 15552000 seconds
await imgbbUpload({ key: "your-key", image: file, expiration: 30 });
```

#### Upload Timeout
```typescript
// Error: Upload timed out after 30 seconds
// Occurs when network is slow or file is too large
```

#### API Errors
```typescript
// Error: ImgBB API error: HTTP 403: Forbidden
// Check your API key or account status
```

### Best Practices

```typescript
import { imgbbUpload } from "sdk-imagebb";

const uploadWithErrorHandling = async (file: File) => {
  try {
    const response = await imgbbUpload({
      key: process.env.IMGBB_API_KEY!,
      image: file,
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    if (error instanceof Error) {
      // Log specific error for debugging
      console.error("Upload failed:", error.message);
      
      // Return user-friendly message
      if (error.message.includes("timeout")) {
        return { success: false, error: "Upload is taking too long. Please try again." };
      } else if (error.message.includes("Invalid image type")) {
        return { success: false, error: "Please select a valid image file." };
      } else if (error.message.includes("API key")) {
        return { success: false, error: "Configuration error. Please contact support." };
      }
    }
    
    return { success: false, error: "An unexpected error occurred." };
  }
};
```

##  Use Cases

- **React Image Upload Components** - Build drag-and-drop image uploaders
- **Profile Picture Uploads** - Handle user avatars and profile images
- **Content Management Systems** - Upload and manage blog/article images
- **E-commerce Platforms** - Product image uploads
- **Social Media Applications** - User-generated content
- **Form Builders** - Dynamic image upload fields

## 🔧 Requirements

- **Node.js**: >= 18.0.0 (Node.js 20+ recommended for native File API support)
- **npm**: >= 7.0.0
- **React** (optional): ^18.0.0 || ^19.0.0
- **TypeScript** (optional): >= 5.0.0

### Browser Support

sdk-imagebb works in all modern browsers that support:

| Browser | Minimum Version |
|---------|----------------|
| **Chrome** | 76+ |
| **Firefox** | 69+ |
| **Safari** | 12.1+ |
| **Edge** | 79+ |
| **Opera** | 63+ |

**Required Browser APIs:**
- `FormData` API
- `Fetch` API
- `File` API
- `AbortController` (for timeout handling)

> **Note**: Internet Explorer is not supported. For legacy browser support, consider using polyfills for Fetch and AbortController.


##  Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 🔍 Troubleshooting

### Common Issues and Solutions

#### "ImgBB API key is required"
**Problem**: API key is missing or empty.  
**Solution**: Ensure you're passing a valid API key from your ImgBB account.
```typescript
// ❌ Wrong
await imgbbUpload({ key: "", image: file });

// ✅ Correct
await imgbbUpload({ key: "your-valid-api-key", image: file });
```

#### "Upload timed out after 30 seconds"
**Problem**: Network is slow or file is too large.  
**Solution**: 
- Check your internet connection
- Try uploading a smaller file (max 32MB)
- Consider compressing the image before upload

#### "Invalid image type"
**Problem**: File format is not supported.  
**Solution**: Only use JPEG, PNG, GIF, BMP, or WEBP formats.
```typescript
// Check file type before uploading
const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
if (!validTypes.includes(file.type)) {
  console.error('Unsupported file type');
}
```

#### "HTTP 403: Forbidden"
**Problem**: Invalid API key or account issue.  
**Solution**: 
- Verify your API key is correct
- Check your ImgBB account status
- Ensure your account hasn't exceeded rate limits

#### CORS Issues (Browser)
**Problem**: CORS errors when uploading from frontend.  
**Solution**: ImgBB API supports CORS, but for security, implement uploads through your backend:
```typescript
// Frontend - send file to your backend
const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

// Backend - handle upload to ImgBB
// (keeps API key secure)
```

#### "Expiration must be a number between 60 and 15552000 seconds"
**Problem**: Invalid expiration value.  
**Solution**: Use a value between 60 seconds (1 minute) and 15,552,000 seconds (180 days).
```typescript
// ❌ Wrong
await imgbbUpload({ key: "key", image: file, expiration: 30 });

// ✅ Correct
await imgbbUpload({ key: "key", image: file, expiration: 3600 }); // 1 hour
```

#### File Upload Fails with No Error Message
**Problem**: Silent failure or network issue.  
**Solution**: 
- Check browser console for detailed errors
- Verify file is not corrupted
- Test with a different image
- Check if file size exceeds 32MB

### Still Having Issues?

If you encounter problems not listed here:
1. Check the [Issue Tracker](https://github.com/SupratimRK/sdk-imagebb/issues) for similar problems
2. Review the [ImgBB API Documentation](https://api.imgbb.com/) for API-specific limits
3. Open a new issue with:
   - Clear description of the problem
   - Code sample that reproduces the issue
   - Error messages (if any)
   - Environment details (Node.js version, browser, OS)

##  License

This project is [MIT](LICENSE) licensed.

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/sdk-imagebb)
- [JSR Package](https://jsr.io/@supratimrk/sdk-imagebb)
- [GitHub Repository](https://github.com/SupratimRK/sdk-imagebb)
- [Issue Tracker](https://github.com/SupratimRK/sdk-imagebb/issues)
- [Changelog](https://github.com/SupratimRK/sdk-imagebb/blob/main/CHANGELOG.md)
- [Contributing Guide](https://github.com/SupratimRK/sdk-imagebb/blob/main/CONTRIBUTING.md)
- [ImgBB API Documentation](https://api.imgbb.com/)

## 👤 Author

**Supratim Mondal**
- Email: mail@supratim.me
- GitHub: [@supratimrk](https://github.com/supratimrk)
- Website: [supratim.me](https://supratim.me)

## ⚠️ Disclaimer

This is an **unofficial SDK** and is not affiliated with, endorsed by, or sponsored by ImgBB. This project is maintained independently for educational and practical purposes. Use of ImgBB's services is subject to their terms of service.

##  Show Your Support

Give a ⭐ if this project helped you!

---

**Keywords**: imgbb, imgbb-api, sdk-imagebb, image-upload, image-hosting, react, react-18, react-19, typescript, file-upload, cdn, image-cdn, cloud-storage, browser-upload, imgbb-client, unofficial-sdk

<!-- Updated on 01-11-2025 -->