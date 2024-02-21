export function createFormData(data){
    const form = new FormData()

    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            form.append(key, JSON.stringify(data[key]))
        } else {
            form.append(key, data[key])
        }
    })
    return form
}