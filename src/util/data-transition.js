import moment from 'moment'
import { isArray } from './types'

export const createOptionsGetter = function (options, value = 'value') {
  const map = {}
  options.forEach(option => map[option[value]] = option)
  return value => map.hasOwnProperty(value) ? map[value] : { label: value, [value]: value }
}
export const createOptionsFormatter = function (options, keys) {
  if (!keys) keys = {}
  const { label = 'label', value = 'value' } = keys
  const map = {}
  options.forEach(option => map[option[value]] = option[label])
  return (value) => map.hasOwnProperty(value) ? map[value] : value
}

const byteUnits = [{ unit: 'B', carry: 1024 }, { unit: 'KB', carry: 1024 }, { unit: 'MB', carry: 1024 }, { unit: 'GB', carry: 1024 }, { unit: 'TB' }]
const timeUnits = [{ unit: '毫秒', carry: 1000 }, { unit: '秒', carry: 60 }, { unit: '分钟', carry: 60 }, { unit: '小时', carry: 24 }, { unit: '天' }]
const getFormatter = (units, float = true) => {
  return function (num, def = NaN) {
    if (isNaN(num)) return def
    const len = units.length
    for (let i = 0; i < len; i++) {
      const { unit, carry } = units[i]
      const value = num / carry
      if (value > 1 && i !== len - 1) num = value
      else if (float) return round(num) + unit
      else {
        const intValue = Math.floor(num)
        let str = intValue + unit
        if (i > 0) {
          const { unit, carry } = units[i - 1]
          const value = Math.round((num - intValue) * carry)
          if (value > 0) str += value + unit
        }
        return str
      }
    }
  }
}

export const formatByte = getFormatter(byteUnits)
export const formatDuration = getFormatter(timeUnits, false)
export const getTime = time => moment(time).toDate().getTime()

export const formatDate = (date) => formatDateTime(date, 'YYYY-MM-DD')
export const formatDateTime = (time, format = 'YYYY-MM-DD HH:mm:ss', def = '') => {
  if (!time) return def
  return moment(time).format(format)
}

export const round = (value, num = 2) => {
  num = Math.pow(10, num)
  return (Math.round(value * num) / num)
}

export const format2Percentage = (value, num = 2, postfix = ' %') => {
  if (isNaN(value) || value === Infinity) return '0' + postfix
  num = Math.pow(10, num)
  return round(value * 100, 2) + postfix
}

export const format = (config, value) => {
  if (value === null) return ''
  let params
  if (isArray(config)) {
    params = config
    config = params.shift()
  } else params = []
  switch (config) {
    case 'time':
      return formatDateTime(value, ...params)
    case 'date':
      return formatDate(value)
    case 'byte':
      return formatByte(value)
    case 'duration':
      return formatDuration(value)
    case 'percentage':
      return format2Percentage(value, ...params)
    default:
      return value
  }
}

export const formatJSON = (obj) => JSON.stringify(obj, null, 4)

export const formatJSONStr = (str) => {
  try {
    // return formatJSON(JSON.parse(str.replace(/\\n/g, '')))
    return formatJSON(JSON.parse(str))
  } catch (e) {
    return str
  }
}

export const frontPagination = (pagination, list) => {
  pagination.total = list.length
  const { page, size } = pagination
  const index = size * (page - 1)
  return list.slice(index, index + size)
}

export const getObjValue = (obj, prop) => {
  const keys = prop.split('.')
  for (let i = 0; i < keys.length; i++) {
    if (obj) obj = obj[keys[i]]
    else return undefined
  }
  return obj
}
