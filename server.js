import express from 'express'
const app = express()
const port = 8080

app.get('/', (req, res) => {
    console.log('Client connected')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Access-Control-Allow-Origin', '*')

    const intervalId = setInterval(() => {
        const date = new Date().toLocaleString()
        res.write(`event: message\n`)
        res.write(`data: ${date}\n\n`)
    }, 1000)

    res.on('close', () => {
        console.log('Client close connection')
        clearInterval(intervalId)
    })

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})