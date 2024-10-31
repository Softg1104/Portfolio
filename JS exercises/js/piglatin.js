function convertToPigLatin() {
    const word = document.getElementById('txtVal').value.toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let pigLatin = '';

    if (vowels.includes(word[0])) {
        pigLatin = word + 'yay';
    } else {
        const firstVowelIndex = word.split('').findIndex(letter => vowels.includes(letter));
        pigLatin = word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
    }

    document.getElementById('pigLatLbl').innerText = pigLatin;
}
