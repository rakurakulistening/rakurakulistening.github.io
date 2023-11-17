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

    // window.onpopstate = function() {
    //     if(history.length > historyCount) {
    //         historyCount++;
    //     } else {
    //         historyCount--;
    //         window.location.href = `${window.location.hostname}/topics`;
    //     }
    // };

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
    //     if(sessionStorage.getItem("user_name") == null){
    //         document.querySelector('#name').textContent = sessionStorage.getItem("user_name");
    //     }
    //     else {
    //         document.querySelector('#name').textContent = "sign in";
    //     }

    //     if(sessionStorage.getItem("user_avatar") == "https://cdn.discordapp.com/avatars/undefined/undefined.jpg"){
    //         let avt = document.createElement('i');
    //         avt.setAttribute("class", "fa-brands fa-discord")
    //         document.querySelector("#discord").appendChild(avt);

    //         let current = document.querySelector("#avatar");
    //         document.querySelector("#discord").removeChild(current);
    //     }
    //     else {
    //         document.querySelector("#avatar").src = sessionStorage.getItem("user_avatar");
    //     }
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
    // console.log(`${localStorage.getItem("directoryPath")}/${localStorage.getItem("theme").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("subtopic").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem('taskName')}.json`)


    
    fetch(`${localStorage.getItem("directoryPath")}/${localStorage.getItem("theme").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("topicName").toLowerCase().replaceAll(' ', '_')}/${localStorage.getItem("subtopic").toLowerCase().replaceAll(' ', '_')}/${/. (.+)/.exec(localStorage.getItem('taskName'))[1]}.json`)
    .then(res => res.json())
    .then(data => {

        //#region urlParams
        // window.history.replaceState(null, null, `/content/?topic=${localStorage.getItem('topicName').toLowerCase().replaceAll(' ', '-')}&task=${data.subtopic}`);

        // const myKeyValues = (window.location.href).replace('/content', '');
        // const urlParams = new URLSearchParams(myKeyValues);
    
        // //if the user types a task name into the url like-this
        // if(urlParams.has('topic')){
        //     localStorage.setItem('topicName', urlParams.get('topic').replace('-', '_'))
        // }
        // if(urlParams.has('task')){
        //     localStorage.setItem('taskName', urlParams.get('task').replace('-', '_'))
        // }

        // console.log(urlParams)
        //#endregion


        document.title = `${data.subtopic}`;
        //read json
        title.innerHTML = `${data.subtopic}`,
        description.innerHTML = `${data.description}`,
        audio.setAttribute('src', `${data.audio}`);
        // audio.setAttribute('captions', 'ngbioergo')

        //configure pdf headings
        if(data.language == "English"){
            var part = 'A';
            var textnum = "1";
            var lang_instructions = "– Answer the following questions in";
            var langPos = 93;
        } else if (data.language == "Japanese") {
            var part = 'B';
            var textnum = "2";
            var lang_instructions = "– Answer the following questions in complete sentences in";
            var langPos = 128;
        }

        //breadcrumb
        document.getElementById("location").textContent = `${localStorage.getItem("theme")} > ${localStorage.getItem("topicName")} > ${localStorage.getItem("subtopic")}`;

        //animations
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

                // //animations:
                // solution.setAttribute("data-aos", "fade-right")
                // solution.setAttribute("data-aos-delay", "50")

                // suggested.setAttribute("data-aos", "fade-right")
                // suggested.setAttribute("data-aos-delay", "50")

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
                    // transcript.setAttribute("transition", "ease-in-out")
                    // transcript.setAttribute("--transition-delay", "1")
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

            // const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            //     const hex = x.toString(16)
            //     return hex.length === 1 ? '0' + hex : hex
            // }).join('')
        
                // const colorThief = new ColorThief();
                // const img = document.querySelector('#pfp');
        
                // // Make sure image is finished loading
                // if (img.complete) {
                //     colorThief.getColor(img).then(color => {
                //         alert(color)
                //         localStorage.setItem("userColor", rgbToHex(color[0], color[1], color[2]));
                //         // alert(color[0]);
                        
                //     })        
                // } else {
                // img.addEventListener('load', function() {
                //     colorThief.getColor(img).then(color => {
                //         localStorage.setItem("userColor", rgbToHex(color[0], color[1], color[2]));
                //         // alert(color[0]);
                //     })        
                // });
                // }
            

            const webhookBody = {
                username: sessionStorage.getItem("user_name"),
                avatar_url: sessionStorage.getItem("user_avatar"),
                embeds: [
                    {
                      type: "rich",
                      title: "",
                      description: `${localStorage.getItem("theme")} > ${localStorage.getItem("topicName")} > ${localStorage.getItem("subtopic")}`,
                      color: 0x000000,
                    // color: localStorage.getItem("userColor"),
                      fields: [
                        {
                          name: "`" + localStorage.getItem("taskName") + "`\n",
                          value: `${answers}`
                        }
                      ]
                    }
                  ],
            };  

            //test channel
            const webhookUrl = 'https://discord.com/api/webhooks/1123222454354063440/e_78ggT0dZs7q4uDjJSQCO8o9ZRfF4Gh4zo9I9bgekgSp0uugQRtvfZgDzb7YwzgdL7K';
            
            //actual channel
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

        //#region pdf generation
        document.getElementById("pdf").onclick = function(){
            // Default export is a4 paper, portrait, using millimeters for units
            window.jsPDF = window.jspdf.jsPDF;
            const doc = new jsPDF();
            doc.addFont("../fonts/Sawarabi_Mincho/SawarabiMincho-Regular.ttf", "Sawarabi Mincho", "Regular");

            //shapes
            doc.setLineWidth(0.3); 
            doc.rect(20, 36, 169.6, 39, 'S')

            // line(x1, y1, x2, y2, style)


            //#region bolded heading text
            doc.setFont("times", "bold");
            doc.setFontSize(12.96);
            doc.text("SECTION 1", 20, 24);
            doc.text(`Part ${part} – Listening and responding in ${data.language}`, 20, 33);
            doc.text(`Instructions for Section 1 – Part ${part}`, 71, 42);
            doc.text(`Text ${textnum}, Question ${textnum}`, 23, 49)
            //#endregion

            //#region body text
            doc.setFont("times", "regular");
            doc.text("(10 Marks)", 60, 49)

            doc.setFontSize(11.04)

            //regular
            doc.text("You will hear one text. The text will be played twice. There will be a short break between the first and", 23, 55.5)
            doc.text("second playings of the text. You may make notes at any time.", 23, 60)
            doc.text("Listen carefully to the text and then answer the questions in", 23, 66)
            doc.text("All responses", 23, 71.5)
            doc.text("be based on the text.", 54, 71.5)

            //bold
            doc.setFont("times", "bold");
            doc.text(`${data.language.toUpperCase()}.`, 117, 66)
            doc.text("must", 45, 71.5)

            //#endregion

            //#region description

            //regular
            doc.setFont("times", "regular");
            doc.text(`${lang_instructions}`, 35, 85)
            doc.text("Responses in the wrong language will not receive credit.", 38, 90)

            //bold
            doc.setFont("times", "bold");
            doc.text(`TEXT ${textnum}`, 20, 85)
            // doc.text(data.language.toUpperCase(), 93, 85)
            doc.text(`${data.language.toUpperCase()}.`, langPos, 85)

            //#endregion
            
            //#region listeningspace
            doc.line(152, 81, 152, 280, 'S');
            doc.setFont("times", "regular");
            doc.text("You may make notes", 155, 85)
            doc.text("in this space.", 162, 90)
            //#endregion

            //#region "Question X"
            doc.setFont("times", "bold");
            doc.text(`Question ${textnum}`, 20, 99)

            //#endregion

            var subQs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

            //#region create questions
            var posY = 104;
            var linePos = 114;
            var inc;
            var qNo;
            doc.setLineWidth(0.1); 
            for(let s = 0; s <= data.questions.length - 1; s++) {
            if(posY < 284){
                //"{a,b,c,d,etc...}."
                doc.setFont("times", "bold");
                doc.text(`${subQs[s]}.`, 20, posY)

                //Question itself
                if(data.language == ("Japanese")){
                    doc.setFont("Sawarabi Mincho", "Regular");

                } else {
                    doc.setFont("times", "regular");
                } 
                var splitQuestion = doc.splitTextToSize(data.questions[s], 105); //wrapping so question doesnt go through dividing line
                doc.text(splitQuestion, 28, posY);

                //Generate 3 lines below question

                //determine width between first line and question depending on whether q has been wrapped or not
                if(doc.getTextWidth(data.questions[s])<135){ //not wrapped
                    inc = 10;
                } else if(doc.getTextWidth(data.questions[s])>135){ //wrapped
                    inc = 14;
                }

                linePos = posY + inc;

                //generate the three lines with a width of linePos+l between them
                for(var l=0; l<30; l= l+10){
                    doc.line(26, linePos+l, 138, linePos+l, 'S');
                }
    
                // width between last writing line and top of next question
                posY += 45;
                qNo = s;
            }
                //#region new page operations
                else {
                    var posY = 20;
                    var linePos = 30;
                    var inc;
                    doc.setLineWidth(0.3); 

                    for(let s = qNo+1; s <= data.questions.length - 1; s++) {

                        doc.addPage();
                        doc.setPage(2);                    

                        //#region listeningspace
                        doc.line(152, 15, 152, 280, 'S');
                        doc.setFont("times", "regular");
                        doc.text("You may make notes", 155, 20)
                        doc.text("in this space.", 162, 25)
                        //#endregion

                        //"{a,b,c,d,etc...}."
                        doc.setFont("times", "bold");
                        doc.text(`${subQs[s]}.`, 20, posY)

                        //Question itself
                        doc.setFont("times", "regular");
                        // if(data.questions.lang)
                        var splitQuestion = doc.splitTextToSize(data.questions[s], 105); //wrapping so question doesnt go through dividing line
                        doc.text(splitQuestion, 28, posY);

                        //#region Generate 3 lines below question
    
                        //determine width between first line and question depending on whether q has been wrapped or not
                        if(doc.getTextWidth(data.questions[s])<135){ //not wrapped
                            inc = 10;
                        } else if(doc.getTextWidth(data.questions[s])>135){ //wrapped
                            inc = 14;
                        }
    
                        linePos = posY + inc;
    
                        //generate the three lines with a width of linePos+l between them
                        for(var l=0; l<30; l= l+10){
                            doc.line(26, linePos+l, 138, linePos+l, 'S');
                        }
        
                        // width between last writing line and top of next question
                        posY += 45;
                        // console.log(posY);\
    
                        //#endregion
                    }
                }
                //#endregion


            }            
            //#endregion


            //#region headers+footers

            //#endregion


            doc.save(`${data.subtopic}.pdf`);
            // console.log(doc.getFontList());
        }

        //#endregion
 
    })



    

    //#endregion



});