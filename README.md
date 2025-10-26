# 🖼️ sdk-imagebb

[![npm version](https://img.shields.io/npm/v/sdk-imagebb.svg)](https://www.npmjs.com/package/sdk-imagebb)
[![npm downloads](https://img.shields.io/npm/dm/sdk-imagebb.svg)](https://www.npmjs.com/package/sdk-imagebb)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue.svg)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18%7C19-61dafb.svg)](https://reactjs.org/)

> **Modern, lightweight TypeScript library for uploading images to ImgBB API with full React 18 & 19 support**

> ⚠️ **Disclaimer**: This is an **unofficial SDK** for ImgBB. This project is not affiliated with, endorsed by, or sponsored by ImgBB. It is an independent, community-maintained library built for educational and practical purposes.

A powerful and easy-to-use image uploader for ImgBB with zero dependencies. Perfect for React applications, vanilla JavaScript, and TypeScript projects. Features promise-based async/await interface, automatic error handling, and configurable expiration settings.

##  Features

-  **Modern & Lightweight** - Zero dependencies, optimized bundle size
-  **TypeScript First** - Full type safety and IntelliSense support
-  **React 18 & 19 Compatible** - Works seamlessly with latest React versions
-  **Promise-based** - Clean async/await interface
-  **Type-safe** - Complete TypeScript definitions included
-  **Browser Ready** - Works in all modern browsers
-  **Fast & Reliable** - Direct API integration with ImgBB
-  **Configurable** - Optional image name and expiration settings
-  **Error Handling** - Built-in error handling and logging

## 📦 Installation

```bash
npm install sdk-imagebb
```

```bash
yarn add sdk-imagebb
```

```bash
pnpm add sdk-imagebb
```

##  Getting Started

### 1. Get Your ImgBB API Key

1. Create a free account at [ImgBB](https://imgbb.com/)
2. Navigate to the [API documentation page](https://api.imgbb.com/)
3. Generate your API key

### 2. Basic Usage

```typescript
import { imgbbUpload } from "imgbb-image-uploader";

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
        key: process.env.REACT_APP_IMGBB_API_KEY!,
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

### 4. Advanced Usage with Options

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

##  Use Cases

- **React Image Upload Components** - Build drag-and-drop image uploaders
- **Profile Picture Uploads** - Handle user avatars and profile images
- **Content Management Systems** - Upload and manage blog/article images
- **E-commerce Platforms** - Product image uploads
- **Social Media Applications** - User-generated content
- **Form Builders** - Dynamic image upload fields

## 🔧 Requirements

- **Node.js**: >= 18.0.0 (Tested on 18.x, 20.x, 22.x, 24.x)
- **npm**: >= 7.0.0
- **React** (optional): ^18.0.0 || ^19.0.0
- **TypeScript** (optional): >= 5.0.0

##  Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

##  License

This project is [MIT](LICENSE) licensed.

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/sdk-imagebb)
- [GitHub Repository](https://github.com/SupratimRK/sdk-imagebb)
- [Issue Tracker](https://github.com/SupratimRK/sdk-imagebb/issues)
- [ImgBB API Documentation](https://api.imgbb.com/)

## 👤 Author

**Supratim Mondal**
- Email: mail@supratim.me
- GitHub: [@supratimrk](https://github.com/supratimrk)
- Website: [supratim.me](https://supratim.me)

## ⚠️ Disclaimer

This is an **unofficial SDK** and is not affiliated with, endorsed by, or sponsored by ImgBB. This project is maintained independently for educational and practical purposes. Use of ImgBB's services is subject to their terms of service.

##  Show Your Support

Give a  if this project helped you!

---

**Keywords**: imgbb, imgbb-api, sdk-imagebb, image-upload, image-hosting, react, react-18, react-19, typescript, file-upload, cdn, image-cdn, cloud-storage, browser-upload, imgbb-client, unofficial-sdk

<!-- Updated on 27-10-2025 -->