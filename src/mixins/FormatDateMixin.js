const formatDateMixin = {
    methods: {
        formatDate(date) {
            return {
                day: date.getDate(), 
                month: date.getMonth() + 1, 
                year: date.getFullYear() 
            }
        }
    }
}

export default formatDateMixin