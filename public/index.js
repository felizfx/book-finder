import { appendBook } from "./script.js"

const inputText = document.getElementById("text-insert")
const loading = document.getElementById("loading")

const genAI = "AIzaSyBJVF0hL04zP1x937ZPzzi_I4zz4E5CqHs"
const typeSearch = (window.location.href).split("/")[3]

inputText.addEventListener("submit", (e) => {
    e.preventDefault()
    loading.textContent = "loading"
    AI(inputText[0].value, typeSearch, getContent)
})

export const AI = (text, type, callback) => {
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${genAI}`, {
        method: "POST",
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Indique apenas o nome de um unico ${type} que exista e que mais se encaixa com os seguintes nomes e descrições: ${text}`
                }]
            }]
        })
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Error with Gemini API fetch", response)
        }
        return response.json()
    })
    .then(data => {
        callback(data.candidates[0].content.parts[0].text)
    })
    .catch(e => {
        console.log(e);
    })
}

export const getContent = (title) => {
   fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then(response => {
        if(!response.ok){
            throw new Error("Error with Google Book API fetch", response)
        }
        return response.json()
    })
    .then(data => {
        const summary = data.items.find(element => element.volumeInfo.language === "pt-BR") 
        appendBook(summary, title)
    })
}