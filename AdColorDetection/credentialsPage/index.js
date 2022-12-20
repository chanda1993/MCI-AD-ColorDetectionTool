function subjectsCredentials () {

      document.getElementsByName('gender')
        .forEach(radio => {
            if (radio.checked) {
                window.gender = radio.value;
            }
        });
  // to set into local storage
    let id, age, diagnosis;
    id = window.document.getElementById("id").value,
    age = window.document.getElementById("age").value,
    diagnosis = window.document.getElementById("diagnosis").value,
    window.localStorage.setItem("id", id);
    window.localStorage.setItem("age", age);
    window.localStorage.setItem("gender", gender);
    window.localStorage.setItem("diagnosis", diagnosis);

    return;
}
window.addEventListener('load', () => {
});
 var arr = new Array();
        function addData(){
            getData();
            // Get credentials data
            window.id = localStorage.getItem('id');
            window.age = localStorage.getItem('age');
            window.gender = localStorage.getItem('gender');
            // Get r values and average
            window.r = localStorage.getItem('rValue');
            window.ravg = localStorage.getItem('ravg');
            // Get g values and average
            window.g = localStorage.getItem('gValue');
            window.gavg = localStorage.getItem('gavg');
            // Get b values and average
            window.b = localStorage.getItem('bValue');
            window.bavg = localStorage.getItem('bavg');
            window.tavg = localStorage.getItem('tavg');
            // Get diagnosis data
            window.diagnosis = localStorage.getItem('diagnosis');

            arr.push({
                // Push credentials data to storage
                id: id,
                age: age,
                gender: gender,
                // Push R values and average to storage
                r: r,
                ravg: ravg,
                // Push G values and average to storage
                g: g,
                gavg: gavg,
                // Push B values and average to storage
                b: b,
                bavg: bavg,
                // Push the total average value to storage
                tavg: tavg,
                // Push diagnosis value to storage
                diagnosis: diagnosis,
            });
            localStorage.setItem("localData", JSON.stringify(arr));
            showData();
        }
        function getData(){
            var str = localStorage.getItem("localData");
            if (str != null)
            arr = JSON.parse(str);

        }
        // Insert all dataset into a new row into myTable on html file
        function showData(){
            getData();

            var tb1 = document.getElementById("myTable");

            var x = tb1.rows.length;
            while (--x){
                tb1.deleteRow(x);
            }

            for (i=0; i<arr.length; i++){

                var r = tb1.insertRow();
                var cell1 = r.insertCell();
                var cell2 = r.insertCell();
                var cell3 = r.insertCell();
                var cell4 = r.insertCell();
                var cell5 = r.insertCell();
                var cell6 = r.insertCell();
                var cell7 = r.insertCell();
                var cell8 = r.insertCell()
                var cell9 = r.insertCell();
                var cell10 = r.insertCell();
                var cell11 = r.insertCell();


            cell1.innerHTML = arr[i].id;
            cell2.innerHTML = arr[i].age;
            cell3.innerHTML = arr[i].gender;

            cell4.innerHTML = arr[i].r;
            cell5.innerHTML = arr[i].ravg;

            cell6.innerHTML = arr[i].g;
            cell7.innerHTML = arr[i].gavg;

            cell8.innerHTML = arr[i].b;
            cell9.innerHTML = arr[i].bavg;

            cell10.innerHTML = arr[i].tavg;

            cell11.innerHTML = arr[i].diagnosis;
            }
        }
// Navigate to the index.html page
function nextSubject(){
    window.location.href = ("index.html")
}
//Delete the data in a row from the dataset
function delrow(){
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;
    let data = JSON.parse(localStorage.getItem("localData"));

    let row = data.length
    for (var d = 0; d < row; d++){
         console.log(row-1);
         data.splice(row-1);
         localStorage.setItem("localData", JSON.stringify(data));
    }
    if(rowCount > '1'){
        window.count = table.deleteRow(rowCount-1);
        rowCount--;
    }
}