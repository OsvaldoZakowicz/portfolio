// referencias del dom
const contactForm = document.querySelector('#contact-form');

// guard: si el formulario no existe, el modulo no se inicializa
if (!contactForm) {
  console.warn(
    'form-validation.js: formulario no encontrado, modulo no inicializado',
  );
} else {
  // limite maximo de caracteres para el mensaje
  const MESSAGE_MAX_LENGTH = 500;

  // patron strategy: cada regla recibe el valor del campo y retorna
  // un mensaje de error, o cadena vacia si el valor es valido
  const validationStrategies = {
    name: (value) => {
      if (value.trim() === '') {
        return 'el nombre es obligatorio';
      }
      return '';
    },

    email: (value) => {
      if (value.trim() === '') {
        return 'el email es obligatorio';
      }
      // patron simple de validacion de formato de email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'el formato del email no es valido';
      }
      return '';
    },

    message: (value) => {
      if (value.trim() === '') {
        return 'el mensaje es obligatorio';
      }
      if (value.length > MESSAGE_MAX_LENGTH) {
        return `el mensaje no puede superar los ${MESSAGE_MAX_LENGTH} caracteres`;
      }
      return '';
    },
  };

  // muestra un mensaje de error en el span asociado al campo
  function showError(field, message) {
    const errorElement = document.querySelector(`#${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
    field.setAttribute('aria-invalid', 'true');
  }

  // limpia el mensaje de error del campo
  function clearError(field) {
    const errorElement = document.querySelector(`#${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
    field.removeAttribute('aria-invalid');
  }

  // valida un campo individual aplicando su estrategia correspondiente
  function validateField(field) {
    const strategy = validationStrategies[field.name];
    if (!strategy) {
      return true;
    }

    const errorMessage = strategy(field.value);

    if (errorMessage) {
      showError(field, errorMessage);
      return false;
    }

    clearError(field);
    return true;
  }

  // valida todos los campos del formulario y retorna si es valido en conjunto
  function validateForm() {
    const fields = contactForm.querySelectorAll('input[name], textarea[name]');
    let isFormValid = true;

    fields.forEach((field) => {
      // el campo honeypot no se valida
      if (field.name === 'bot-field') {
        return;
      }

      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  // listener de envio: valida y previene el submit si hay errores
  contactForm.addEventListener('submit', (e) => {
    const isValid = validateForm();

    if (!isValid) {
      e.preventDefault();

      // enfoca el primer campo invalido para asistir la correccion
      const firstInvalidField = contactForm.querySelector(
        '[aria-invalid="true"]',
      );
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  });
}
