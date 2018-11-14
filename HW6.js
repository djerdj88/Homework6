(function budget(){
    let income = 0, expenses = 0, total = 0, date, year, month, newArray = [], newArray1 = [];

    date = new Date ();
    year = date.getFullYear();
    month = date.getMonth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    function $(selector){
    return document.querySelector(selector);
}

function clearInput(){
    $(".nameInput").value = "";
    $(".valueInput").value = "";
}

(function title() {
    $(".title").innerText = `Available budget in ${months[month]} ${year}:`;
})();

function numberFormat(num){

    num = num.toFixed(2)
    
    let splitNumber = num.split(".");
    let a = splitNumber[0], b = splitNumber[1];
    
    if (a.length > 3){
        num = a.substr(0,a.length - 3) + "," + a.substr(a.length - 3) + "." + b;
    }

    return num;
    };


function totalAmount(){
    total = parseFloat(total);
    if (total >= 0){
        
        $(".amount").innerHTML = `+ ${numberFormat(total)}`;
        }
        else{
        $(".amount").innerHTML = `- ${(numberFormat(total)*(-1))}`;
        }
}

$(".check").addEventListener("click", addElementTr);

function addTr(event){
        if (event.keyCode === 13 && ($(".valueInput").value) !== "" && $(".nameInput").value !== ""){
            addElementTr();
        }
}

document.addEventListener("keypress", addTr);

function createIncomeElement(){
    let newTr, output, vInput, nInput;
        newTr = document.createElement("tr");
        newTr.className = "tableformat";
    
        vInput = parseFloat($(".valueInput").value).toFixed(2);
        nInput = $(".nameInput").value;
    output = `<td>${nInput}</td>
              <td>+ ${vInput}<button class="btn">x</button></td>`;
    
    newTr.innerHTML = output;
    $(".tableInc").appendChild(newTr);
    income += parseFloat(vInput);
    $(".incValue").innerHTML = `+ ${numberFormat(income)}`;
    updatePercentage();
}

function createExpensesElement(){
    let newTr, output, totalPercentage, vInput, nInput;
    newTr = document.createElement("tr");
    newTr.className = "tableformat";

    vInput = parseFloat($(".valueInput").value).toFixed(2);
    nInput = $(".nameInput").value;
    
    output = `<td>${nInput}</td>
            <td>- ${vInput}</td>
            <td>${((parseFloat(vInput)*100)/income).toFixed(2)}%<button class="btn">x</button></td>`
    newTr.innerHTML = output;
    $(".tableExp").appendChild(newTr);
    expenses += parseFloat(vInput);
    $(".expValue").innerHTML = `- ${numberFormat(expenses)}`;
    totalPercentage = (expenses*(100)/income);
    $(".expPercentage").innerHTML = `${totalPercentage.toFixed(2)}%`;
}

function addElementTr(){
    if (($(".valueInput").value) !== "" && $(".nameInput").value !== ""){

    if ($(".selectIE").value === "inc"){
        createIncomeElement();
    }

    else{
        createExpensesElement();
    }

    total = (income - expenses).toFixed(2);

    totalAmount();

    clearInput();

    $(".nameInput").focus();
    newArray = [];
    newArray1 = [];
    setIncomeData();
    setExpData();
    }
}

function deleteIncome(event){
        
    if (event.target.classList.contains("btn")) {
    let toDelete = event.target.parentNode.parentNode;
    let incValue = event.target.parentNode.innerText;
    incValue = parseFloat(incValue.slice(1,incValue.length - 1)).toFixed(2);
    total = (total - incValue);
    income = (income - incValue);
    newArray = (localStorage.incData.split(","));
    
    for (let i = 0; i < newArray.length; i++){
        if (newArray[i] == incValue){
            newArray.splice(i, 1);
            newArray.splice(i-1, 1);
        }
    }
    let incData = [];
    localStorage.setItem("incData", newArray);
    console.log(newArray);
    total = parseFloat(total);
    income = parseFloat(income);
    $(".incValue").innerHTML = `+ ${numberFormat(income)}`;
    
    totalAmount();
    
    toDelete.parentNode.removeChild(toDelete);
    updatePercentage();
    }
};

$(".income").addEventListener("click", deleteIncome);

function deleteExpense(event){
        
    if (event.target.classList.contains("btn")) {
    let toDelete = event.target.parentNode.parentNode;
    let expValue = event.target.parentNode.parentNode.children[1].innerText;
    let nameValue = event.target.parentNode.parentNode.children[0].innerText;
    console.log(nameValue);
    expValue = parseFloat(expValue.slice(1,expValue.length)).toFixed(2);
    total = (parseFloat(total) + parseFloat(expValue));
    expenses = (parseFloat(expenses) - parseFloat(expValue));
    if (income === 0) {
        income = 1;
    }
    totalPercentage = (expenses*(100)/income);
    newArray1 = (localStorage.expData.split(","));
     for (let i = 0; i < newArray1.length; i++){
        if (newArray1[i] == nameValue){
            newArray1.splice(i+2, 1);
            newArray1.splice(i+1, 1);
            newArray1.splice(i, 1);
        }
    } 
    let expData = [];
    localStorage.setItem("expData", newArray1);
    $(".expPercentage").innerHTML = `${totalPercentage.toFixed(2)}%`;
    $(".expValue").innerHTML = `- ${numberFormat(expenses)}`;
    
    
    totalAmount();

    toDelete.parentNode.removeChild(toDelete);
    }
};

$(".expenses").addEventListener("click", deleteExpense);


function updatePercentage (){
    let totPerc = 0;
    for( let i = 1; i < $(".tableExp").children.length;i++){
         $(".tableExp").children[i].children[2].innerHTML = `${((parseFloat($(".tableExp").children[i].children[1].innerText.slice(2))*100)/income).toFixed(2)}%<button class="btn">x</button>`;
        totPerc = ((parseFloat($(".tableExp").children[i].children[1].innerText.slice(2))*100)/income) + totPerc;
        $(".expPercentage").innerHTML = `${totPerc.toFixed(2)}%`;
    }
}



$(".selectIE").addEventListener("change", changeColor);

function changeColor(){
    if ($(".selectIE").value === "exp"){
        $(".fas").style.color = "darkred";
        $(".nameInput").classList.remove("blueFocus");
        $(".nameInput").classList.add("redFocus");
        $(".selectIE").classList.remove("blueFocus");
        $(".selectIE").classList.add("redFocus");
        $(".check").classList.remove("blueFocus");
        $(".check").classList.add("redFocus");
        $(".valueInput").classList.remove("blueFocus");
        $(".valueInput").classList.add("redFocus");
    }
    else {
        $(".fas").style.color = "darkblue";
        $(".nameInput").classList.remove("redFocus");
        $(".nameInput").classList.add("blueFocus");
        $(".selectIE").classList.remove("redFocus");
        $(".selectIE").classList.add("blueFocus");
        $(".check").classList.remove("redFocus");
        $(".check").classList.add("blueFocus");
        $(".valueInput").classList.remove("redFocus");
        $(".valueInput").classList.add("blueFocus");
    }
};

function setIncomeData() {
    for (let i = 1; i < $(".tableInc").children.length; i++){
        newArray.push($(".tableInc").children[i].children[0].innerText);
        newArray.push($(".tableInc").children[i].children[1].innerText.slice(2)); 
    }
    let incData = [];
    localStorage.setItem("incData", newArray);
}

function setExpData() {
    for (let i = 1; i < $(".tableExp").children.length; i++){
        newArray1.push($(".tableExp").children[i].children[0].innerText);
        newArray1.push($(".tableExp").children[i].children[1].innerText.slice(2));
        newArray1.push($(".tableExp").children[i].children[2].innerText.slice(0, -1));

    }
    console.log(newArray1);
    let expData = [];
    localStorage.setItem("expData", newArray1);
}


(function getIncomeData() {
    let data = localStorage.getItem("incData");
    if (data !== null && data !== ""){
    data = data.split(",");
    for (let i = 0; i < data.length; i++){
        let newTr, output;
        newTr = document.createElement("tr");
        newTr.className = "tableformat";

        output = `<td>${data[i]}</td>
              <td>+ ${data[i+1]}<button class="btn">x</button></td>`;
    
        newTr.innerHTML = output;
        $(".tableInc").appendChild(newTr);
        income += parseFloat(data[i+1]);
        $(".incValue").innerHTML = `+ ${numberFormat(income)}`;
        
        total = (income - expenses).toFixed(2);
        totalAmount();
        updatePercentage();
        i++;
    }
}

})();

(function getExpData() {
    let data = localStorage.getItem("expData");
    if (data !== null && data !== ""){
    data = data.split(",");
    for (let i = 0; i < data.length; i++){
        let newTr, output, totalPercentage;
        newTr = document.createElement("tr");
        newTr.className = "tableformat";

    
        output = `<td>${data[i]}</td>
            <td>- ${data[i+1]}</td>
            <td>${((parseFloat(data[i+2])*100)/income).toFixed(2)}%<button class="btn">x</button></td>`
        newTr.innerHTML = output;
        $(".tableExp").appendChild(newTr);
        expenses += parseFloat(data[i+1]);
        $(".expValue").innerHTML = `- ${numberFormat(expenses)}`;
        totalPercentage = (expenses*(100)/income);
        $(".expPercentage").innerHTML = `${totalPercentage.toFixed(2)}%`;
        updatePercentage();
        i++;
        i++;
        }
}

})();

})();