
const backendurl = "https://retoolapi.dev/Rk5fqN/data";

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("get").addEventListener("click",async function(){
        fetch(backendurl)
        .then(response => response.json())
        .then(data => Datafutar(data));
    });
    document.getElementById("update").addEventListener("click", async function(){
        let id = document.getElementById("id").value;
        let vnev = document.getElementById("vnev").value;
        let knev = document.getElementById("knev").value;
        let email = document.getElementById("email").value;
        let futar = {id:id, vnev:vnev, knev:knev, email:email};
        let modositurl = backendurl + "/" + id;
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        let response = await fetch(modositurl, {
            method : "PUT",
            headers: myHeader,
            body: JSON.stringify(futar)
        })
        console.log(response);
         if(response.ok){
            alert("Sikeres Update");
        }
        else{
            alert("Sikertelen Update");
        }
    });
    document.getElementById("delete").addEventListener("click", async function(){
        let id = document.getElementById("id").value;
        let vnev = document.getElementById("vnev").value;
        let knev = document.getElementById("knev").value;
        let email = document.getElementById("email").value;
        let futar = {id:id, vnev:vnev, knev:knev, email:email};
        let torolurl = backendurl + "/" + id;
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        let response = await fetch(torolurl, {
            method: "DELETE",
            headers: myHeader
        })
        console.log(response);
        if(response.ok){
            alert("Sikeres Delete");
        }
        else{
            alert("Sikertelen Delete");
        }
    });
    document.getElementById("insert").addEventListener("click", async function(){
        let id = document.getElementById("id").value;
        let vnev = document.getElementById("vnev").value;
        let knev = document.getElementById("knev").value;
        let email = document.getElementById("email").value;
        let futar = {vnev:vnev, knev:knev, email:email};
        let valtoztaturl = backendurl;
        let myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");
        let response = await fetch(valtoztaturl, {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify(futar)
        })
        console.log(response);
        if(response.ok){
            alert("Sikeres Insert");
        }
        else{
            alert("Sikertelen Insert");
        }
    });
});

function Datafutar(data){
    let table=`<table>
        <thead>
            <tr>
                <th>id</th>
                <th>Vezetéknév</th>
                <th>Keresztnév</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
        `;
        for (let i = 0; i < data.length; i++) {
            table += `<tr>
                <td>${data[i].id}</td>
                <td>${data[i].vnev}</td>
                <td>${data[i].knev}</td>
                <td>${data[i].email}</td>
                <td><a class="btn btn-primary" onclick="Modositas(${data[i].id})">Update</a></td>
            </tr>`;
        }
        table += `</tbody></table>`;
    document.getElementById("table").innerHTML = table;
};

function Modositas(id){
    fetch(backendurl + "/" + id)
    .then(response => response.json())
    .then(data =>{
        document.getElementById("id").value = data.id;
        document.getElementById("vnev").value = data.vnev;
        document.getElementById("knev").value = data.knev;
        document.getElementById("email").value = data.email;
    })
}

