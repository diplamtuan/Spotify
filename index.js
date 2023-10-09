// Import
import {checkLogin } from "./login.js";
import { loadAboutUs } from "./aboutus.js";

const getBrowser = async () => {
    const url = 'https://spotify23.p.rapidapi.com/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=10&limit=20';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7741ebd7e4msh0958395311bc59cp14d430jsn282bbabbaa5a',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        if (result) {
            const data = result.content.items;
            let html = "";
            for (let i = 0; i < data.length; i++) {
                const image = data[i].images.length > 0 ? data[i].images[0].url : data[i].content.items[0].images[0].url;
                const name = data[i].name
                html += `
                <li class="content-browse-item">
                        <img src=${image} alt="">
                        <p>${name}</p>
                    </li>
                `
            }
            document.querySelector(".content-browse-list").innerHTML = html;
        }
    } catch (error) {
        console.error(error);
    }
}

const loadSearch = async (data) => {
    if (data) {
        var url = `https://spotify23.p.rapidapi.com/search/?q=${data}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    } else {
        data = '';
        var url = `https://spotify23.p.rapidapi.com/search/?q='son tung mtp'&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7741ebd7e4msh0958395311bc59cp14d430jsn282bbabbaa5a',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const body = document.querySelector('.content-body');
        console.log(result);
        console.log(result.playlists.items[0].data.images.items[0].sources[0].url)
        console.log(result.playlists.items[0].data.name)
        // const topResultImg = result.topResults.items[0].data.albumOfTrack.coverArt.sources[0].url ;
        const topResultImg = result.topResults.items[0].data.albumOfTrack ? result.topResults.items[0].data.albumOfTrack.coverArt.sources[0].url : `img/topresultDefault.png`;
        const topResultName = result.topResults.items[0].data.artists ? result.topResults.items[0].data.artists.items[0].profile.name : 'Spotify';
        let html = "";
        // Top result
        html += `
            <div class="content-search-top">
            <div class="content-top-result">
                <h3>Top result</h3>
                <div class="content-top-result-body">
                    <img src="${topResultImg}" alt="">
                    <p class="top-result-name">${topResultName}</p>
                    <p class="top-result-genre">Artist</p>
                </div>
            </div>
            <div class="content-songs">
                <h3>Songs</h3>`;
        for (let i = 0; i < 4; i++) {
            const trackId = result.tracks.items[i].data.id;
            html += `
                            <iframe style="border-radius:12px"
                                src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator"
                                width="100%" height="152" frameBorder="0" allowfullscreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"></iframe>`
        }
        html += `</div>
            </div>`
        // End top RESULT

        // Artist
        html += `
                        <div id="content-wrap">
                            <h2>Artists</h2>
                            <ul class="content-artists-list">`;
        for (let i = 0; i < 7; i++) {
            console.log(result.artists.items[i].data)
            if (result.artists.items[i].data.visuals.avatarImage) {
                const avatarArtist = result.artists.items[i].data.visuals.avatarImage.sources[0].url;
                console.log(avatarArtist);
                const nameArtist = result.artists.items[i].data.profile.name;
                console.log(nameArtist);
                html += `
                                    <li>
                                        <img src="${avatarArtist}" alt="">
                                        <p class="content-artist-name">${nameArtist}</p>
                                        <p class="content-artist-title">Artist</p>
                                    </li>
                               `};
        }

        html += `
                            </ul>
                        </div>`;

        // End Artist

        // Albums
        html += `
        
                        <div id="content-wrap">
                            <h2>Albums</h2>
                            <ul class="content-albums-list">`;

        for (let i = 0; i < 7; i++) {
            const albumImage = result.albums.items[i].data.coverArt.sources[0].url;
            const albumAuthor = result.albums.items[i].data.artists.items[0].profile.name;
            const albumName = result.albums.items[i].data.name;
            const albumYear = result.albums.items[i].data.date.year;
            html += `
                                <li>
                                    <img src="${albumImage}" alt="">
                                    <p class="content-albums-name">${albumName}</p>
                                    <span class="content-albums-year">${albumYear} .</span>
                                    <span class="content-albums-author">${albumAuthor}</span>
                                </li>`;
        }
        html += `
                            </ul >
                        </div > `;
        // End Album
        html += `
            <div id = "content-wrap" >
                       <h2>Playlists</h2>
                       <ul class="content-albums-list">`;
        // Playlist
        if (result.playlists.items.length <= 7) {
            for (let i = 0; i < result.playlists.items.length; i++) {
                if (result.playlists.items[i].data.length > 0) {
                    const playListImage = result.playlists.items[i].data.images.items[0].sources[0].url;
                    console.log(playListImage);
                    const playListName = result.playlists.items[i].data.name;
                    console.log(playListName);
                    html += `
                        <li>
                            <img src="${playListImage}" alt="">
                            <p class="content-albums-name">${playListName}</p>
                            <span class="content-albums-year">By Spotify</span>
                        </li>
                       `
                }
            }
        } else {
            for (let i = 0; i < 7; i++) {
                const playListImage = result.playlists.items[i].data.images.items[0].sources[0].url;
                const playListName = result.playlists.items[i].data.name;
                html += `
                    <li>
                        <img src="${playListImage}" alt="">
                        <p class="content-albums-name">${playListName}</p>
                        <span class="content-albums-year">By Spotify</span>
                    </li>
                   `
            };
        }
        html += `
                            </ul>
                        </div>
        `;
        // Load footer
        html += `
        <div div div id = "footer" >
            <div class="footer-top">
                <div class="footer-col">
                    <h4>Company</h4>
                    <p class="btnAboutUs">About</p>
                    <p>Jobs</p>
                    <p>For the Record</p>
                </div>
                <div class="footer-col">
                    <h4>Communities</h4>
                    <p>For Artists</p>
                    <p>Developers</p>
                    <p>Advertising</p>
                    <p>Investors</p>
                    <p>Vendors</p>
                </div>
                <div class="footer-col">
                    <h4>Useful links</h4>
                    <p>Support</p>
                    <p>Free Mobile App</p>
                </div>
                <div class="footer-col footer-col-2">
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-facebook"></i>
                </div>
            </div>
            <hr class="separate-footer">
            <div class="footer-bottom">
                <div class="footer-bottom-left">
                    <a href="#">Legal</a>
                    <a href="#">Privacy Center</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookies</a>
                    <a href="#">About Ads</a>
                    <a href="#">Accessibility</a>
                </div>
                <div class="footer-bottom-right">
                    <span>© 2023 Spotify AB</span>
                </div>
            </div>
        </div>
    `
        console.log(html)
        body.innerHTML = html;
        const btnAboutUs= document.querySelector('.btnAboutUs');
        btnAboutUs.addEventListener('click',()=>{
        loadAboutUs();
    })
    } catch (error) {
        console.error(error);
    }
}

