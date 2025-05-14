
const button = document.querySelector("input");
const paragraph = document.querySelector("p");
var NumberPicToDisplay = 30;
var CurrenPicNumber = NumberPicToDisplay;
class Utilities
{
    Utilities()
    {

    }

    AddDescription(descriptionText,pictureName)
    {
        var NewDesc = document.createTextNode(descriptionText);
        NewDesc.className = "desc";
        NewDesc.target ="_blank";
        NewDesc.href = pictureName;
    
        return NewDesc;
    }
    
    AddAPicture(pictureName)
    {
        var newPic = document.createElement("img");
    
        newPic.className = "Logo";
        newPic.src = pictureName;
        newPic.style.width = 600; 
        newPic.style.height = 400;
    
        return newPic;
    }


    AddAnchor(pictureName)
    {
        var NewAnchor = document.createElement("a");
        NewAnchor.target ="_blank";
        NewAnchor.href = pictureName;

        return NewAnchor;
    }
}


const query = ''

class Gallery
{
    MozaikID = "mosaïque"
    CollumnID = "collumn"
    CurrentOrganszation = this.MozaikID;
    constructor()
    {
        this.utilities = new Utilities();
        this.CurrentOrganszation = this.MozaikID;
    }

    AddText(text)
    {
        var newDiv = document.createElement("div");
     
        var NewDesc = document.createTextNode(text);
        newDiv.appendChild(NewDesc);
    
           
        var currentDiv = document.getElementById("mosaïque");
        currentDiv.appendChild(newDiv);
    }

    
    CleanMozaik()
    {
        document.getElementById("mosaïque").innerHTML = "";
    }

    
    CleanCollumn()
    {
        document.getElementById("collumn").innerHTML = "";
    }

    AddPicture(pictueName,description)
    {
        var newDiv = document.createElement("div");
        newDiv.className = "gallery";
    
        var NewAnchor = this.utilities.AddAnchor(pictueName);
        
        var NewDesc = this.utilities.AddDescription(description,pictueName);            
    
        var newPic = this.utilities.AddAPicture(pictueName);
    
        NewAnchor.appendChild(newPic);
        newDiv.appendChild(NewAnchor);
        newDiv.appendChild(NewDesc);

   
        var currentDiv = document.getElementById(this.CurrentOrganszation);
        
        currentDiv.appendChild(newDiv);
    }

    CallDnDLIbrary()
    {
    const MyHeaders = new Headers();
    MyHeaders.append("Accept","application/json");

    const requestOptions = {
        method :"GET",
        Headers : MyHeaders,
        redirect : "follow"
    };

    const Fetch = fetch(this.GetPicturePath(), requestOptions);

        Fetch.then((response) => response.json()).then(result => {
            for(var i = 0; i < CurrenPicNumber;i++)
            {         
                var Monsterresult = fetch(this.GetPicturePath() +result.results[i].index);
                Monsterresult.then(response => response.json()).then(result => 
                {
                    this.AddPicture("https://www.dnd5eapi.co"+result.image,result.name);
                });
            }
        })


    }

    AddOnePicture()
    {
        const MyHeaders = new Headers();
        MyHeaders.append("Accept","application/json");
    
        const requestOptions = {
            method :"GET",
            Headers : MyHeaders,
            redirect : "follow"
        };

        const Fetch = fetch(this.GetPicturePath(), requestOptions);

            Fetch.then((response) => response.json()).then(result => {
            var Monsterresult = fetch(this.GetPicturePath() +result.results[CurrenPicNumber].index);
            Monsterresult.then(response => response.json()).then(result => 
            {
               this.AddPicture("https://www.dnd5eapi.co"+result.image,result.name);
            });
        })


        CurrenPicNumber++;
    }
    

    SetMozaikPath()
    {
        this.CurrentOrganszation = this.MozaikID;
    }

    SetCollumnPath()
    {
        this.CurrentOrganszation = this.CollumnID;
    }

    GetPicturePath()
    {
        return "https://www.dnd5eapi.co/api/2014/monsters/";
    }


    displayDNDMonster()
    {
        this.CallDnDLIbrary();
    }

    refreshDisplay()
    {
        gallery.CleanCollumn();
        gallery.CleanMozaik();
        gallery.CallDnDLIbrary();
    }
}

class Comment{

    constructor()
    {
        this.utilities = new Utilities();
    }

    GetPromptText()
    {
        var x = document.getElementById("Promptframe").value;
        return x;
    }
    
    AddDynamicPrompt(text)
    {
        var newDiv = document.createElement("div");
        newDiv.className = "feed-content";
    
        var NewDesc = document.createTextNode(text);
        newDiv.appendChild(NewDesc);
    
        var currentDiv = document.getElementById("feederMosaik");
        currentDiv.appendChild(newDiv);
        currentDiv.classList.toggle("show");
    }
    
    
    
    
    addJokeToMosaik(setup, delivery) {
        var newDiv = document.createElement("div");
    
        var newContent = document.createTextNode(setup + "\n" + delivery + "\n");
        
        newDiv.appendChild(newContent);
        
        var currentDiv = document.getElementById("mosaïque");
    
        currentDiv.appendChild(newDiv);
    }
    
    AddContent()
    {
        this.AddDynamicPrompt(this.GetPromptText());
    }


    DisplayFeeder()
    {
        document.getElementById("feeder").classList.toggle("show");
    }

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



const gallery = new Gallery();
function DisplayInMozaik()
{
 
    gallery.SetMozaikPath();
    gallery.refreshDisplay();
}

function AddContentOnGrid()
{
    gallery.AddPicture();
}

function DisplayInCollumn()
{
    gallery.SetCollumnPath();
    gallery.refreshDisplay();
}

function AddAPicture()
{
    gallery.AddOnePicture("mosaïque");
}


const commentZOne = new Comment();
button.addEventListener("click",gallery.refreshDisplay)
button.addEventListener("",gallery.AddOnePicture)
