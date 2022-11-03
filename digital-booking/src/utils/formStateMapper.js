export function formStateMapper(form) {
    let formStateless = {};

    Object.keys(form).forEach((key) => {
        if (form[key].state[0] !== null) {
            formStateless[key] = form[key].state[0]
        }
    })

    return formStateless;
}

export function formStateValidation(form) {
    return Object.keys(form).every((key) => form[key].isValid[0]);
}