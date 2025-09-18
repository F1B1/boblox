export function applyMask(id) {
    const inputs = document.querySelectorAll(id);
    let result = ``;
    let lastMeaning = 1;
    let timerError = null;

    if (!inputs[0]) return;

    inputs.forEach(input => {
        input.addEventListener('input', (evt) => {
            const cleanedInput = input.value.replace(/\D/g, '');
            const cleanedLen = cleanedInput.length;
            const resultLen = result.length;
            const inputLen = input.value.length;
            const lastChar = cleanedInput[cleanedInput.length - 1];

            clearTimeout(timerError);
            input.classList.remove('form-input-error');

            if (cleanedInput.length > 11) {
                input.value = lastMeaning;
                return;
            }

            if (cleanedInput.length < 2) {
                if (lastMeaning.length > input.value.length) {
                    result = ``;
                } else {
                    if (+cleanedInput === 8 || +cleanedInput === 7) {
                        result = `+7 (`;
                    } else {
                        result = `+7 (${cleanedInput}`;
                    }
                }
            } else if (input.value.length > lastMeaning.length && input.value[inputLen - 1] === lastChar) {
                if (cleanedLen === 4) {
                    result = result.slice(0, resultLen) + lastChar + ') ';
                } else if (cleanedLen === 5 && !input.value.includes(')')) {
                    result = result.slice(0, resultLen) + ') ' + lastChar;
                } else if (cleanedLen === 7) {
                    result = result.slice(0, resultLen) + lastChar + '-';
                } else if (cleanedLen === 8 && !input.value.includes('-')) {
                    result = result.slice(0, resultLen) + '-' + lastChar;
                } else if (cleanedLen === 9) {
                    result = result.slice(0, resultLen) + lastChar + '-';
                } else if (cleanedLen === 10 && !input.value.slice(-2).includes('-')) {
                    result = result.slice(0, resultLen) + '-' + lastChar;
                } else {
                    result = result.slice(0, resultLen) + lastChar;
                }
            } else if (inputLen < lastMeaning.length) {
                result = result.slice(0, resultLen - 1);
            } else if (cleanedLen === 2) {
                result = '';
            }

            timerError = setTimeout(() => {
                if (cleanedLen < 11) {
                    input.classList.add('form-input-error');
                }
            }, 1500);

            input.value = result;
            lastMeaning = result;
        });
    });
  }
