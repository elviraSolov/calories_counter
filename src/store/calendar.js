import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        calendar: [],
        currentDay: {},
    }),
    actions: {
        // setCurrentDay(day, month, year) {
        //     const selectedDay = this.calendar.find((element) => element.date.day == day && element.date.month == month && element.date.year == year)

        //     if (selectedDay) {
        //         this.currentDay = selectedDay
        //     } else {
        //         const newCalendarDay = {
        //             date: {
        //                 day: day,
        //                 month: month,
        //                 year: year
        //             },
        //             breakfast: [],
        //             lunch: [],
        //             dinner: [],
        //             total: {
        //                 calories: 0,
        //                 proteins: 0,
        //                 fats: 0,
        //                 carbs: 0
        //             }                    
        //         }

        //         this.calendar.push(newCalendarDay)
        //         this.currentDay = newCalendarDay
        //     }
        // },
        setCurrentDay(day, month, year) {
            // Проверяем наличие дня с выбранной датой
            const selectedDay = this.calendar.find((element) => element.date.day == day && element.date.month == month && element.date.year == year)
        
            if (selectedDay) {
                // Если найден день с той же датой, используем его вместо создания нового дня
                this.currentDay = selectedDay
            } else {
                // В противном случае создаем новый день и добавляем его в массив
                const newCalendarDay = {
                    date: {
                        day: day,
                        month: month,
                        year: year
                    },
                    breakfast: [],
                    lunch: [],
                    dinner: [],
                    total: {
                        calories: 0,
                        proteins: 0,
                        fats: 0,
                        carbs: 0
                    }                    
                }
        
                this.calendar.push(newCalendarDay)
                this.currentDay = newCalendarDay
            }
        },
        addProduct(meal, product) {
            this.currentDay[meal].push(product)

            for (let prop in product) {
                if (prop === 'name') {
                    continue
                }
                this.currentDay.total[prop] += parseFloat(product[prop])
            }
        },
        removeProduct(meal, productName) {
            for (let i = 0; i < this.currentDay[meal].length; i++) {
                const product = this.currentDay[meal][i]
        
                if (product.name === productName) {
                    for (let prop in product) {
                        if (prop === 'name') {
                            continue
                        }
                        this.currentDay.total[prop] -= parseFloat(product[prop])
                    }
        
                    this.currentDay[meal].splice(i, 1)
                    break
                }
            }
        },
        getCaloriesPerDays(dates) {
            const caloriesPerDaysArray = []

            for (let i = 0; i < dates.length; i++) {
                const currentDay = this.calendar.find(
                    (element) => element.date.day == dates[i].day  &&
                    element.date.month == dates[i].month &&
                    element.date.year == dates[i].year 
                )
                if (currentDay) {
                    caloriesPerDaysArray[i] = currentDay.total.calories
                } else {
                    caloriesPerDaysArray[i] = 0
                }                
            }

            return caloriesPerDaysArray
        }
    }
})