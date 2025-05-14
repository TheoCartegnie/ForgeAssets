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