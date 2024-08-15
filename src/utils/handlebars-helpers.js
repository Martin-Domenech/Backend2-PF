import Handlebars from 'handlebars'

Handlebars.registerHelper('eq', function (value1, value2) {
    return value1 === value2
})