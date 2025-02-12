import React, { useState } from "react";
import { auth, db, provider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FcGoogle } from "react-icons/fc";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize navigate for redirection

    // Handle email/password sign-up
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Create user with email and password in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Use the email as the document ID in Firestore
            await setDoc(doc(db, "users", email), {
                uid: user.uid, // Store the Firebase Auth UID
                email: user.email, // Store the email
                password: password, // Optionally store the password (not recommended for production)
                createdAt: new Date(),
            });

            toast.success("Signup successful!");
            setTimeout(() => navigate("/"), 2000); // Redirect to home page after 2 seconds
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Handle Google sign-up
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
            setTimeout(() => navigate("/"), 2000); // Redirect to home page after 2 seconds
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center">
            <Toaster /> {/* Toast notifications */}
            <div className="w-full max-w-md bg-white rounded-lg p-8">
                <h1 className="font-heading text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-6">
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
                            className="font-body w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800"
                        />
                    </div>
                    <button
                        type="submit"
                        className="font-body w-full border bg-black text-white hover:text-black hover:bg-white hover:border-black py-2 px-4 rounded-md"
                    >
                        Sign Up
                    </button>
                </form>
                <hr className="text-gray my-4 w-full" />
                <div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="font-body flex items-center justify-center w-full border bg-black text-white hover:text-black hover:bg-white hover:border-black py-2 px-4 rounded-md focus:outline-none"
                    >
                        <FcGoogle className="mr-2 text-xl" /> {/* Google icon */}
                        Sign Up with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
