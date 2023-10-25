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

    themeBtn.onclick = function(){
        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            // document.body.classList.toggle("light-mode");
            themeIcn.setAttribute("class", "fa-solid fa-moon");
        } else {
            themeIcn.setAttribute("class", "fa-solid fa-sun");
        }
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

    const taskButtonTemplate = document.querySelector("[data-task-template]");
    const taskButtonContainer = document.querySelector("[data-task-button-container]");
    const searchInput = document.querySelector("[data-search]");

    let tasks = []

    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
        tasks.forEach(task => {
            const isVisible = task.name.toLowerCase().includes(value);
            // const isVisible = tasks.name.includes(value) || tasks.lang.includes(value)
        task.element.classList.toggle("hide", !isVisible)
        })
    } )

    fetch("./tasks.json")
    .then(res => res.json())
    .then(data => {
        tasks = data.map(task => {
            const button = taskButtonTemplate.content.cloneNode(true).children[0];

            const name = button.querySelector("[data-name]")
            name.textContent = task.subtopic;

            // const image = button.querySelector("[data-image]")
            // const lang = button.querySelector("[data-language]")


            taskButtonContainer.append(button);
            // console.log(button);
            // return {name: task.name, lang: task.lang}
            return {name: task.subtopic, element: button}
        })
    })
  
});


//save the search term to the website's memory when enter is pressed on any page with the search bar
//on enter, redirect to the results page
//sort like in video with the input being the search term that was saved to memory (all tasks already on the results page but are instantly hidden when the page is loaded/indexes for that term)

