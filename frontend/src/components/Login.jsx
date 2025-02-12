import React, { useState } from "react";
import { auth, db, provider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // For redirection
import { FcGoogle } from "react-icons/fc"; // Google icon

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize navigate for redirection

    // Handle email/password login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, "users", email));
            if (!userDoc.exists()) {
                toast.error("No user found with this email");
                return;
            }

            // Authenticate the user
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!");
            setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    // Handle Google login
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore
            const userRef = doc(db, "users", user.email);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // If user doesn't exist, create a new document
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                });
            }

            toast.success("Google Sign-In successful!");
            setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
        } catch (error) {
            toast.error("Google Sign-In failed.");
        }
    };

    return (
        <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center">
            <Toaster/> {/* Toast notifications */}
            <div className="w-full max-w-md bg-white rounded-lg p-8">
                <h1 className="font-heading text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-heading">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="font-body w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-heading">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=" font-body w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm  text-gray-800"
                        />
                    </div>
                    <button
                        type="submit"
                        className="font-body w-full border bg-black text-white hover:text-black  hover:bg-white hover:border-black py-2 px-4 rounded-md  "
                    >
                        Login
                    </button>
                </form>
                <hr  className="text-gray my-4 w-full"/>
                <div className="">
                    <button
                        onClick={handleGoogleSignIn}
                        className="font-body flex items-center justify-center w-full border bg-black text-white hover:text-black  hover:bg-white hover:border-black py-2 px-4 rounded-md  focus:outline-none "
                    >
                        <FcGoogle className="mr-2 text-xl" /> {/* Google icon */}
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
