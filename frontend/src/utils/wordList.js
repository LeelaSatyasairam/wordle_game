

export const vowels = ["a","e","i","o","u"]


export const twoword = [
  "an", "as", "at", "be", "by", "do", "go", "he", "hi", "if",
  "in", "is", "it", "me", "my", "no", "of", "on", "or", "so",
  "to", "up", "us", "we", "am", "oh", "ox", "ex", "ye", "ma",
  "pa", "aw", "eh", "uh", "ha", "ho", "id", "ad", "ag", "al",
  "da", "ed", "em", "en", "et", "fa", "la", "lo", "mu", "na",
  "ne", "od", "oe", "re", "ta", "ti", "xi", "za"
];




export const threeword = [
  "and", "are", "ask", "bat", "bed", "big", "box", "boy", "cat", "car",
  "cow", "cut", "dad", "day", "dog", "dry", "ear", "eat", "egg", "end",
  "eye", "fan", "fat", "fly", "fun", "get", "god", "got", "gum", "gun",
  "hat", "hen", "her", "hey", "hot", "ice", "ink", "its", "jam", "jar",
  "jet", "job", "joy", "key", "kit", "lab", "leg", "let", "lid", "lip",
  "log", "mad", "man", "map", "mat", "mix", "mud", "net", "new", "nod",
  "now", "oil", "old", "one", "out", "owl", "pan", "pen", "pet", "pie",
  "pig", "pin", "pop", "pot", "put", "ran", "rat", "red", "rid", "run",
  "sad", "saw", "say", "sea", "set", "she", "shy", "sit", "sky", "son",
  "sun", "tap", "ten", "the", "tip", "top", "toy", "try", "tub", "two",
  "use", "van", "war", "was", "wet", "win", "yes", "you", "zip", "zoo"
];



export const fourword = [
  "able", "also", "area", "army", "baby", "back", "ball", "band", "bank", "base",
  "bath", "bear", "beat", "been", "beer", "bell", "belt", "best", "bill", "bird",
  "blow", "blue", "boat", "body", "bomb", "bond", "bone", "book", "boom", "born",
  "boss", "both", "bowl", "bulk", "burn", "bush", "busy", "call", "calm", "came",
  "camp", "card", "care", "case", "cash", "cast", "cell", "chat", "chip", "city",
  "club", "coat", "code", "cold", "come", "cook", "cool", "cope", "copy", "core",
  "cost", "crew", "crop", "dark", "data", "date", "dawn", "days", "dead", "deal",
  "dean", "dear", "debt", "deep", "deny", "desk", "dial", "diet", "disc", "disk",
  "does", "done", "door", "dose", "down", "draw", "drop", "drug", "dual", "duty",
  "earn", "ease", "east", "easy", "edge", "else", "even", "ever", "evil", "exam",
  "exit", "face", "fact", "fair", "fall", "farm", "fast", "fate", "fear", "feed",
  "feel", "feet", "file", "fill", "film", "find", "fine", "fire", "firm", "fish",
  "five", "flat", "flow", "food", "foot", "ford", "form", "fort", "four", "free"
];



export const WORDS = [
    "react", "apple", "spare", "crane", "table", "grape", "flame", "which",
    "there",
    "their",
    "about",
    "would",
    "these",
    "other",
    "words",
    "could",
    "write",
    "first",
    "water",
    "after",
    "where",
    "right",
    "think",
    "three",
    "years",
    "place",
    "sound",
    "great",
    "again",
    "still",
    "every",
    "small",
    "found",
    "those",
    "never",
    "under",
    "might",
    "while",
    "house",
    "world",
    "below",
    "asked",
    "going",
    "large",
    "until",
    "along",
    "shall",
    "being",
    "often",
    "earth",
    "began",
    "since",
    "study",
    "night",
    "light",
    "above",
    "paper",
    "parts",
    "young",
    "story",
    "point",
    "times",
    "heard",
    "whole",
    "white",
    "given",
    "means",
    "music",
    "miles",
    "thing",
    "today",
    "later",
    "using",
    "money",
    "lines",
    "order",
    "group",
    "among",
    "learn",
    "known",
    "space",
    "table",
    "early",
    "trees",
    "short",
    "hands",
    "state",
    "black",
    "shown",
    "stood",
    "front",
    "voice",
    "close",
    "power",
];





export function getRandom1() {
  return vowels[Math.floor(Math.random() * vowels.length)].toUpperCase();
}

export function getRandom2() {
  return twoword[Math.floor(Math.random() * twoword.length)].toUpperCase();
}

export function getRandom3() {
  return threeword[Math.floor(Math.random() * threeword.length)].toUpperCase();
}
export function getRandom4() {
  return fourword[Math.floor(Math.random() * fourword.length)].toUpperCase();
}

export function getRandom5() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}
