$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        playRepeatButton = $("#play-repeat"),
        openMenu = $('#play-menu'),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "Fred Eddy",
		name: "Vietnam",
		url: "Musics/Vietnam-FredEddy.mp3",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"
	},
	{
		artist: "Orange_Khoi",
		name: "Chân Ái",
		url: "Musics/ChanAi-Orange_Khoi.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"
	},
	{
		artist: "Mr Siro",
		name: "Cô Đơn Không Muốn Về Nhà",
		url: "Musics/CoDonKhongMuonVeNha-Mr_Siro.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Emilia",
		name: "Big Big World",
		url: "Musics/Big Big World - Emilia.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Văn Mai Hương",
		name: "Cầu Hôn",
		url: "Musics/Cau Hon - Van Mai Huong.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Doãn Hiếu",
		name: "Em Chỉ Cần Nói Có",
		url: "Musics/Em Chi Can Noi Co - Doan Hieu.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Bùi Anh Tuấn",
		name: "Hẹn Một Mai",
		url: "Musics/Hen Mot Mai - Bui Anh Tuan.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Harry Lu",
		name: "Hẹn Một Mai",
		url: "Musics/Hen Mot Mai - Harry Lu.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Hoàng Yến_TiNO_KOP",
		name: "Ngưng Làm Bạn",
		url: "Musics/Ngung Lam Ban - Hoang Yen_ TiNO_ KOP.mp3",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Lê Hiếu",
		name: "Phố Không Em",
		url: "Musics/Pho Khong Em - Le Hieu.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Thai Dinh",
		name: "Phố Không Em",
		url: "Musics/Pho Khong Em - Thai Dinh.mp3",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: " Timeflies_Katie Sky",
		name: "Monsters",
		url: "Musics/Monsters - Timeflies_ Katie Sky.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Offenbach",
		name: "Can Can",
		url: "Musics/Can Can.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker",
		name: "Faded",
		url: "Musics/Faded - Alan Walker.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker",
		name: "Alone",
		url: "Musics/Alone - Alan Walker.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker",
		name: "Spectre",
		url: "Musics/Spectre - Alan Walker.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker",
		name: "Sing Me To Sleep",
		url: "Musics/Sing Me To Sleep - Alan Walker.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker_Noah Cyrus",
		name: "All Falls Down",
		url: "Musics/All Falls Down - Alan Walker_ Noah Cyrus.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker",
		name: "Darkside",
		url: "Musics/Darkside - Alan Walker.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker_Sabrina Carpent",
		name: "On My Way",
		url: "Musics/On My Way - Alan Walker_ Sabrina Carpent.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "Alan Walker_K-391_Emelie Hollow",
		name: "Lily",
		url: "Musics/Lily - Alan Walker_ K-391_ Emelie Hollow.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "The Fat Rat",
		name: "Fly Away",
		url: "Musics/Fly Away - TheFatRat_ Anjulie.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "The Fat Rat",
		name: "Unity",
		url: "Musics/Unity - TheFatRat.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "The Fat Rat",
		name: "Never Be Alone",
		url: "Musics/Never Be Alone - TheFatRat.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "The Fat Rat",
		name: "Time Lapse",
		url: "Musics/Time Lapse - TheFatRat.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "The Fat Rat",
		name: "The Calling",
		url: "Musics/The Calling - TheFatRat_ Laura Brehm.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	{
		artist: "The Fat Rat",
		name: "Monody",
		url: "Musics/Monody - TheFatRat_ Laura Brehm.m4a",
		picture: "https://source.unsplash.com/random/1191*1191/?landscape"	
	},
	];
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	 //songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    // toggle repeat
    function playRepeat()
    {
        isRepeat = !isRepeat;
        audio.loop = isRepeat;
        toggleEnable(isRepeat, playRepeatButton);
    }

    function toggleEnable(condition, element)
    {
        if (condition)
            element.addClass('isEnabled');
        else
            element.removeClass('isEnabled');
    }
    
    function toggleMenu()
    {
        isOpen = !isOpen;
        toggleEnable(isOpen, openMenu);
    }

	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag, index = null)
    {
        if (index === null) {
            if( flag == 0 || flag == 1 ) {
                ++currIndex;
            } else if (flag === -1) {
                --currIndex;
            }
        } else {
            currIndex = index;
        }

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
			albumArt.find('img').attr('src', currArtwork);
            $('#album-art img').prop('src', bgArtworkUrl);
            $('.song').removeClass('playingSong');
            $('#song' + currIndex).addClass('playingSong');
        }
        else
        {
            if (currIndex < 0) {
                currIndex = songs.length - 1;
            } else if (currIndex > songs.length - 1) {
                currIndex = 0;
            }
            selectTrack(2);
        }
    }

    function initPlayer()
	{	
        audio = new Audio();
        addSongList();
		selectTrack(0);
		
		audio.loop = false;
        isRepeat = false;
        isOpen = false;

		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){
            selectTrack(-1);
        });
        playNextTrackButton.on('click',function(){
            selectTrack(1);
        });
        playRepeatButton.on('click', function(){
            playRepeat();
        });
        openMenu.on('click', function(){
            $("#list-song").fadeToggle(300);
            toggleMenu();
        });
    }
    
    function addSongList() {
        songs.forEach((song, index) => {
            const songTemplate = 
            `<div class="song" id="song${index}">
                <i class="fas fa-play"></i>
                <div class="info">
                    ${song.name} - ${song.artist}
                </div>
            </div>`

            $("#list-song").append(songTemplate);
            $('#song' + index).on('click', () => {
                selectTrack(0, index);
                playPause();
            });
        })
        
    }
    
	initPlayer();
});
