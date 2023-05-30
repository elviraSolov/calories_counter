import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        calendar: [],
        currentDay: {},
    }),
    actions: {
        setCurrentDay(day, month, year) {
            // Поиск дня в calendar
            const selectedDay = this.calendar.find((element) => element.date.day == day && element.date.month == month && element.date.year == year)

            if (selectedDay) {
                // Если найден, установить как текущий (currentDay)
                this.currentDay = selectedDay
            } else {
                // Если не найден, добавить новый день в calendar и установить в текущий
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
            // Добавление продукта в выбранный прием пищи (meal)
            this.currentDay[meal].push(product)

            for (let prop in product) {
                if (prop === 'name') {
                    continue
                }

                // Запись КБЖУ продукта в сводку за день 
                this.currentDay.total[prop] += parseFloat(product[prop])
                this.currentDay.total[prop] = Math.round(this.currentDay.total[prop] * 100) /100
            }
        },
        removeProduct(meal, productKey) {
            for (let i = 0; i < this.currentDay[meal].length; i++) {
                const product = this.currentDay[meal][i]
        
                // Поиск продукта по ключу из таблицы 
                if (i == productKey) {
                    for (let prop in product) {
                        if (prop === 'name') {
                            continue
                        }

                        // Обновление КБЖУ в дневной сводке
                        this.currentDay.total[prop] -= parseFloat(product[prop])
                        this.currentDay.total[prop] = Math.round(this.currentDay.total[prop] * 100) /100
                        
                        // Проверка на близость к нулю для избежания слишком маленьких цифр 
                        if(this.currentDay.total[prop] < 0.001) {
                            this.currentDay.total[prop] = 0
                        }
                    }
        
                    this.currentDay[meal].splice(i, 1)
                    break
                }
            }
        },
        getCaloriesPerDays(dates) {
            const caloriesPerDaysArray = []

            // Массив с общим количеством калорий из диапазона дат
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