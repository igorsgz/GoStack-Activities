const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(express.json())

const projects = []

// middleware
function logRequest(request, response, next) {
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next() //necessário para continuar a requisição

    console.timeEnd(logLabel)
}

// middleware
function validateProjectId(request, response, next) {
    const { id } = request.params

    if (!isUuid(id)) {
        return response.status(400).json({error: 'Invalid project ID'})
    }

    return next()
}

app.use(logRequest)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
    // query params da requisição
    const { title } = request.query

    // verificando se o titulo do projeto contém o tituto filtrado
    const result = title
        ? projects.filter(project => project.title.includes(title))
        : projects

    return response.json(result)
})

app.post('/projects', (request, response) => {
    const { title, owner } = request.body

    const project = { id: uuid(), title , owner }

    projects.push(project)

    //retornando o item recem criado
    return response.json(project)
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params
    const { title, owner } = request.body

    // buscando a posição do item no array
    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found' })
    }

    const project = {
        id,
        title,
        owner
    }

    // substituindo o projeto anterior pelo novo
    projects[projectIndex] = project

    // retornando o item atualizado
    return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    // buscando a posição do item no array
    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found' })
    }

    // excluindo o objecto do array pela posição dele
    projects.splice(projectIndex, 1)

    // retornando uma resposta vazia com o status 204
    return response.status(204).json()
})

app.listen(3333, () => {
    console.log('🚀 Back-end started!')
})