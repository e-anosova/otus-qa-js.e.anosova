let perconName

function kolobok(perconName: any) {
  switch (perconName) {
    case 'дедушка':
      console.log('Я от дедушки ушёл')
      break
    case 'заяц':
      console.log('Я от зайца ушёл')
      break
    case 'лиса':
      console.log('Меня съели')
  }
}

kolobok('дедушка')

kolobok('лиса')

kolobok('заяц')

function newYear(percon: any) {
  return percon + '! ' + percon + '! ' + percon + '!'
}

newYear('Дед Мороз')
newYear('Снегурочка')

const greet = newYear('Дед Мороз')
// @ts-expect-error TS(2304): Cannot find name 'greeting'.
console.log(greeting)
