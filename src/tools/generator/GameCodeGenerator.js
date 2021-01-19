function GetRandomIntForAlphabet(){
    return Math.floor(Math.random()*(25));
}
export default function GameCodeGenerator(){
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let code = "";
    for (let position = 0; position < 6; position++){
        code = code + alphabet[GetRandomIntForAlphabet()];
    } 
    return code;
}
