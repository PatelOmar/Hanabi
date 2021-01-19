function GetRandomIntForCards(){
    return Math.floor(Math.random()*(49));
}
export default function CardShuffler(){
    let fireworksCard = [{colour: "red", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "red", value: "5", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "yellow", value: "5", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "green", value: "5", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "blue", value: "5", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "1", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "2", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "3", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "4", hint:{colour: false, value: false}, notVisible: []}, {colour: "white", value: "5", hint:{colour: false, value: false}, notVisible: []}];
    let selectedCards = [];
    // let shuffledDeck = [];
    // for (let position = 0; position < fireworksCard.length; position++){
    //     let terminate = false;
    //     while(!terminate){
    //         let random = GetRandomIntForCards();
    //         if (!selectedCards.includes(random)){
    //             shuffledDeck.push(fireworksCard[random]);
    //             selectedCards.push(random);
    //             terminate = true;
    //         }
    //     }
       
    // } 
    for (let position = 0; position < fireworksCard.length/2; position++){
        let random = GetRandomIntForCards();
        let temp = fireworksCard[position];
        fireworksCard[position] = fireworksCard[random];
        fireworksCard[random] = temp;
    }
    return fireworksCard;
}
