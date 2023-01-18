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

    // owl-crousel for blog
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        dots: false,
        nav: true,
        navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
        responsive: responsive
    });


    // click to scroll top
    $('.move-up span').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    })

    // AOS Instance
    AOS.init();
    //#endregion

    //#region typing effect
    // List of sentences
    var _CONTENT = ["I've developed applications in Python, Node.js and C#.", "I also have experience with .NET and the Unity game engine.", "I am currently working with Node.js to program Discord bots, and C# to create mobile applications through Unity."];
    // var _CONTENT = ["I've developed applications in Python, Node.js and C#. \n I also have experience with .NET and the Unity game engine. \n I am currently working with Node.js to program Discord bots, and C# to create mobile applications through Unity."];

    // Current sentence being processed
    var _PART = 0;

    // Character number of the current sentence being processed 
    var _PART_INDEX = 0;

    // Holds the handle returned from setInterval
    var _INTERVAL_VAL;

    // Element that holds the text
    var _ELEMENT = document.querySelector("#typing");
    var _CURSOR = document.querySelector("#cursor");


    // Implements typing effect
    function Type() { 
        var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
        _ELEMENT.innerHTML = text;
        _PART_INDEX++;

        // If full sentence has been displayed then start to delete the sentence after some time
        if(text === _CONTENT[_PART]) {
            _CURSOR.style.animation = "blink .75s step-end infinite";
            clearInterval(_INTERVAL_VAL);
            setTimeout(function() {
                _INTERVAL_VAL = setInterval(Delete, 50), _CURSOR.style.animation = "none";
            }, 1000);
        }
    }

    // Implements deleting effect
    function Delete() {
        var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
        _ELEMENT.innerHTML = text;
        _PART_INDEX--;

        // If sentence has been deleted then start to display the next sentence
        if(text === '') {
            clearInterval(_INTERVAL_VAL);

            // If last sentence then display the first one, else move to the next
            if(_PART == (_CONTENT.length - 1))
                _PART = 0;
            else
                _PART++;
            _PART_INDEX = 0;

            // Start to display the next sentence after some time
            setTimeout(function() {
                _INTERVAL_VAL = setInterval(Type, 100);
            }, 200);
        }
    }

    // Start the typing effect on load
    _INTERVAL_VAL = setInterval(Type, 100);

    //#endregion

    //#region quotes
    // AUTOLOAD A QUOTE
    fetch("https://stoic-quotes.com/api/quote")
    .then(res => res.json())
    .then(data => {
        quote.innerHTML = `"${data.text}"`;
        author.innerHTML = `- ${data.author}`;

    });
    //LOAD ON CLICK
    const quote = document.querySelector("#quote");
    const author = document.querySelector("#author");
    const btn = document.querySelector("#quote-btn");

    btn.addEventListener("mouseup", getQuote);

    function getQuote() {
        fetch("https://stoic-quotes.com/api/quote")
        .then(res => res.json())
        .then(data => {
            quote.innerHTML = `"${data.text}"`;
            author.innerHTML = `- ${data.author}`;

        })
        
    }
    //#endregion
    

});