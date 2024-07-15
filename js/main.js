import { showChart } from "./statistic.js"

let createTrack = document.querySelector("#create-track")
let labelInput = document.querySelector("#add-treker")
let ul = document.querySelector("ul")
let setValue = document.querySelector(".set-value")
let setValueInput = document.querySelector("#set-value")

let nowTrackId = undefined
let allTracks = JSON.parse(localStorage.getItem("tracks")) || []
function saveLocalStorage(){
    localStorage.setItem("tracks", JSON.stringify(allTracks))
}

createTrack.addEventListener("submit", addTrack)
function addTrack(e){
    e.preventDefault()
    let label = labelInput.value.trim()
    if(label !== ""){
        labelInput.value = ""
        let track = {
            id:Math.floor(Math.random() * new Date().valueOf()),
            label:label,
            data:[]
        }
        allTracks.push(track)
        saveLocalStorage()
        renderTracks()
    }
}

ul.addEventListener("click", function(e){
    if (e.target.classList.contains("delete-button")){
        let parent = e.target.closest(".track")
        let id = +parent.dataset.id
        deleteTrack(id)
        console.log(id)
    }
    if (e.target.classList.contains("select-button")){
        let parent = e.target.closest(".track")
        let id = +parent.dataset.id
        nowTrackId = id
        showStatistics(id)
    }
})

setValue.addEventListener("submit", addValue)

function addValue(e){
    e.preventDefault()
    let inputValue = setValueInput.value.trim()
    if (inputValue){
        let nowTrack = allTracks.filter(element => {
            if(element.id === nowTrackId){
                return element
            }
        }) 
        console.log(nowTrack)
        console.log(nowTrackId)
        let newDay = nowTrack[0].data.length
        let newValue = {
            day:newDay,
            value:inputValue
        }
        nowTrack[0].data.push(newValue)
        allTracks = allTracks.filter(element => {
            if(element.id === nowTrackId){
                return nowTrack[0]
            }
            return element
        })
        saveLocalStorage()
        showStatistics(nowTrackId)
    }
    setValueInput.value = ""
}

function showStatistics(id){
    let nowTrack = allTracks.filter(element => {
        if(element.id === id){
            return element
        }
    })
    
    showChart(nowTrack[0])
}

function deleteTrack(id){
    allTracks = allTracks.filter(element => {
        if(element.id !== id){
            return element
        }
    })
    saveLocalStorage()
    renderTracks()
}

function renderTracks(){
    ul.innerHTML = ""
    allTracks.forEach(element => {
        let html = `
        <li>
                <div class="track" data-id = "${element.id}">
                    <p>${element.label}</p>
                    <div>
                        <p>Последний результат: </p>
                        <span>10</span>
                        <p>Лучший результат: </p>
                        <span>12</span>
                        <p>Всего: </p>
                        <span>127</span>
                        <button class="select-button">Выбрать</button>
                        <button class="delete-button">Удалить</button>
                    </div>
                </div>
            </li>
        `
        ul.insertAdjacentHTML("afterbegin", html)
    });
}
renderTracks()