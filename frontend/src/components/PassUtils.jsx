import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const baseURL = "http://localhost:3002";

export const savePass = async (form) => {
    const newPassword = { ...form, id: uuidv4() }; 
    let res = await fetch(`${baseURL}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPassword)
    });
};

export const getPass = async () => {
    try {
        let req = await fetch(`${baseURL}/`);
        if (!req.ok) {throw new Error(`Failed to fetch passwords: ${req.statusText}`);}
        let pass = await req.json();
        return pass; 
    } 
    catch (error) {
        toast.error("Error fetching passwords. Please check if the server is running and reachable.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
        return [];
    }
};

export const deletePass = async (id) => {
    let confirmation = confirm("Are you sure you want to delete this password?");
    if (confirmation) {
        try {
            let res = await fetch(`${baseURL}/passwords/${id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                const updatedPasswords = await getPass();
                localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
                toast.success("Password Deleted Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
                });
                return updatedPasswords;
            } else {
                const errorData = await res.json();
                toast.error("Failed to delete password on the server: " + (errorData.message || res.statusText), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                    transition: Bounce,
                });
                return await getPass(); 
            }
        } catch (error) {
            toast.error("Error deleting password. Please try again later.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
            return await getPass();
        }
    } else {
        return await getPass();
    }
};

export const updatePass = async (updatePass) => {
    let res = await fetch(`${baseURL}/passwords/${updatePass.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatePass)
    });

    if (!res.ok) {
        throw new Error("Failed to update password on the server.");
    }

    const passToUpdate = await getPass();

    localStorage.setItem("passwords", JSON.stringify(passToUpdate));
    return passToUpdate;
};

export const copyPass = (pass) => {
    const textToCopy = `Username: ${pass.username}\nSite: ${pass.site}\nPassword: ${pass.password}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        toast.success("Password details copied to clipboard!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
    }).catch((err) => {
        toast.error("Failed to copy password details.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
        });
    });
};

export const ToastContainerComponent = () => (
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        style={{ fontSize: "12px" }}
    />
);

export const scrollToTop = () => {
    const tableContainer = document.querySelector('.table-container');
    let currentPosition = tableContainer.scrollTop;
    const scrollStep = currentPosition / 50; 
    const scrollInterval = setInterval(() => {
        
        if (currentPosition > 0) {
            currentPosition -= scrollStep;
            tableContainer.scrollTo({ top: currentPosition, behavior: 'auto' });
        } 
        else {
            clearInterval(scrollInterval);
        }
    }, 10);
};

export const scrollToBottom = () => {
    const tableContainer = document.querySelector('.table-container');
    const targetPosition = tableContainer.scrollHeight - tableContainer.clientHeight;
    let currentPosition = tableContainer.scrollTop;
    const scrollStep = (targetPosition - currentPosition) / 50;
    const scrollInterval = setInterval(() => {
        
        if (currentPosition < targetPosition) {
            currentPosition += scrollStep;
            tableContainer.scrollTo({ top: currentPosition, behavior: 'auto' });
        } 
        else {
            clearInterval(scrollInterval);
        }
    }, 10);
};
