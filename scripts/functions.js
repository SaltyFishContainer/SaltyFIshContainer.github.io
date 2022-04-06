(function() {
    var UserWidth = document.documentElement.clientWidth;
    var UserHeight = document.documentElement.clientHeight;
    console.log("UserWidth:" + UserWidth);
    console.log("UserHeight:" + UserHeight);
    var bMusicPanelOpen = true;
    var SpinningDeg = 0;
    var SpinSpeed = 1;
    var Keys = [0, 0, 0];
    var Music;
    var bPlaying = false;
    var MusicList = [
        "水樹奈々 - 深愛",
        "昼夜 - 愿你",
        "鈴木みのり - 僕らの戦場",
        "ワルキューレ - いけないボーダーライン",
        "カノエラナ - 月と星空"
    ];
    var CurrentSong = 0;
    var MusicInfo;
    var CurrentStatus = 0;
    var items;

    function InitializePage() {
        if (UserWidth > 920) {
            document.body.style.height = UserHeight + "px";
            document.getElementsByClassName("LeftNav")[0].style.height = UserHeight + "px";
            items = document.getElementsByClassName("ListItem");
            for (let i = 0; i < items.length; ++i)
                items[i].addEventListener("click", function() {
                    let self = GetIndexOfItems(this);
                    if (self != CurrentStatus) {
                        items[CurrentStatus].childNodes[0].className = "unhover";
                        items[self].childNodes[0].className = "hover";
                        CurrentStatus = self;
                    }
                });
            Keys[0] = document.getElementsByClassName("PreviousSong")[0];
            Keys[1] = document.getElementsByClassName("Pause")[0];
            Keys[2] = document.getElementsByClassName("NextSong")[0];
            Keys[0].addEventListener("click", OnPreviousClicked);
            Keys[1].addEventListener("click", OnPauseClicked);
            Keys[2].addEventListener("click", OnNextClicked);
            Music = document.getElementById("Music");
            MusicInfo = document.getElementsByClassName("MusicInfo")[0];
            console.log(Keys);
            var SpinningRecord = document.getElementsByClassName("SpanningRecord").item(0);
            setInterval(() => {
                if (bPlaying) {
                    SpinningRecord.style.transform = "rotate(" + SpinningDeg + "deg)";
                    SpinningDeg += SpinningDeg >= 360 ? -SpinningDeg : SpinSpeed;
                }
            }, 10);
            window.addEventListener("click", AutoPlayWhenClick);
            setInterval(MonitorPlayingStatus, 100);
        }
    }

    function GetIndexOfItems(obj) {
        let i = 0;
        for (; i < items.length; ++i)
            if (obj === items[i])
                break;
        return i;
    }
    // function CloseMusicPanal() {
    //     console.log("CloseMusicPanal");
    // }

    // function OpenMusicPanal() {
    //     console.log("OpenMusicPanal");
    // }

    // function OnEyeClicked() {

    // }

    function GetPreviousSong() {
        CurrentSong ? --CurrentSong : CurrentSong = MusicList.length - 1;
        return MusicList[CurrentSong];
    }

    function GetNextSong() {
        CurrentSong == MusicList.length - 1 ? CurrentSong = 0 : ++CurrentSong;
        return MusicList[CurrentSong];
    }

    function OnPreviousClicked() {
        if (bPlaying) {
            Music.pause();
        }
        let prev = GetPreviousSong();
        Music.src = "musics/" + prev + ".mp3";
        MusicInfo.innerHTML = prev;
        if (!bPlaying)
            ResetPlayeringStatus();
        Music.play()
    }

    function ResetPlayeringStatus() {
        if (bPlaying) {
            Keys[1].className = "Continue";
            bPlaying = false;
        } else {
            Keys[1].className = "Pause";
            bPlaying = true;
        }
        return bPlaying;
    }

    function OnPauseClicked() {
        ResetPlayeringStatus() ? Music.play() : Music.pause();
    }

    function OnNextClicked() {
        if (bPlaying) {
            Music.pause();
        }
        let next = GetNextSong();
        Music.src = "musics/" + next + ".mp3";
        MusicInfo.innerHTML = next;
        if (!bPlaying)
            ResetPlayeringStatus();
        Music.play()
    }

    function MonitorPlayingStatus() {
        if (Music.ended)
            OnNextClicked();
    }

    function OnVolumeChange() {

    }

    function AutoPlayWhenClick() {
        if (Music.muted) {
            Music.volume = .1;
            Music.play();
            Music.muted = false;
            bPlaying = true;
            console.log(MusicList[0]);
            MusicInfo.innerHTML = MusicList[0];
            // Dynamic add a iframe when a click happened or I can not monitor click event completely
            let ctt = document.createElement("IFRAME");
            ctt.name = "ContentFrame";
            ctt.src = "intro.html";
            ctt.frameBorder = 0;
            ctt.className = "Content";
            ctt.style.height = UserHeight + "px";
            document.getElementsByClassName("FrameContainer")[0].appendChild(ctt);
            document.getElementsByClassName("Content")[0].style.height = UserHeight + "px";
            window.removeEventListener("click", AutoPlayWhenClick);
        }
        console.log("BackgroundMusicAutoPlayed");
    }
    window.addEventListener("load", InitializePage);
})()