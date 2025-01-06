// "use client";
// import { useEffect, useState } from "react";
// import { User, Mail, Save } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { getUserByEmail, updateUser } from "@/utils/db/actions";

// type UserSettings = {
//   id: number;
//   name: string;
//   email: string;
// };

// export default function SettingsPage() {
//   const [userInfo, setUserInfo] = useState<any>(null);
//   const [settings, setSettings] = useState<UserSettings>({
//     id: 0,
//     name: "John Doe",
//     email: "john.doe@example.com",
//   });

//   // Handle input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setSettings((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Fetch user details based on stored email
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const email = localStorage.getItem("userEmail");
//         if (email) {
//           const user = await getUserByEmail(email);
//           if (user) {
//             setUserInfo(user);
//             setSettings({
//               id: user.id || 0,
//               name: user.name || "",
//               email: user.email || "",
             
//             });
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     checkUser();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await updateUser(settings.id, settings.name, settings.email);
//       alert("Settings updated successfully!");
//     } catch (error) {
//       console.error("Error updating settings:", error);
//       alert("Failed to update settings. Please try again later.");
//     }
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-semibold mb-6 text-gray-800">
//         Account Settings
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Full Name */}
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Full Name
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={settings.name}
//               onChange={handleInputChange}
//               className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//             />
//             <User
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               size={18}
//             />
//           </div>
//         </div>

//         {/* Email Address */}
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email Address
//           </label>
//           <div className="relative">
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={settings.email}
//               onChange={handleInputChange}
//               className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
//             />
//             <Mail
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               size={18}
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           className="w-full bg-green-500 hover:bg-green-600 text-white"
//         >
//           <Save className="w-4 h-4 mr-2" />
//           Save Changes
//         </Button>
//       </form>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { User, Mail, Save, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserByEmail, updateUser } from "@/utils/db/actions";

type UserSettings = {
  id: number;
  name: string;
  email: string;
};

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [settings, setSettings] = useState<UserSettings>({
    id: 0,
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [loading, setLoading] = useState<boolean>(true); // Loader state

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fetch user details based on stored email
  useEffect(() => {
    const checkUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (email) {
          const user = await getUserByEmail(email);
          if (user) {
            setUserInfo(user);
            setSettings({
              id: user.id || 0,
              name: user.name || "",
              email: user.email || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loader when data fetching is complete
      }
    };

    checkUser();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(settings.id, settings.name, settings.email);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings. Please try again later.");
    }
  };

  if (loading) {
    // Display loader while fetching data
    return (
      <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin h-8 w-8 text-gray-600" />
    </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Account Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={settings.name}
              onChange={handleInputChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </form>
    </div>
  );
}
