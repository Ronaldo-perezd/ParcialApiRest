const API_URL = 'https://api-dishes.vercel.app'

function loadDishes(){
    return new Promise((resolve,reject)=>{
        fetch(`${API_URL}/`)
            .then(resp => resp.json())
            .then(resp => resolve(resp))
            .catch( err => reject(err))
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btnFind').addEventListener('click', async ()=>{
        const dishId = document.getElementById("inputGet").value
        const response = await fetch(`${API_URL}/${dishId}`)
        const resp = await response.json()
        if(resp.state){
            const dishData = resp.data;
            const dishDataDiv = document.getElementById("dishData")
            dishDataDiv.innerHTML = ""
            const form = document.createElement("form")
            form.className = "form-horizontal"

            Object.keys(dishData).forEach(key => {
                if (key !== "__v") {
                    const groupDiv = document.createElement("div")
                    groupDiv.className = "form-group row"

                    const label = document.createElement("label")
                    label.className = "col-sm-2 col-form-label"
                    label.textContent = `${key}:`

                    const inputDiv = document.createElement("div")
                    inputDiv.className = "col-sm-10"
                    const input = document.createElement("input")
                    input.className = "form-control"
                    input.type = "text";
                    input.value = dishData[key]
                    input.disabled = true

                    inputDiv.appendChild(input)
                    groupDiv.appendChild(label)
                    groupDiv.appendChild(inputDiv)
                    form.appendChild(groupDiv)
                    }
                });
                dishDataDiv.appendChild(form)
        }else{
            alert("Error, dish not finded")
        }
    }) 
})

const loadData = () => {
    const idDish = document.getElementById('idDish').value
    const name = document.getElementById('dishName').value
    const calories = document.getElementById('calories').value
    const isVegetarian = document.getElementById('isVegetarian').value === 'true'
    const value = document.getElementById('value').value
    const comments = document.getElementById('comments').value

    const data = {
        "idDish": idDish,
        "name": name,
        "calories": parseInt(calories),
        "isVegetarian": isVegetarian,
        "value": parseInt(value),
        "comments": comments
    };

    return JSON.stringify(data);
}

/*document.getElementById('btnDelete').addEventListener('click', async () => {
    const dishId = document.getElementById("inputGet").value;

    try {
        const response = await fetch(${API_URL}/${dishId}, {
            method: 'DELETE',
        });

        const resp = await response.json();

        if (resp.state) {
            alert("Dish deleted successfully!");
        } else {
            alert(Error deleting dish: ${resp.error});
        }
    } catch (err) {
        console.error(Error: ${err});
    }
});*/

document.getElementById('btnAddDish').addEventListener('click', () => {
    fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: loadData()
    }).then(resp => resp.json())
        .then(resp => {
            if (resp.state) {
                alert("Dish added successfully!")
            } else if (resp.code === 208) {
                alert("Dish with the same idDish already exists.")
            } else {
                alert("Error adding dish.")
            }
        })
        .catch(err => {
            alert(`Error: ${err}`)
        })
})
