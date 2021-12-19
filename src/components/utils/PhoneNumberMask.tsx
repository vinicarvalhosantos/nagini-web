const phoneNumberMask = (value: string) => {
    if (value.length > 14) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{4})\d+$/, '$1');
    } else {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{4})\d+$/, '$1');
    }
}

export default phoneNumberMask;