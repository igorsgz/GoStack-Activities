module.exposts = {
    presets: [
        '@babel/preset-env',       //converte o código para o que os browsers consigam entender
        '@babel/preset-react'      //adiciona as funcionalidades do react na conversão como escrever html dentro do javascript
    ],
    plugins: [
        '@babel/plugin-syntax-jsx'
    ]
}