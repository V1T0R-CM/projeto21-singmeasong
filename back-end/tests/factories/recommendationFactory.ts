import { faker } from "@faker-js/faker";

function createRecommendation() {
    return {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=Dqd9HakS_wc"
    }
}

function createRecommendationList() {
    return [{
        name: "Acácia | Kaiser/César Cohen (Ordem Paranormal) AYAKASHI",
        youtubeLink: "https://www.youtube.com/watch?v=3ySIycyNkUY"
    }, {
        name: "Abutre | Arthur Cervero (Ordem Paranormal) AYAKASHI",
        youtubeLink: "https://www.youtube.com/watch?v=kSRttrGRkm0"
    }, {
        name: "Parasita | Thiago e Elizabeth (Ordem Paranormal) AYAKASHI feat. Nana Moon",
        youtubeLink: "https://www.youtube.com/watch?v=q-Gc-I1HWO4"
    }, {
        name: "O Pesadelo | Milo Castello (Ordem Paranormal) AYAKASHI",
        youtubeLink: "https://www.youtube.com/watch?v=pFjcBKSHvag"
    }]
}


export {
    createRecommendation,
    createRecommendationList
}