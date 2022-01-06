const requiredRules = [
    v => !!v || 'This field is required',
]

const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

export {
    requiredRules,
    emailRules
}