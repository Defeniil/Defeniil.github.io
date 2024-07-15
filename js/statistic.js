let canvas = document.querySelector("#steps")
let canvasHolder = document.querySelector("#canvas-holder")

let chart = new Chart(
    canvas,
    {
        type:'bar',
        data:{
            labels:[],
            datasets:[{
                    label:"",
                    data:[]
                }
            ]
        }
    }
)  
 
export function showChart(track){
    let label = track.label
    let data = track.data

    if (data){
        chart.data.labels = data.map(function(row){
            return row.day
        })
        chart.data.datasets[0].label = label
        chart.data.datasets[0].data = data.map(function(row){
            return row.value
        })
        chart.update()
    }
    else{
        let html = `
            <p>Введите значение</p>
        `
        canvasHolder.insertAdjacentHTML("afterbegin", html)
    }
}