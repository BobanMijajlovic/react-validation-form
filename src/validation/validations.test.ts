/* eslint-disable */
import {maxValue, minLength} from "./validations";
describe("test validations",  ()=> {
   it("validations - check min length ", () => {
      let minLengthTest = minLength({min: 5})
      expect(minLengthTest()).toBeFalsy()
      expect(minLengthTest("bob")).toBeTruthy()
      expect(minLengthTest("bobi")).toBeTruthy()
      expect(minLengthTest("bobi5")).toBeFalsy()
      const message = "THIS is test message"
      minLengthTest = minLength({min: 7, message: message})
      expect(minLengthTest('short')).toBe(message)
   })

   it("validations -check maxValue", ()=> {
       let maxValueTest = maxValue({max: 10})
      expect(maxValueTest()).toBeFalsy()
      expect(maxValueTest(5)).toBeFalsy()
      expect(maxValueTest('bobi')).toBeFalsy()
      expect(maxValueTest(10)).toBeFalsy()
      expect(maxValueTest(11)).toBeTruthy()
      const message = "THIS is test message"
      maxValueTest = maxValue({max: 7, message: message})
      expect(maxValueTest(22)).toBe(message)
   })
})