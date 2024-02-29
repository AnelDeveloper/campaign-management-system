import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomToastProps {
    content: string;
}

export const useCustomToast = (): ((content: string) => void) => {
    const notify = (content: string) => {
        toast(<CustomToast content={content} />);
    };

    return notify;
};

const CustomToast: React.FC<CustomToastProps> = ({ content }) => {
    return (
        <div>
            {content}
        </div>
    );
};

export const Notifications: React.FC = () => {
    return <ToastContainer />;
};

export default useCustomToast;