export const loadApp = () => {
    checkLogin();
    const body = document.querySelector('.content-body');
    body.innerHTML = `<h2 class="content-title"> Recent searches</h2>
    <ul class="content-search-list">
        <li class="content-search-item">
            <img src="img/mtp.jpg" alt="">
            <p>Sơn Tùng M-TP
            </p>
            <span>By Sơn Tùng M-TP on Spotify Music</span>
        </li>
        <li class="content-search-item">
            <img src="img/mtp.jpg" alt="">
            <p>Sơn Tùng M-TP</p>
            <span>By Sơn Tùng M-TP</span>
        </li>
        <li class="content-search-item">
            <img src="img/mtp.jpg" alt="">
            <p>Sơn Tùng M-TP</p>
            <span>By Sơn Tùng M-TP</span>
        </li>
        <li class="content-search-item">
            <img src="img/mtp.jpg" alt="">
            <p>Sơn Tùng M-TP</p>
            <span>By Sơn Tùng M-TP</span>
        </li>
    </ul>



<h2 class="content-title">Browse All</h2>
    <ul class="content-browse-list">
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
        <li class="content-browse-item">
            <p>Podcasts</p>
            <img src="https://i.scdn.co/image/ab6765630000ba8a9417936d038e7a2f8dee2554" alt="">
        </li>
    </ul>`
    getBrowser();
    body.innerHTML += `
    <div div id = "footer" >
    <div class="footer-top">
        <div class="footer-col">
            <h4>Company</h4>
            <p class='btnAboutUs'>About</p>
            <p>Jobs</p>
            <p>For the Record</p>
        </div>
        <div class="footer-col">
            <h4>Communities</h4>
            <p>For Artists</p>
            <p>Developers</p>
            <p>Advertising</p>
            <p>Investors</p>
            <p>Vendors</p>
        </div>
        <div class="footer-col">
            <h4>Useful links</h4>
            <p>Support</p>
            <p>Free Mobile App</p>
        </div>
        <div class="footer-col footer-col-2">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook"></i>
        </div>
    </div>
    <hr class="separate-footer">
    <div class="footer-bottom">
        <div class="footer-bottom-left">
            <a href="#">Legal</a>
            <a href="#">Privacy Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
            <a href="#">About Ads</a>
            <a href="#">Accessibility</a>
        </div>
        <div class="footer-bottom-right">
            <span>© 2023 Spotify AB</span>
        </div>
    </div>
</div>`
    const btnAboutUs= document.querySelector('.btnAboutUs');
    btnAboutUs.addEventListener('click',()=>{
        loadAboutUs();
    })
}




 const app = () => {
    loadApp();

    const inputSearch = document.querySelector(".header-search input");
    inputSearch.addEventListener("input", (e) => {
        if (localStorage.getItem('name')) {
            let searchValue = e.target.value;
            loadSearch(searchValue);
            console.log(inputSearch);
        } else {
            alert("Bạn chưa đăng nhập")
        }
    })
    const logo = document.querySelector('.header-logo');
   logo.addEventListener('click',()=>{
    loadApp();
   })
    
}
app();
