// showErrorDialog.ts
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const showErrorDialog = ({
  error,
  actionText = "OK",
}: {
  error: Error | string;
  actionText?: string;
}) => {
  const message = error instanceof Error ? error.message : error;

  return Swal.fire({
    icon: "error",
    title: "An error has occurred",
    text: message,
    confirmButtonText: actionText,
    confirmButtonColor: "#dc9b46",
    allowEscapeKey: false,
    allowOutsideClick: false,
    showClass: {
      popup: '',
    },
    hideClass: {
      popup: '', 
    },
  });
};


export const showErrorWithToast = (params: { error: Error | string }) => {
  const message = params.error instanceof Error ? params.error.message : params.error;
  toast.error(message);
};
