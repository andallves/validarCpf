const btnValidate = document.querySelector('.btn-validate');


btnValidate.addEventListener('click', (e) => {
  const inputCpf = document.querySelector('.cpf');
  const cpfInput = inputCpf.value;
  const cpf = new ValidateCpf(cpfInput);
  const validate = cpf.validate() ? 'CPF válido!' : 'CPF inválido!';
  answer(validate);
  setTimeout(() => {
    clearInterval(answer())
  }, 2000);
});

const answer = (msg) => {
  const answer = document.querySelector('.answer');
  answer.innerHTML = '';

  const p = document.createElement('p');
  p.innerHTML = '';
  p.innerHTML = msg;
  answer.appendChild(p);
}


function ValidateCpf(sendCpf) {
  Object.defineProperty(this, 'clearCpf', {
    get: function () {
      return sendCpf.replace(/\D+/g, '');
    }
  });
}

ValidateCpf.prototype.validate = function () {
  if (typeof this.clearCpf === 'undefined') return false;
  if (this.clearCpf.length !== 11) return false;

  const halfCpf = this.clearCpf.slice(0, -2);
  const digit1 = this.createDigit(halfCpf);
  const digit2 = this.createDigit(halfCpf + digit1);

  const newCpf = halfCpf + digit1 + digit2;

  if (this.clearCpf !== newCpf) return false;

  return true;
}

ValidateCpf.prototype.createDigit = function (halfCpf) {
  const arrayCpf = Array.from(halfCpf);

  let regressive = arrayCpf.length + 1;
  const total = arrayCpf.reduce((ac, val) => {
    ac += Number(val) * regressive;
    regressive--
    return ac
  }, 0);

  const digit = 11 - (total % 11);
  return digit > 9 ? '0' : String(digit);
}


// cpf.validate();