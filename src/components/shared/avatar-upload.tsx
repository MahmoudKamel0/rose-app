"use client";

import { useState } from "react";
import { Camera, CloudUpload, Loader2 } from "lucide-react";
import { toast } from "sonner";

type AvatarUploadProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function AvatarUpload({ value, onChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      setIsUploading(true);

      const res = await fetch("/api/upload-photo", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      // ✅ Check JSON response
      if (!res.ok || data.status !== "success") {
        console.error("Upload failed", data);
        toast.error(data.message || "Failed to upload photo");
        return;
      }

      // Update value
      onChange(data.data.url);

      // ✅ Show success toast
      toast.success("Profile photo updated successfully!");

    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUpload(file);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        {/* Avatar Preview */}
        <img
          src={value || "/default-avatar.png"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border"
        />

        {/* Upload Button */}
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 bg-zinc-50 text-zinc-800 text-xs px-2 py-1 rounded-full cursor-pointer"
        >
          {isUploading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
             <CloudUpload size={18} stroke="#27272A" /> 
          )}
        </label>

        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileSelect}
        />
      </div>
       <div>
              <h2 className="text-lg font-semibold">Upload Photo</h2>
              <p className="text-sm text-gray-500">
                You can upload a .jpg, .png, or .gif photo with max size of 5MB.
              </p>
            </div>
    </div>
  );
}
