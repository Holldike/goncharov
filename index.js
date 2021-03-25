// function play() {
//     let audio = $("#audio");
//     let audioElement = document.getElementById("audio");
//
//     if (audio.hasClass('player-icon-stop') === false) {
//         audioElement.pause();
//
//         let icon = $('.player-icon-start');
//
//         icon.addClass('player-icon-stop');
//         icon.removeClass('player-icon-start');
//
//         audioElement.pause();
//
//     } else {
//         let icon = $('.player-icon-stop');
//         console.log(audio.hasClass('player-icon-stop'));
//
//         icon.addClass('player-icon-start');
//         icon.removeClass('player-icon-stop');
//
//         audioElement.play();
//
//     }
//
// }

function replaceContent(content) {
    let contents = $('.content-box .content');

    showNecessaryText(contents);

    function showNecessaryText(elements) {
        elements.each(function () {
            if ($(this).data('content') !== content) {
                $(this).css('display', 'none');

            } else {

                $('.bg').css('filter', 'blur(100px)');

                setTimeout(function () {
                    $('.bg').css('filter', 'blur(3px)');

                }, 200);

                $(this).fadeIn('slow');
            }

        });

    }

}

$('.header > ul > li > a').on('click', function () {
    $('.active').removeClass('active');
    $(this).addClass('active');

    replaceContent($(this).data('content'));


});

replaceContent('home');

$('.bg').css('width', '58%');

setInterval(function () {
    let bgVideo = $('.bg video');
    bgVideo.css({'filter': 'blur(0px)'});
    setTimeout(() => bgVideo.css({'filter': 'opacity(0.01)'}), 700);

}, 5000);
