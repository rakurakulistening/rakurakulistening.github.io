const responsive = {
    0: {
        items: 1
    },
    320: {
        items: 1
    },
    560: {
        items: 2
    },
    960: {
        items: 3
    }
}

$(document).ready(function () {

    //#region navigation
    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

    /** click event on toggle menu */
    $toggleCollapse.click(function () {
        $nav.toggleClass('collapse');
    })

   
    // AOS Instance
    AOS.init();
    //#endregion

    for(const topic of document.querySelectorAll("button.topic")){
        topic.onclick = function(){
        var location = window.location.pathname;
        localStorage.setItem("directoryPath", location.substring(0, location.lastIndexOf("/")));
        localStorage.setItem("theme", topic.parentElement.id);
        localStorage.setItem("topicName", topic.id);
        window.location.href='/themes/topic.html';
        }
    }

    for(const topic of document.querySelectorAll("button.topic")){
        topic.onmousemove = e => handleOnMouseMove(e);
    }


    //#region retreive discord data
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    
    // if (!accessToken) {
    //     window.location.href('/')
    //     return 
    // }

    fetch('https://discord.com/api/users/@me', {
    headers: {
        authorization: `${tokenType} ${accessToken}`,
    },
    })
    .then(result => result.json())
    .then(response => {
        const { username, avatar, id} = response;
        console.log(response);
        //set the welcome username string
        document.querySelector('#name').textContent = ` ${username}`;
        //set the avatar image by constructing a url to access discord's cdn
        document.querySelector("#avatar").src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;

        localStorage.setItem("user_name", username);
        localStorage.setItem("user_avatar", `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`);
    })
    .catch(console.error);
        
    //#endregion


    //#region hover effect
    const handleOnMouseMove = e => {
        const { currentTarget: target } = e;

        const rect =  target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`)
        target.style.setProperty("--mouse-y", `${y}px`)
    }

    //#endregion


});

