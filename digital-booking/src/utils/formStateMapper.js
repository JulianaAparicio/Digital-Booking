export function formStateMapper(form) {
    let formStateless = {};

    Object.keys(form).forEach((key) => {
        formStateless[key] = form[key].state[0]
    })

    return formStateless;
}

export function formStateValidation(form) {
    return Object.keys(form).every((key) => form[key].isValid[0]);
}