const bookShell = document.getElementById("livros")
const loading = document.getElementById("loading")

export const appendBook = (data, aiTitle) => {

    const main = document.createElement("article")
    const img = document.createElement("img")
    const title = document.createElement("h3")

    main.className = "livro"
    img.src = (data != undefined ? data.volumeInfo.imageLinks.thumbnail : "../images/not_found.png")
    title.textContent = (data != undefined ? data.volumeInfo.title : aiTitle)

    loading.textContent = ""

    main.appendChild(img)
    main.appendChild(title)
    bookShell.append(main)
}