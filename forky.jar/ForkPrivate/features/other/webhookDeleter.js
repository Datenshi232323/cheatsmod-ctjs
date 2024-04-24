import request from "requestV2"

function deleteWebhook(hookURL) { 
    request({
        url: hookURL,
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "User-Agent":"Mozilla/5.0"
        }
    }).catch(error => {
        ChatLib.chat("§zFork Private > §gWebhook Deletion Error! Please verify your URL is correct.")
    }) 
    ChatLib.chat("§zFork Private > §gWebhook Deleted!")
}

export { deleteWebhook }