let perconName

function kolobok(perconName) {
    switch(perconName) { 
        case 'дедушка':
            console.log ('Я от дедушки ушёл')
        break 
        case 'заяц':
            console.log ('Я от зайца ушёл')
        break
        case 'лиса':
            console.log ('Меня съели')
    }
}

kolobok('дедушка');

kolobok('лиса')

kolobok('заяц')


function newYear(percon) {
    console.log(percon +'! ' + percon +'! ' +percon +'!')
}

newYear('Дед Мороз');

newYear('Снегурочка')