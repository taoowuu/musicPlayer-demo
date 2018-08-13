// 音乐信息
var Music = [
    {
        title: 'Lemon',
        author: '米津玄師',
        srcmp3: 'song/Lemon.mp3',
        srcjpg: 'img/Lemon.jpg',
    },
    {
        title: 'Orion',
        author: '米津玄師',
        srcmp3: 'song/orion.mp3',
        srcjpg: 'img/orion.jpg',
    },
]

// 播放
var bindPlay = function() {
    var play = e('.player-control-icon-play')
    bindEvent(play, 'click', function() {
        var player = e('#id-player-audio')
        player.play()
        play.classList.add('hidden')
        var stop = e('.player-control-icon-stop')
        stop.classList.remove('hidden')
        var audio = e('#id-player-audio')
        audio.addEventListener('timeupdate', moveBar)
    })
}

// 暂停
var bindStop = function() {
    var stop = e('.player-control-icon-stop')
    bindEvent(stop, 'click', function() {
        var player = e('#id-player-audio')
        player.pause()
        stop.classList.add('hidden')

        var play = e('.player-control-icon-play')
        play.classList.remove('hidden')
    })
}

// 得到当前歌曲下标
var getIndex = function(number) {
    var audio = e('#id-player-audio')
    var index = parseInt(audio.dataset.now)
    var sumOfSongs = Music.length
    var newIndex = (index + (number) + sumOfSongs) % sumOfSongs
    return newIndex
}

// 改变歌曲音源，图片
var changeSong = function(newIndex) {
    var audio = e('#id-player-audio')
    audio.src = Music[newIndex].srcmp3

    var picture = e('.player-picture')
    picture.src = Music[newIndex].srcjpg

    var backgroud = e('.backgroud-picture')
    backgroud.src = Music[newIndex].srcjpg
}

// 改变 播放按钮 状态
var changePlayButton = function() {
    var play = e('.player-control-icon-play')
    play.classList.add('hidden')
    var stop = e('.player-control-icon-stop')
    stop.classList.remove('hidden')
}

var play = function(number) {
    changePlayButton()
    var infoOfSong = e('.player-song-info')
    var t = template(number)
    infoOfSong.innerHTML = ''
    appendHtml(infoOfSong, t)
    var audio = e('#id-player-audio')
    audio.play()
    audio.addEventListener('timeupdate', moveBar)
}

// 上一曲 改变 歌曲信息， 背景
var bindPre = function() {
    var element = e('.player-control-icon-pre')
    bindEvent(element, 'click', function() {
        var newIndex = getIndex(-1)
        changeSong(newIndex)
        play(-1)
        var audio = e('#id-player-audio')
        audio.dataset.now = newIndex
    })
}

// 下一曲 改变 歌曲信息， 背景
var bindNext = function() {
    var element = e('.player-control-icon-next')
    bindEvent(element, 'click', function() {
        var newIndex = getIndex(1)
        changeSong(newIndex)
        play(1)
        var audio = e('#id-player-audio')
        audio.dataset.now = newIndex
    })
}

// 改变 歌曲信息 的模板
var template = function(number) {
    var newIndex = getIndex(number)
    log('template', newIndex)
    var title = Music[newIndex].title
    var author = Music[newIndex].author
    var t = `
    <span class="title"> ${title} </span>
    <span> —— </span>
    <span class="author"> ${author} </span>
    `
    return t
}

var templateList = function(newIndex) {
    log('template', newIndex)
    var title = Music[newIndex].title
    var author = Music[newIndex].author
    var t = `
    <span class="title"> ${title} </span>
    <span> —— </span>
    <span class="author"> ${author} </span>
    `
    return t
}

// 分秒格式
var just = function(str, size) {
    var result = str
    var delimeter = '0'
    while(result.length < size) {
        result = delimeter + result
    }
    return result
}

// 格式化当前时间
var formatNowTime = function(sum) {
    var min = String(Math.floor(sum % 3600 / 60))
	var sec = String(Math.floor(sum % 60))
    var time = `
    <span id='nowTime'> ${just(min, 2)} : ${just(sec, 2)} </span>
    `
    return time
}

// 格式化总时间
var formatAllTime = function(sum) {
    var min = String(Math.floor(sum % 3600 / 60))
	var sec = String(Math.floor(sum % 60))
    var time = `
    <span id='allTime'> ${just(min, 2)} : ${just(sec, 2)} </span>
    `
    return time
}

// 插入歌曲总时间
var bindAllTime = function() {
    var audioTime = e('#id-player-audio')
    bindEvent(audioTime, 'canplay', function() {
        var allTime = audioTime.duration
        var AllTime = formatAllTime(allTime)
        var spanAllTime = e('#allTime')
        spanAllTime.innerHTML = AllTime
    })
}

// 插入歌曲当前时间
var bindNowTime = function() {
    var audioTime = e('#id-player-audio')
    bindEvent(audioTime, 'timeupdate', function() {
        var nowTime = audioTime.currentTime
        var NowTime = formatNowTime(nowTime)
        var spanNowTime = e('#nowTime')
        spanNowTime.innerHTML = NowTime
    })
}

// 进度条移动
var moveBar = function() {
    var range = e('.range')
    var audio = e('#id-player-audio')
    var input = audio.currentTime / audio.duration * 100
    if (Boolean(input) == true) {
        range.value = input
        var b = range.value
        range.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.1)${b}%, rgba(255, 255, 255, 1)${b}%)`;
    }
}

// 给进度条绑定拖动事件
var bindRange = function() {
    var range = e('.range')
    bindEvent(range, 'input', function() {
        var audio = e('#id-player-audio')
        audio.removeEventListener('timeupdate', bindNowTime)
        var v = this.value
        audio.currentTime = audio.duration * v / 100
        bindNowTime()
        audio.addEventListener('timeupdate', moveBar)
    })
}

// 显示歌曲列表
var bindList = function() {
    var list = e('.player-control-icon-list')
    bindEvent(list, 'click', function() {
        var hiddenList = e('.player-list')
        taggleClass(hiddenList, 'hidden')
    })
}

// 列表点歌
var bindPlayList = function() {
    bindAll('.songtitle', 'click', function(event){
        var target = event.target
        var newIndex = parseInt(target.dataset.path)
        changeSong(newIndex)
        changePlayButton()
        removeClassAll('songtitle-active')
        taggleClass(target, 'songtitle-active')
        play(newIndex)
        var audio = e('#id-player-audio')
        audio.dataset.now = newIndex
    })
}

// 改变音量
var bindVolume = function() {
    var volume = e('.volume')
    bindEvent(volume, 'input', function() {
        var audio = e('#id-player-audio')
        var v = this.value / 100
        log(v)
        audio.volume = v
    })
}

// 循环播放
var bindAlways = function() {
    var audio = e('#id-player-audio')
    bindEvent(audio, 'ended', function() {
        var newIndex = getIndex(1)
        changeSong(newIndex)
        play(1)
        audio.dataset.now = newIndex
    })
}

// 程序入口
var bindEvents = function() {
    bindPlay()
    bindStop()
    bindPre()
    bindNext()
    bindAllTime()
    bindNowTime()
    bindRange()
    bindList()
    bindPlayList()
    bindVolume()
    bindAlways()
}

var __main = function() {
    bindEvents()
}

__main()
