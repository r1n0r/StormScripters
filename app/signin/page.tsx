"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is already signed in
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost/JunctionX/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success && data.full_name) {
        setUserName(data.full_name);
        localStorage.setItem("userName", data.full_name);
        setEmail("");
        setPassword("");
        // Redirect to homepage
        window.location.href = '/';
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem("userName");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                {userName ? (
                  <>
                    <p className="mb-6 text-center text-lg font-medium text-body-color">
                      Hello <b>{userName}</b>
                    </p>
                    <button onClick={handleLogout} className="mb-6 w-full rounded bg-red-500 px-4 py-2 text-white">Logout</button>
                  </>
                ) : (
                  <>
                    <p className="mb-11 text-center text-base font-medium text-body-color">
                      Login to your account for a faster checkout.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-8">
                        <label htmlFor="email" className="mb-3 block text-sm text-dark dark:text-white">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Enter your Email"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          required
                        />
                      </div>
                      <div className="mb-8">
                        <label htmlFor="password" className="mb-3 block text-sm text-dark dark:text-white">
                          Your Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Enter your Password"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <button type="submit" className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90" disabled={loading}>
                          {loading ? "Signing in..." : "Sign in"}
                        </button>
                      </div>
                      {message && <p className="text-center text-base font-medium text-body-color">{message}</p>}
                    </form>
                  </>
                )}
                <p className="text-center text-base font-medium text-body-color">
                  Don't you have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
