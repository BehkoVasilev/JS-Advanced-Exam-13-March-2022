window.addEventListener("load", solve);

function solve() {
    document.getElementById("add").addEventListener("click", addToList);
    document.getElementById("reset").addEventListener("click", clear);
    let recipient = document.getElementById("recipientName");
    let title = document.getElementById("title");
    let message = document.getElementById("message");
    let listMails = document.getElementById("list");
    let sendMails = document.getElementsByClassName("sent-list")[0];
    let deletedMails = document.getElementsByClassName("delete-list")[0];

    function addToList(e){
        e.preventDefault();
        let recipientValue = recipient.value;
        let titleValue = title.value;
        let messageValue = message.value;
        
        if (!recipientValue || !titleValue  || !messageValue){
            return;
        }

        createOrder(recipientValue, titleValue, messageValue)
        clear()
    }

    function clear(e){
        recipient.value = "";
        title.value = "";
        message.value = "";
    }

    function createOrder(recipientValue, titleValue, messageValue){
        
        let liContainer = document.createElement("li");
        let divButtons = document.createElement("div");
        divButtons.setAttribute("id", "list-action");
        let h4Title = document.createElement("h4");
        let h4Reception = document.createElement("h4");
        let spamMessage = document.createElement("spam");

        h4Title.textContent = `Title: ${titleValue}`;
        h4Reception.textContent = `Recipient Name: ${recipientValue}`;
        spamMessage.textContent = `${messageValue}`;

        
        
        liContainer.appendChild(h4Title);
        liContainer.appendChild(h4Reception);
        liContainer.appendChild(spamMessage);

        let sendBtn = document.createElement("button");
        sendBtn.setAttribute("type", "submit");
        sendBtn.setAttribute("id", "send");
        sendBtn.textContent = "Send";
        sendBtn.addEventListener("click", send)

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.setAttribute("id", "delete");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteFirst);

        divButtons.appendChild(sendBtn);
        divButtons.appendChild(deleteBtn);
        liContainer.appendChild(divButtons);
        
        listMails.appendChild(liContainer)
    }

    function send(e){
        let currentMail = e.target.parentElement.parentElement;
        let currentMails = currentMail.querySelectorAll("h4")
        let liContainer = document.createElement("li");
        let divButton = document.createElement("div");

        divButton.setAttribute("class", "btn");
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.setAttribute("class", "delete");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteSecond);

        let spamTitle = document.createElement("spam");
        let spamReception = document.createElement("spam");

        spamTitle.textContent = currentMails[0].innerHTML;
        spamReception.textContent = `To: ${currentMails[1].innerHTML.split("Recipient Name:")[1]}`;
        divButton.appendChild(deleteBtn);
        liContainer.appendChild(spamReception);
        liContainer.appendChild(spamTitle);
        liContainer.appendChild(divButton);

        sendMails.appendChild(liContainer)
        currentMail.remove();

    }
    function deleteFirst(e){

        let currentTrash = e.target.parentElement.parentElement;
        let trash = currentTrash.querySelectorAll("h4");

        let liContainer = document.createElement("li");
        let spamTitle = document.createElement("spam");
        let spamReception = document.createElement("spam");

        spamTitle.textContent = trash[0].innerHTML;
        spamReception.textContent = `To: ${trash[1].innerHTML.split("Recipient Name:")[1]}`;

        liContainer.appendChild(spamReception);
        liContainer.appendChild(spamTitle);
        deletedMails.appendChild(liContainer)
        currentTrash.remove();
    }

    function deleteSecond(e){
        let currentTrash = e.target.parentElement.parentElement;
        let trash = e.target.parentElement.parentElement.querySelectorAll("spam")

        let liContainer = document.createElement("li");
        let spamTitle = document.createElement("spam");
        let spamReception = document.createElement("spam");

        spamTitle.textContent = trash[0].innerHTML;
        spamReception.textContent = trash[1].innerHTML;

        liContainer.appendChild(spamTitle);
        liContainer.appendChild(spamReception);
        deletedMails.appendChild(liContainer)
        currentTrash.remove();
    }

}
