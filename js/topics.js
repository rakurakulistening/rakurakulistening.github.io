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

    // let historyCount = history.length;

    // window.onpopstate = function(event) {
    //     if(history.length > historyCount) {
    //         historyCount++;
    //         window.location.href = `${window.location.hostname}/task`;
    //     } else {
    //         historyCount--;
    //         window.location.href = `${window.location.hostname}/themes`;
    //     }
    // };

    // window.addEventListener('hashchange', function() {
    //     if (location.hash.length > 0){
    //         // Navigate to the hash
    //         document.getElementById(location.hash.substr(1)).scrollIntoView();
    //     } else {
    //         // Go the beginning
    //         document.getElementById('COMMENT1').scrollIntoView();
    //         document.body.scrollIntoView();
    //     }
    // }, false);

    // window.addEventListener('popstate', function(e) {
    //     if (window.history.length > historyLength) {
    //         alert("Forward button clicked");
    //     } else if (window.history.length < historyLength) {
    //         alert("Back button clicked");
    //     }
    
    //     // Update the history length
    //     historyLength = window.history.length;
    // });


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

    //#region user info
    // if(sessionStorage.getItem("user_name") == "undefined"){
    //     document.querySelector('#name').textContent = "sign in";
    //     console.log("a")
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
        
    //     document.querySelector("#discord").setAttribute("onclick", "location.href='https://discord.com/api/oauth2/authorize?client_id=1123185304958939226&redirect_uri=https%3A%2F%2Frakurakulistening.github.io%2Fthemes%2Ftheme.html&response_type=token&scope=identify'");

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

    //#region read JSON file

    //#region user info
        //set the welcome username string
        // document.querySelector('#name').textContent = sessionStorage.getItem("user_name");
        // //set the avatar image by constructing a url to access discord's cdn
        // document.querySelector("#avatar").src = sessionStorage.getItem("user_avatar");
    //#endregion

    // const myKeyValues = window.location.search;


    // if(my){

    // }
    //values read from task page 
    const topic = document.querySelector("#topic");
    const taskContainer = document.querySelector("#task-container");

    // alert(`${localStorage.getItem("directoryPath")}/${localStorage.getItem("theme").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}.json`)

    fetch(`${localStorage.getItem("directoryPath")}/${localStorage.getItem("theme").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}.json`)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('topicName', data.topic);

        

        //#region urlParams
        // window.history.replaceState(null, null, `/content/?topic=${localStorage.getItem('topicName').toLowerCase().replaceAll(' ', '-')}`);

        // const myKeyValues = (window.location.href).replace('/content', '');
        // const urlParams = new URLSearchParams(myKeyValues);
    
        // //if the user types a theme name into the url like-this
        // // if(urlParams.has('topic')){
        // //     localStorage.setItem('topicName', urlParams.get('topic').replace('-', '_'))
        // // }
        // // if(urlParams.has('topic') && urlParams.has('task')){
        // //     localStorage.setItem('taskName', urlParams.get('task').replace('-', '_'))
        // //     window.location.href = (window.location.href).replace('\/.*$', '')
        // // }

        // console.log(urlParams)
        //#endregion

        topic.innerHTML = `${data.topic}`;
        //generate the task buttons
        for(let i=0;i<data.subtopics.length;i++){
            let subtopicDiv = document.createElement('div');
            subtopicDiv.setAttribute("id", data.subtopics[i].name);     
            subtopicDiv.setAttribute("class", "child_buttons");            
    

            let subtopicHeading = document.createElement('h3');
            subtopicHeading.setAttribute("id", "subtopic");    
            subtopicHeading.textContent = data.subtopics[i].name;    
            subtopicDiv.appendChild(subtopicHeading);


            for(let j=0;j<data.subtopics[i].tasks.length;j++){
                let taskButton = document.createElement('button');
                taskButton.setAttribute("id", data.subtopics[i].tasks[j]);  
                taskButton.className = "task";
                // taskButton.setAttribute("onclick", "location.href='/content/task'");


                let taskName = document.createElement('a');
                taskName.textContent = data.subtopics[i].tasks[j];
                let br1 = document.createElement('br');
                taskName.appendChild(br1);

                taskButton.appendChild(taskName);
                

                let bgImg = document.createElement('img');
                bgImg.setAttribute("src", data.subtopics[i].images[j]);
                bgImg.setAttribute("width", "100px");
                bgImg.setAttribute("height", "100px");
                taskButton.appendChild(bgImg);

                let br2 = document.createElement('br');
                taskButton.appendChild(br2);

                let taskLang = document.createElement('b');
                taskLang.textContent = data.subtopics[i].lang[j];
                taskButton.appendChild(taskLang);


                subtopicDiv.append(taskButton);

            }

            taskContainer.appendChild(subtopicDiv);

        }

    }).then(()=> {
        //#region hover effect
        const handleOnMouseMove = e => {
            const { currentTarget: target } = e;

            const rect =  target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

            target.style.setProperty("--mouse-x", `${x}px`)
            target.style.setProperty("--mouse-y", `${y}px`)

        }

        for(const task of document.querySelectorAll("button.task")){
            task.onmousemove = e => handleOnMouseMove(e);
            task.onclick = function(){
                localStorage.setItem("subtopic", task.parentElement.id);
                localStorage.setItem("taskName", task.id);

                // window.history.replaceState(null, null, `/content/topics`);

                window.location.href='/content/task';
            }
        }
        //#endregion

    })

  
    //#endregion

});