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

    for(const task of document.getElementsByClassName("task")){
        task.onmousemove = e => handleOnMouseMove(e);
    }
    //#endregion

    const taskButtonTemplate = document.querySelector("[data-task-template]");
    const taskButtonContainer = document.querySelector("[data-task-button-container]");
    const searchInput = document.querySelector("[data-search-bar]");

    let tasks = [];

    fetch("./tasks.json")
    .then(res => res.json())
    .then(data => {
        tasks = data.map(task => {
            const button = taskButtonTemplate.content.cloneNode(true).children[0];

            const name = button.querySelector("[data-name]")
            name.textContent = task.name;

            button.dataset.name = `${task.number}. ${task.name}`; //add task name from json
            button.dataset.theme = task.theme;
            button.dataset.topic = task.topic;
            button.dataset.subtopic = task.subtopic;
            
            // const image = button.querySelector("[data-image]")
            // image.

            const lang = button.querySelector("[data-language]");
            lang.textContent = `${task.language}で`;

            taskButtonContainer.append(button);
            // console.log(button);
            // return {name: task.name, lang: task.lang}
            return {name: task.name, element: button}
        })

        var taskButtons = document.getElementsByClassName("task");

        for (let i = 0; i < taskButtons.length; i++) {
            taskButtons[i].onclick = function() {
                localStorage.setItem('theme', this.dataset.theme);
                localStorage.setItem('topicName', this.dataset.topic);
                localStorage.setItem('subtopic', this.dataset.subtopic);
                localStorage.setItem('taskName', this.dataset.name);
                window.location.href = `${(window.location.href).replace('/results', '').replace('.html', '')}/task`;
            }
        }

        searchInput.addEventListener("input", e => {
            if(searchInput.value){
                document.getElementById("title").textContent = `results for "${searchInput.value}"`;
            } else {
                document.getElementById("title").textContent = '';
            }
            const value = e.target.value.toLowerCase();
            tasks.forEach(task => {
                const isVisible = task.name.toLowerCase().includes(value);
                // const isVisible = tasks.name.includes(value) || tasks.lang.includes(value)
                task.element.classList.toggle("hide", !isVisible)
            })
        } )
    
        if (localStorage.getItem('searchTerm')) {
            searchInput.value = localStorage.getItem('searchTerm');
            var event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            searchInput.dispatchEvent(event);
        }   
    })

    
  
});


//save the search-bar term to the website's memory when enter is pressed on any page with the search-bar bar
//on enter, redirect to the results page
//sort like in video with the input being the search-bar term that was saved to memory (all tasks already on the results page but are instantly hidden when the page is loaded/indexes for that term)

