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
            themeIcn.setAttribute("style", "padding-left: 4px");            themeIcn.setAttribute("style", "padding-left: 4px");
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
    const topic = document.querySelector("#topic");

    fetch('./topics/test.json')
    .then(res => res.json())
    .then(data => {
        topic.innerHTML = `${data.topic}`;
        author.innerHTML = `- ${data.author}`;

    })
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

        for(const topic of document.querySelectorAll("button.topic")){
            topic.onmousemove = e => handleOnMouseMove(e);
        }
    //#endregion




});