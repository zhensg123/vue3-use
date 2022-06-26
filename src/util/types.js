const NULL = '[object Null]'
const UNDEFINED = '[object Undefined]'
const ARRAY = '[object Array]'
const OBJECT = '[object Object]'
const STRING = '[object String]'
const NUMBER = '[object Number]'
const BOOLEAN = '[object Boolean]'
const FUNCTION = '[object Function]'

const type = value => Object.prototype.toString.call(value)
const is = (value, typeStr) => type(value) === typeStr
const isNull = value => is(value, NULL)
const isUndefined = value => is(value, UNDEFINED)
const isValue = value => !isNull(value) && !isUndefined(value)
const isArray = value => is(value, ARRAY)
const isObject = value => is(value, OBJECT)
const isFunction = value => is(value, FUNCTION)
const isString = value => is(value, STRING)
const isNumber = value => is(value, NUMBER)
const isBoolean = value => is(value, BOOLEAN)

export {
  NULL, UNDEFINED, ARRAY, OBJECT, STRING, NUMBER, BOOLEAN,
  type, is,
  isNull, isUndefined, isValue, isArray, isObject, isFunction, isString, isNumber, isBoolean
}
