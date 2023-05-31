const resetFormMixin = {
    methods: {
        resetForm(form) {
            for (let field in form) {
                form[field] = ''
            }
        }
    }
}

export default resetFormMixin