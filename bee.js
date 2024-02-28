let currentsongs = new Audio();

console.log('lets write some javascript');
async function getsongs(){ 
    let a = await fetch("http://127.0.0.1:3000/music/")
    let response = await a.text();
    console.log(response)
    let div =document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs =[]
     for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/music/")[1])
        }
        
     }
     const playMusic = (track)=>{
        currentsongs.src="/music/" + track
        // let audio = new Audio("/music/" + track)
        currentsongs.play()
     }


     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("http://127.0.0.1:3000/music/", " ")}</div>
                                
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div> </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })
     return songs
}
play.addEventListener("click",()=>{
    if(currentsongs.paused){
        currentsongs.play()
    }
    else{
        currentsongs.pause()
    }
})
async function main(){
    let songs = await getsongs()

}
main()