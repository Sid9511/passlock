import { useRef, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { savePass, ToastContainerComponent } from "./PassUtils";
import Button from "../assets/Button";
import eye from "../assets/eye.svg";
import closedeye from "../assets/closedeye.svg";



const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};


const Home = () => {    
    const eyeRef = useRef(null);
    const passwordRef = useRef(null);
    const [form, setForm] = useState({ username: "", site: "", password: "" });
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const showPass = () => {
        if (eyeRef.current.src.includes(closedeye)) {
            eyeRef.current.src = eye;
            passwordRef.current.type = "text";
        } 
        else {
            eyeRef.current.src = closedeye;
            passwordRef.current.type = "password";
        }
    };
    
    const handleSave = () => {
        setForm({ username: "", site: "", password: "" });

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            toast.success("Password saved, Go to Passwords to see the saved password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            savePass(form);
        } 
        else {
            toast.error("Error: Password not saved | Username, Site, Password should be greater than 3 words.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    };


    return (
        <>
            <div className="justify-center m-5 mt-3">
                <ToastContainerComponent />
                <h1 className="text-3xl text-white font-bold text-center">
                    <span className="text-blue-400 text-3xl">&lt;</span>
                    Pass
                    <span className="text-blue-400 text-3xl">Lock/&gt;</span>
                </h1>
                <p className="text-center text-white text-xs opacity-80 m-3">
                    Your Own Personal Password Manager
                </p>
            </div>

            <div className="w-[80%] p-5 justify-center mx-auto rounded-2xl shadow-input bg-met-grey dark:bg-black">
                <LabelInputContainer className="mb-6 ">
                    <Label className="text-white text-base m-1" htmlFor="site">
                        Website URL
                    </Label>
                    <Input
                        className="text-xs"
                        id="site"
                        placeholder="projectmayhem@fc.com"
                        type="text"
                        value={form.site}
                        onChange={handleChange}
                        name="site"
                    />
                </LabelInputContainer>

                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-5">
                    <LabelInputContainer>
                        <Label className="text-white text-base m-1" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            className="text-xs"
                            id="username"
                            placeholder="TylerDurden"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label className="text-white text-base m-1" htmlFor="password">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                className="text-xs"
                                id="password"
                                placeholder="Durden10"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                                ref={passwordRef}
                            />
                            <img
                                className="absolute top-3 right-2 w-5 h-5 cursor-pointer"
                                src={closedeye}
                                alt="eye"
                                onClick={showPass}
                                ref={eyeRef}
                            />
                        </div>
                    </LabelInputContainer>
                </div>
            </div>

            <div className="flex justify-center items-center m-8">
                <Button className="flex justify-center text-xs items-center gap-1" onClick={handleSave}>
                    <lord-icon
                        src="https://cdn.lordicon.com/hqymfzvj.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                    ></lord-icon>
                    Add Password
                </Button>
            </div>
        </>
    );
};

export default Home;
