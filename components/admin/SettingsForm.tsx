"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function SettingsForm() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [logo, setLogo] = useState("");

const [facebook, setFacebook] = useState("");
const [instagram, setInstagram] = useState("");
const [linkedin, setLinkedin] = useState("");
const [youtube, setYoutube] = useState("");
const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    
    try {
      const ref = doc(db, "settings", "company");

      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setCompanyName(data.companyName || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
        setWorkingHours(data.workingHours || "");
        setLogo(data.logo || "");
        setFacebook(data.facebook || "");
        setInstagram(data.instagram || "");
        setLinkedin(data.linkedin || "");
        setYoutube(data.youtube || "");
        setWhatsapp(data.whatsapp || "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadLogo = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    setLogo(res.data.secure_url);

    alert("Logo Uploaded Successfully");
  } catch (error) {
    console.error(error);

    alert("Upload Failed");
  }
};
const saveSettings = async () => {
    try {
      await setDoc(doc(db, "settings", "company"), {
        companyName,
        phone,
        email,
        address,
        workingHours,
        logo,

facebook,
instagram,
linkedin,
youtube,
whatsapp,
      });

      alert("Settings Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Save Settings");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Company Settings
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />
        <div className="space-y-4">

  <label className="block text-gray-300">
    Company Logo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={uploadLogo}
    className="w-full bg-slate-800 p-3 rounded-lg"
  />

  {logo && (
    <Image
      src={logo}
      alt="Company Logo"
      width={140}
      height={140}
      className="rounded-xl border border-slate-700 object-contain"
    />
  )}

</div>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <textarea
          placeholder="Company Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
          rows={4}
        />

        <input
          type="text"
          placeholder="Working Hours"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded-lg"
        />
        <input
  type="text"
  placeholder="Facebook URL"
  value={facebook}
  onChange={(e) => setFacebook(e.target.value)}
  className="w-full bg-slate-800 p-3 rounded-lg"
/>

<input
  type="text"
  placeholder="Instagram URL"
  value={instagram}
  onChange={(e) => setInstagram(e.target.value)}
  className="w-full bg-slate-800 p-3 rounded-lg"
/>

<input
  type="text"
  placeholder="LinkedIn URL"
  value={linkedin}
  onChange={(e) => setLinkedin(e.target.value)}
  className="w-full bg-slate-800 p-3 rounded-lg"
/>

<input
  type="text"
  placeholder="YouTube URL"
  value={youtube}
  onChange={(e) => setYoutube(e.target.value)}
  className="w-full bg-slate-800 p-3 rounded-lg"
/>

<input
  type="text"
  placeholder="WhatsApp URL"
  value={whatsapp}
  onChange={(e) => setWhatsapp(e.target.value)}
  className="w-full bg-slate-800 p-3 rounded-lg"
/>

        <button
          onClick={saveSettings}
          className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-bold"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}