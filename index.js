const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

try {
    fs.readFileSync(path.join(__dirname, '\counter.json'), 'utf-8')
} catch (error) {
    const counter = {
        index: 0,
        about: 0
    }
    fs.writeFileSync(path.join(__dirname, '\counter.json'), JSON.stringify(counter, null, 4))
}

const counter = JSON.parse(fs.readFileSync(path.join(__dirname, '\counter.json'), 'utf-8'))

app.get('/', (req, res) => {
    res.send(`<h1>Корневая страница</h1><p>Просмотров: ${++counter.index}</p><a href="/about">Ссылка на страницу /about</a>`)
    fs.writeFileSync(path.join(__dirname, '\counter.json'), JSON.stringify(counter, null, 4))
})

app.get('/about', (req, res) => {
    res.send(`<h1>Страница about</h1><p>Просмотров: ${++counter.about}</p><a href="/">Ссылка на страницу /</a>`)
    fs.writeFileSync(path.join(__dirname, '\counter.json'), JSON.stringify(counter, null, 4))
})

const port = 3000

app.listen(port, () => {
    console.log(`Сервер запущен на ${port} порте`);
})