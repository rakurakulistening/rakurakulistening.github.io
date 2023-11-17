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

    //#region theme switching
    var themeBtn = document.getElementById("theme-switch");
    var themeIcn = document.getElementById('theme');

    function toggleDark(){
        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            sessionStorage.setItem("dark", true)
            themeIcn.setAttribute("class", "fa-solid fa-moon");
            themeIcn.setAttribute("style", "padding-left: 4px");            
        } else {
            sessionStorage.setItem("dark", false)
            themeIcn.setAttribute("class", "fa-solid fa-sun");
            themeIcn.removeAttribute("style");
        }
    }

    if(sessionStorage.getItem('dark')==="true"){
        // document.body.classList.toggle("dark-mode");
        toggleDark();
    }

    themeBtn.onclick = function(){
        toggleDark();
    }
    
    //#endregion

    //#region search-bar
    var searchBar = document.getElementById("search");
    searchBar.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          console.log(event.target.value);
          console.log(window.location.hostname);
          localStorage.setItem('searchTerm', (event.target.value).toLowerCase())
        //   console.log(`${(window.location.href).replace('/themes', '')}/results`)
          window.location= `${(window.location.href).replace('/themes', '').replace('.html', '')}/results`;
          
        }
      });
    //#endregion

    //#region user info
    // if(sessionStorage.getItem("user_name") == "undefined"){
    //     // console.log(sessionStorage.getItem("user_name"))

    //     localStorage.setItem("user_name", "sign in");
    //     // document.querySelector('#name').textContent = "sign in";
    // }
    // else {
    //     document.querySelector('#name').textContent = sessionStorage.getItem("user_name");

    //     console.log("b")
    // }

    // if(sessionStorage.getItem("user_avatar") == "https://cdn.discordapp.com/avatars/undefined/undefined.jpg"){
    //     let avt = document.createElement('i');
    //     avt.setAttribute("class", "fa-brands fa-discord")
    //     document.querySelector("#discord").appendChild(avt);

    //     let current = document.querySelector("#avatar");
    //     document.querySelector("#discord").removeChild(current);
    // }
    // else {
    //     document.querySelector("#avatar").src = sessionStorage.getItem("user_avatar");
    // }
    //#endregion

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
        window.location.href='/content/topics';
        }
    }

    for(const topic of document.querySelectorAll("button.topic")){
        topic.onmousemove = e => handleOnMouseMove(e);
    }


    // //#region retreive discord data
    // const fragment = new URLSearchParams(window.location.hash.slice(1));
    // const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    
    // if (!accessToken) {
    //     window.location.href('/')
    //     return 
    // }


    // fetch('https://discord.com/api/users/@me', {
    // headers: {
    //     authorization: `${tokenType} ${accessToken}`,
    // },
    // })
    // .then(result => result.json())
    // .then(response => {
    //     const { username, avatar, id} = response;
    //     console.log(response);
    //     //set the welcome username string
    //     document.querySelector('#name').textContent = ` ${username}`;
    //     //set the avatar image by constructing a url to access discord's cdn
    //     // if(document.querySelector("#avatar")){
    //         document.querySelector("#avatar").src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
    //     // }

    //     sessionStorage.setItem("user_name", username);
    //     sessionStorage.setItem("user_avatar", `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`);
    // })
    // .catch(console.error).then(() =>{
    //     console.log("nvm")
    //     document.querySelector('#name').textContent = "sign in";

    //     let avt = document.createElement('i');
    //     avt.setAttribute("class", "fa-brands fa-discord")
    //     document.querySelector("#discord").appendChild(avt);

    //     let current = document.querySelector("#avatar");
    //     document.querySelector("#discord").removeChild(current);

    //     document.querySelector("#discord").setAttribute("onclick", "location.href='https://discord.com/api/oauth2/authorize?client_id=1123185304958939226&redirect_uri=https%3A%2F%2Frakurakulistening.github.io%2Fthemes%2Ftheme.html&response_type=token&scope=identify'");

    // })
        
    // //#endregion


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

