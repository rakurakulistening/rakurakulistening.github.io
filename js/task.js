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

    //#region user info
        //set the welcome username string
        document.querySelector('#name').textContent = localStorage.getItem("user_name");
        //set the avatar image by constructing a url to access discord's cdn
        document.querySelector("#avatar").src = localStorage.getItem("user_avatar");
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
        
    //elements in task page 
    // const locationDiv = document.querySelector("#location");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const responses = document.querySelector("#responses");
    var audio = document.getElementById("task-audio");
    const check = document.querySelector("#check")
    
    //#region read JSON file and create task buttons
    fetch(`${localStorage.getItem("directoryPath")}/${localStorage.getItem("theme").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("subtopic").toLowerCase().replaceAll(' ', '_')}/${/. (.+)/.exec(localStorage.getItem('taskName'))[1]}.json`)
    .then(res => res.json())
    .then(data => {
        //read json
        title.innerHTML = `${data.subtopic}`,
        description.innerHTML = `${data.description}`,
        audio.setAttribute('src', `${data.audio}`);
        audio.setAttribute('captions', 'ngbioergo')

        // audio.textTracks[0].addEventListener('cuechange', function() {
        //     document.getElementById('my-subtitle-display').innerText = this.activeCues[0].text;
        // });


        responses.setAttribute("data-aos", "fade-in")
        responses.setAttribute("data-aos-delay", "50")



        //generate the questions
        for (let i = 0; i <= data.questions.length - 1; i++) {
            let question = document.createElement('div');
            question.setAttribute("class", `group`);  
            question.setAttribute("id", `question${i+1}`)        
              
            
            let q = document.createElement('a');
            q.setAttribute("id", `q${i+1}`)
            q.setAttribute("class", `question`);  
            if(!(data.questions.length === 1)){
                q.textContent = `${i+1}. ${data.questions[i]}`;
            } else {
                q.textContent = data.questions[i];
            }

            let type = document.createElement('textarea');
            type.setAttribute("id", `answer${i+1}`);
            type.setAttribute("class", "answer");

        
            question.appendChild(q);
            question.appendChild(type);

            responses.appendChild(question);


        }

        document.getElementById("check").onclick = function(){
            //#region handle check answers
            for(let a=0; a < data.questions.length; a++){

                //overarching solution div
                let solution = document.createElement('div');
                solution.setAttribute("id", `solution${a+1}`);
                solution.setAttribute("class", `solution`);

                //suggested '<a>' answer inside div
                let suggested = document.createElement('a');
                suggested.setAttribute("id", `suggested${a+1}`);
                suggested.setAttribute("class", `suggested`)
                suggested.text = `Suggested Answer: \n ${data.solutions[a]}`;

                //animations:
                solution.setAttribute("data-aos", "fade-right")
                solution.setAttribute("data-aos-delay", "50")

                //structure
                solution.appendChild(suggested);
                document.querySelector(`#question${a+1}`).appendChild(solution);

            }

            //#region create the script button
            let script = document.createElement('button');
            script.setAttribute("id", "script");
            script.setAttribute("data-aos", "fade-left")
            script.setAttribute("data-aos-delay", "50")
            script.setAttribute("class", "icon-button");

            let scriptIcon = document.createElement('i');
            scriptIcon.setAttribute("class", "fa-solid fa-scroll")

            script.appendChild(scriptIcon);
            document.querySelector("#specific").appendChild(script);
            
            //disable the button to avoid extra solutions being added
            document.getElementById("check").disabled = true;
            
            var dialogue = document.querySelector("#dialogue");

            //clicking script button
            script.onclick = function(){
                let tr = document.querySelector("#transcript");

                // Check if the element already exists
                if (dialogue.contains(tr)) {
                    // If it exists, check if it is visible
                        //if hidden, show
                        if(tr.hidden === true){
                            tr.hidden = false;
                        } 
                        else //if shown, hide
                        tr.hidden = true;
                } else {
                    // If it doesn't exist, create and append it
                    var transcript = document.createElement("div");
                    // transcript.setAttribute("hidden", "false")
                    transcript.hidden = false;
                    transcript.setAttribute("id", "transcript");
                    transcript.setAttribute("class", "transcript");
                    transcript.setAttribute("data-aos", "fade-down")
                    transcript.setAttribute("data-aos-delay", "50")
                    // data-aos="fade-in" data-aos-delay="100"

                    for(l=0;l<data.transcript.length;l++){
                        var line = document.createElement("a");
                        line.setAttribute("id", `line${l+1}`);

                        line.textContent += data.transcript[l];

                        var linebreak = document.createElement("br");
                        line.appendChild(linebreak);

                        transcript.appendChild(line);

                    }

                    dialogue.appendChild(transcript);
                    // dialogue.appendChild(line);

                }
            }

            //#endregion


            //#region submit to discord'
            var answers = '';

            //add each response to a string
            for(r=0; r<document.getElementsByClassName("answer").length; r++){
                if(!(data.questions.length === 1)){
                    answers += `${r+1}. ${document.getElementById(`answer${r+1}`).value}\n`;
                } else {
                    answers += document.getElementById(`answer${r+1}`).value;
                }
            }

            //get user pfp dominant colour
            const colorThief = new ColorThief();
            const img = document.querySelector('#user_avatar');

            // Make sure image is finished loading
            if (img.complete) {
            colorThief.getColor(img);
            } else {
            image.addEventListener('load', function() {
                colorThief.getColor(img).then(color => {
                    localStorage.setItem("userColor", color)
                })
            });
            }


            const webhookBody = {
                username: localStorage.getItem("user_name"),
                avatar_url: localStorage.getItem("user_avatar"),
                embeds: [
                    {
                      type: "rich",
                      title: "",
                      description: `${localStorage.getItem("theme")} > ${localStorage.getItem("topicName")} > ${localStorage.getItem("subtopic")}`,
                    //   description: "",
                    //   color: 0x000000,
                    color: localStorage.getItem("userColor"),
                      fields: [
                        {
                          name: "`" + localStorage.getItem("taskName") + "`",
                          value: `${answers}`
                        }
                      ]
                    }
                  ],
            };  

            //test
            const webhookUrl = 'https://discord.com/api/webhooks/1123222454354063440/e_78ggT0dZs7q4uDjJSQCO8o9ZRfF4Gh4zo9I9bgekgSp0uugQRtvfZgDzb7YwzgdL7K';
            
            //actual
            // const webhookUrl = 'https://discord.com/api/webhooks/1123458335312711680/ScFAWrtAA6HqnWNtHL7DZRrOUa-4_DcnS7OcYsfcCx2J63wiyJBZKVaFTHpI00ls3mgU';

            fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookBody),
            });




            //#endregion
        }

        
    })



    

    //#endregion



});