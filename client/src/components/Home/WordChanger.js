function WordChanger () {

    var words = ["Roomie", "Friend", "Best Friend", "Bestie", "Drinking Buddy"];

    window.addEventListener("load", function() {
        let randoms = window.document.getElementsByClassName("randoms");
        for (let i = 0; i < randoms.length; i++)
                changeWord(randoms[i]);
    }, false);
    
    function changeWord (a) { 
        a.innerHTML = words[getRandomInt(0, words.length - 1)];
        setTimeout(function() {
                changeWord(a);
        }, getRandomInt(2000, 2000));
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default WordChanger;