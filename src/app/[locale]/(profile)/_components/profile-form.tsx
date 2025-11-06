"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
// import { updateUserProfile, deleteAccount } from "./actions";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [initialData, setInitialData] = useState(formData);
  const [isChanged, setIsChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // simulate fetching user data
  useEffect(() => {
    async function fetchUser() {
      // replace with your real API
      const user = {
        firstName: "Jonathan",
        lastName: "Adrian",
        email: "jonathan@gmail.com",
        phone: "01023456789",
        avatar: "/images/profile.jpg",
      };
      setFormData(user);
      setInitialData(user);
    }
    fetchUser();
  }, []);

  // 🧠 check if form changed
  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(initialData);
    setIsChanged(changed);
  }, [formData, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="w-full max-w-2xl">
      {/* Upload Avatar */}
      <div className="flex items-center gap-6 mb-6">
        <Image
          src={formData.avatar || "/images/default-avatar.png"}
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <label
            htmlFor="avatar"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Upload Photo
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData((prev) => ({ ...prev, avatar: imageUrl }));
              }
            }}
          />
          <p className="text-xs text-gray-400">
            You can upload a jpg, png, or gif up to 5MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">First name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Last name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-rose-600 hover:text-rose-700 text-sm"
          >
            Delete My Account
          </button>

          <button
            type="submit"
            disabled={!isChanged}
            className={`px-5 py-2 rounded-lg text-white transition ${
              isChanged
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[350px] text-center">
            <h3 className="text-lg font-semibold mb-2">
              Are you sure you want to delete your account?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Nope, not doing it
              </button>
              <button
                
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
