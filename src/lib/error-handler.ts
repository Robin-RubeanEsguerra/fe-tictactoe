import axios from "axios";
import { toast } from "sonner";

export const handleErrorWithToast = (error: unknown) => {
  const message = axios.isAxiosError(error)
    ? error.response?.data?.message || error.message
    : error instanceof Error
    ? error.message
    : typeof error === "string"
    ? error
    : "An unexpected error occurred";

  toast.error(message);
};