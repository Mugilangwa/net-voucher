import Swal from 'sweetalert2';

export function useNotification() {
  const showAlert = (type, message) => {
      const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                animation: true,
                padding: '2em',
                timerProgressBar: true,
            });
            toast.fire({
                icon: type,
                title: message,
                padding: '2em',
            });
  };

  const showNotification = (type, message, desc) => {
     new window.Swal({
                icon: type,
                title: message,
                text: desc,
                padding: '2em',
            });
  };
  return { showAlert ,showNotification };
}
