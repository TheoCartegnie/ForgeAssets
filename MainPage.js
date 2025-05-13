
const button = document.querySelector("input");
const paragraph = document.querySelector("p");



button.addEventListener("click",refreshText)

const query = ''

function refreshText()
{
        CleanText();
        CallDnDLIbrary();
}

function CleanText()
{
    document.getElementById("mosaïque").innerHTML = "";
}

function AddDynamicPrompt(text)
{
    var newDiv = document.createElement("div");

    var NewDesc = document.createTextNode(text);
    


    newDiv.appendChild(NewDesc);

    var currentDiv = document.getElementById("feederMosaik");

    currentDiv.appendChild(newDiv);
}

function AddDNDText(text)
{
    var newDiv = document.createElement("div");
    newDiv.className("textFeedRect");
    var NewDesc = document.createTextNode(text);

    newDiv.appendChild(NewDesc);

       
    var currentDiv = document.getElementById("mosaïque");

    currentDiv.appendChild(newDiv);

}

function AddPicture(pictueName,description)
{
    var newDiv = document.createElement("div");
    newDiv.className = "gallery";

    var NewAnchor = AddAnchor(pictueName);
    
    var NewDesc = AddDescription(description,pictueName);            

    var newPic = AddAPicture(pictueName);

    NewAnchor.appendChild(newPic);
    newDiv.appendChild(NewAnchor);
    newDiv.appendChild(NewDesc);
    
    var currentDiv = document.getElementById("mosaïque");
    
    currentDiv.appendChild(newDiv);
}

function AddAnchor(pictureName)
{
    var NewAnchor = document.createElement("a");
    NewAnchor.target ="_blank";
    NewAnchor.href = pictureName;

    return NewAnchor;
}

function AddDescription(descriptionText,pictureName)
{
    var NewDesc = document.createTextNode(descriptionText);
    NewDesc.className = "desc";
    NewDesc.target ="_blank";
    NewDesc.href = pictureName;

    return NewDesc;
}

function AddAPicture(pictureName)
{
    var newPic = document.createElement("img");

    newPic.className = "Logo";
    newPic.src = pictureName;
    newPic.style.width = 600; 
    newPic.style.height = 400;

    return newPic;
}

function addJokeToMosaik(setup, delivery) {
    var newDiv = document.createElement("div");

    var newContent = document.createTextNode(setup + "\n" + delivery + "\n");
    
    newDiv.appendChild(newContent);
    
    var currentDiv = document.getElementById("mosaïque");

    currentDiv.appendChild(newDiv);
}


function CallDnDLIbrary()
{
const MyHeaders = new Headers();
MyHeaders.append("Accept","application/json");

const requestOptions = {
    method :"GET",
    Headers : MyHeaders,
    redirect : "follow"
};

const Fetch = fetch("https://www.dnd5eapi.co/api/2014/monsters", requestOptions);

    Fetch.then((response) => response.json()).then(result => {
        for(var i = 0; i < 30;i++)
        {         
            var Monsterresult = fetch("https://www.dnd5eapi.co/api/2014/monsters/"+result.results[i].index);
            Monsterresult.then(response => response.json()).then(result => 
            {
                AddPicture("https://www.dnd5eapi.co"+result.image,result.name);
            });
        }
    })


}

function displayOneCharacter()
{
    fetch("https://www.dnd5eapi.co/api/2014/monsters").then(rep => rep.json()).then(data => console.log())
}

function displayOneJoke() {
    // fetch + appel addJokeToMosaik

    fetch("https://v2.jokeapi.dev/joke/Any?lang=fr")
        .then(rep => rep.json())
        .then(joke => 
        {
            addJokeToMosaik(joke.setup,joke.delivery);
        })
 
}

function AddContent()
{
    AddDynamicPrompt("Ceci est un test");
}

function displayDNDMonster()
{
    CallDnDLIbrary();
}

function DisplayFeeder()
{
    document.getElementById("feeder").classList.toggle("show");
}

function DisplayDropDown()
{
    document.getElementById("NavigationDropDown").classList.toggle("show");
}

window.onclick = function(event)
{
    if(!event.target.matches('.dropbtn'))//Verification que l'objet selectionner par l'utilisateur est un .dropbtn
    {
        var DropDown = document.getElementsByClassName("dropdown-content");//Récupération de tout les objets marque "dropdown-content"
        var i = 0;
        for (i = 0; i < DropDown.length; i++)//Pour tout les "dropdown-content" recuperé : 
        {
            var openDropDown  = DropDown[i];// Recupération d'un dropdown de l'index 'i' dans une variable
            if(openDropDown.classList.contains('show'))
            {
                openDropDown.classList.remove('show');
            }
        }
    }
}


displayDNDMonster();