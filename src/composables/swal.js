import Swal from 'sweetalert2';

export function useNotification() {
  const showAlert = (type, message) => {
    Swal.fire({
      icon: type,
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      padding: '2em',
    });
  };

  return { showAlert };
}
