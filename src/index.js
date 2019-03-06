const rootElement = document.getElementById("root");

if (!rootElement.hasChildNodes()) {
    const newElement = document.createElement('p')
    newElement.innerHTML = 'This site is under construction...'

    rootElement.appendChild(newElement)
}
