"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
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
    <div className="flex flex-col items-center gap-3">
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
          className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer"
        >
          {isUploading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            "Upload"
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
    </div>
  );
}
