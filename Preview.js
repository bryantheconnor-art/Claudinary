'use strict'

import { uploadParaCloudinary } from './cloudinay.js'

const ICONE_PADRAO = './img/upload-icon.svg'

function preview({ target }) {
    const arquivo = target.files[0]
    if (!arquivo) return
    document.getElementById('preview-image').src = URL.createObjectURL(arquivo)
    document.getElementById('resultado').textContent = ''
}

async function enviarFoto() {
    const input = document.getElementById('preview-input')
    const botao = document.getElementById('upload-button')
    const resultado = document.getElementById('resultado')

    if (!input.files[0]) {
        resultado.textContent = 'Selecione uma imagem primeiro.'
        return
    }

    botao.disabled = true
    resultado.textContent = 'Enviando...'

    try {
        const linkPublico = await uploadParaCloudinary(input.files[0])
        console.log('Link público da imagem:', linkPublico)
        resultado.innerHTML = `Link público: <a href="${linkPublico}" target="_blank" rel="noopener">${linkPublico}</a>`
    } catch (erro) {
        console.error(erro)
        resultado.textContent = 'Erro ao enviar a imagem.'
    } finally {
        botao.disabled = false
    }
}

function cancelar() {
    document.getElementById('preview-input').value = ''
    document.getElementById('preview-image').src = ICONE_PADRAO
    document.getElementById('resultado').textContent = ''
}

document.getElementById('preview-input')
        .addEventListener('change', preview)

document.getElementById('upload-button')
        .addEventListener('click', enviarFoto)

document.getElementById('cancel-button')
        .addEventListener('click', cancelar)