function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 
var choices = [
    "rock", 
    "paper", 
    "scissors"
];
function compare(choice1, choice2) {
    choice1 = choices.indexOf(choice1);
    choice2 = choices.indexOf(choice2);
    if (choice1 == choice2) {
        return "Tie";
    }
    if (choice1 == choices.length - 1 && choice2 == 0) {
        return "You win";
    }
    if (choice2 == choices.length - 1 && choice1 == 0) {
        return "I win";
    }
    if (choice1 > choice2) {
        return "I win";
    } else {
        return "You";
    }
}
module.exports = {
    data: {
        name: "rockpaperscissors",
        description: "0. Rock, 1. Scissors, 2. Paper",
        options: [
            {
                type: 4,
                name: "rockpaperorscissors",
                description: "rock paper or scissors"
            }
        ]
    },
    command: async interaction => {
        const rockPaperOrScissors = interaction.options.getInteger("rockpaperorscissors")
        if (rockPaperOrScissors > 2 || rockPaperOrScissors < 0){
            await interaction.reply("Invalid number")
            return
        }
        const MYChoice = randomNumber(0, 2)
        await interaction.reply(`I chose ${choices[MYChoice]}\n you chose ${choices[rockPaperOrScissors]}\n${compare(choices[MYChoice], choices[rockPaperOrScissors])}`)
    }
}