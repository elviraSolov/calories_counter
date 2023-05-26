import { defineStore } from 'pinia'

export const useCalculationStore = defineStore('calculation', {
    state: () => ({
      personalData: {
        age: 21,
        weight: 53,
        height: 165,
        sex: 'female',
        activity: 1.55,
        dailyIntake: 2200
      }
    }),
    actions: {
      calculateDailyIntake() {
        if (this.personalData.sex === 'male') {
          this.personalData.dailyIntake = (10 * this.personalData.weight + 6.25 * this.personalData.height - 5 * this.personalData.age + 5) * this.personalData.activity
        } else if (this.personalData.sex === 'female') {
          this.personalData.dailyIntake = (10 * this.personalData.weight + 6.25 * this.personalData.height - 5 * this.personalData.age - 161) * this.personalData.activity
        }
        return this.personalData.dailyIntake
      }
    }
  })